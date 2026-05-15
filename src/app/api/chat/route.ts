import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { retrieveTopK, type RetrievalHit } from "@/lib/rag/retrieve";

export const runtime = "nodejs";
export const maxDuration = 30;

const RECENT_MESSAGES_LIMIT = 6;
const TOP_K = 4;

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	const userQuery = extractLastUserText(messages);
	const hits = userQuery ? await retrieveTopK(userQuery, TOP_K) : [];

	const modelMessages = await convertToModelMessages(
		messages.slice(-RECENT_MESSAGES_LIMIT),
	);

	const result = streamText({
		model: anthropic("claude-haiku-4-5-20251001"),
		system: buildSystemPrompt(hits),
		messages: modelMessages,
	});

	return result.toUIMessageStreamResponse();
}

function extractLastUserText(messages: UIMessage[]): string {
	for (let i = messages.length - 1; i >= 0; i--) {
		const m = messages[i];
		if (m.role !== "user") continue;
		const text = m.parts
			.filter(
				(p): p is Extract<typeof p, { type: "text" }> => p.type === "text",
			)
			.map((p) => p.text)
			.join(" ")
			.trim();
		if (text) return text;
	}
	return "";
}

function buildSystemPrompt(hits: RetrievalHit[]): string {
	const sources = hits
		.map(
			(h) =>
				`<source id="${h.id}" title="${h.title}">\n${h.text}\n</source>`,
		)
		.join("\n\n");

	return [
		"You are Luna, the friendly chat assistant on Cody Epstein's portfolio site.",
		"Answer questions about Cody — his projects, experience, skills, and background — using ONLY the <sources> below.",
		"If the answer is not in the sources, say so honestly and offer to answer something else. Never invent details.",
		"Speak about Cody in the third person (e.g., \"Cody built…\", not \"I built…\").",
		"Keep replies concise — 2 to 4 sentences unless the user explicitly asks for more detail.",
		"",
		"<sources>",
		sources || "(no sources retrieved for this query)",
		"</sources>",
	].join("\n");
}
