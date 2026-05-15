import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import fs from "node:fs/promises";
import path from "node:path";

import { loadAllChunks } from "../src/lib/rag/loader.ts";

async function main() {
	const chunks = loadAllChunks();
	if (chunks.length === 0) {
		console.error("No content found under content/. Nothing to embed.");
		process.exit(1);
	}
	console.log(`Loaded ${chunks.length} chunks. Calling OpenAI embeddings...`);

	const { embeddings, usage } = await embedMany({
		model: openai.embedding("text-embedding-3-small"),
		values: chunks.map((c) => c.text),
	});

	const out = chunks.map((chunk, i) => ({
		...chunk,
		embedding: embeddings[i],
	}));

	const outPath = path.join(process.cwd(), "content", "embeddings.json");
	await fs.writeFile(outPath, JSON.stringify(out, null, 2));

	console.log(
		`Wrote ${out.length} embeddings to ${outPath} (tokens: ${
			usage?.tokens ?? "?"
		})`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
