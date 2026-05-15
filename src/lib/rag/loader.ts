import fs from "node:fs";
import path from "node:path";

export type ChunkSource = "post" | "project" | "experience" | "knowledge";

export type Chunk = {
	id: string;
	source: ChunkSource;
	slug: string;
	title: string;
	text: string;
	metadata: Record<string, unknown>;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function loadAllChunks(): Chunk[] {
	return [
		...loadDir("posts", "post"),
		...loadDir("projects", "project"),
		...loadDir("experience", "experience"),
		...loadDir("knowledge", "knowledge"),
	];
}

function loadDir(dirName: string, source: ChunkSource): Chunk[] {
	const dir = path.join(CONTENT_ROOT, dirName);
	if (!fs.existsSync(dir)) return [];
	const files = fs
		.readdirSync(dir)
		.filter((f) => f.endsWith(".mdx"))
		.sort();
	return files.map((file) => loadFile(path.join(dir, file), source));
}

function loadFile(filePath: string, source: ChunkSource): Chunk {
	const raw = fs.readFileSync(filePath, "utf8");
	const { metaText, body } = splitMetadataAndBody(raw);
	const metadata = parseMetaFields(metaText);
	const slug =
		(metadata.slug as string | undefined) ??
		slugify(path.basename(filePath, ".mdx"));
	const title = pickTitle(source, metadata, slug);
	const text = composeText(source, title, metadata, body);
	return { id: `${source}:${slug}`, source, slug, title, text, metadata };
}

// Splits an MDX file at the first `};` after `export const metadata`.
// Assumes the metadata object never contains a literal `};` inside a value —
// true for this corpus today.
function splitMetadataAndBody(raw: string): { metaText: string; body: string } {
	const start = raw.indexOf("export const metadata");
	if (start === -1) throw new Error("Missing `export const metadata` block");
	const end = raw.indexOf("};", start);
	if (end === -1) throw new Error("Unterminated metadata block");
	return {
		metaText: raw.slice(start, end + 2),
		body: raw.slice(end + 2).trim(),
	};
}

function parseMetaFields(metaText: string): Record<string, unknown> {
	const result: Record<string, unknown> = {};
	const stringRe = /\b(\w+)\s*:\s*['"`]([^'"`]*?)['"`]/g;
	for (const m of metaText.matchAll(stringRe)) {
		result[m[1]] = m[2];
	}
	const arrayRe = /\b(\w+)\s*:\s*\[([\s\S]*?)\]/g;
	for (const m of metaText.matchAll(arrayRe)) {
		const items = m[2]
			.split(",")
			.map((s) => s.trim().replace(/^['"`]|['"`]$/g, "").trim())
			.filter(Boolean);
		if (items.length > 0) result[m[1]] = items;
	}
	return result;
}

function pickTitle(
	source: ChunkSource,
	meta: Record<string, unknown>,
	slug: string,
): string {
	if (source === "post") return (meta.title as string | undefined) ?? slug;
	if (source === "project") return (meta.name as string | undefined) ?? slug;
	if (source === "knowledge")
		return (meta.title as string | undefined) ?? slug;
	const role = meta.role as string | undefined;
	const company = meta.company as string | undefined;
	if (role && company) return `${role} at ${company}`;
	return company ?? role ?? slug;
}

function composeText(
	source: ChunkSource,
	title: string,
	meta: Record<string, unknown>,
	body: string,
): string {
	const lines: string[] = [`# ${title}`];
	if (source === "project" && typeof meta.description === "string") {
		lines.push(`Summary: ${meta.description}`);
	}
	if (Array.isArray(meta.tags) && meta.tags.length > 0) {
		lines.push(`Tags: ${(meta.tags as string[]).join(", ")}`);
	}
	if (source === "experience") {
		const start = meta.startDate as string | undefined;
		const end = (meta.endDate as string | undefined) ?? "present";
		if (start) lines.push(`Period: ${start} to ${end}`);
	}
	if (source === "post" && typeof meta.date === "string") {
		lines.push(`Date: ${meta.date}`);
	}
	lines.push("");
	lines.push(body);
	return lines.join("\n");
}

function slugify(s: string): string {
	return s
		.replace(/^\d+-/, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}
