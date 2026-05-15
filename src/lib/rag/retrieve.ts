import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import fs from "node:fs/promises";
import path from "node:path";

import type { Chunk } from "./loader.ts";

type EmbeddedChunk = Chunk & { embedding: number[] };

export type RetrievalHit = Chunk & { score: number };

let cached: EmbeddedChunk[] | null = null;

async function loadEmbeddings(): Promise<EmbeddedChunk[]> {
	if (cached) return cached;
	const filePath = path.join(process.cwd(), "content", "embeddings.json");
	const raw = await fs.readFile(filePath, "utf8");
	cached = JSON.parse(raw) as EmbeddedChunk[];
	return cached;
}

function cosine(a: number[], b: number[]): number {
	let dot = 0;
	let magA = 0;
	let magB = 0;
	for (let i = 0; i < a.length; i++) {
		dot += a[i] * b[i];
		magA += a[i] * a[i];
		magB += b[i] * b[i];
	}
	return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export async function retrieveTopK(
	query: string,
	k = 4,
): Promise<RetrievalHit[]> {
	const corpus = await loadEmbeddings();
	const { embedding: queryVec } = await embed({
		model: openai.embedding("text-embedding-3-small"),
		value: query,
	});
	return corpus
		.map(({ embedding, ...rest }) => ({
			...rest,
			score: cosine(embedding, queryVec),
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, k);
}
