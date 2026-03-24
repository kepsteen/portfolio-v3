/**
 * Canonical tag list for posts and projects. Add new labels here so TypeScript
 * and MDX metadata stay aligned.
 */
export const TAGS = [
	"AWS S3",
	"Clerk",
	"DaisyUI",
	"Drizzle",
	"Express",
	"meta",
	"MongoDB",
	"Next.js",
	"OpenAI",
	"Postgres",
	"React",
	"Redis",
	"Socket.io",
	"TanStack Query",
	"Tiptap",
	"TypeScript",
	"writing",
] as const;

export type Tag = (typeof TAGS)[number];
