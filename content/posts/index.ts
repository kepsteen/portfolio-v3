import type { ComponentType } from "react";

import type { Tag } from "../tags";
import HelloWorld, { metadata as helloWorldMeta } from "./01-hello-world.mdx";

export type PostMetadata = {
	slug: string;
	title: string;
	/** ISO date string (YYYY-MM-DD), used for sorting and display */
	date: string;
	/** Short preview for listings */
	excerpt: string;
	tags: Tag[];
};

export type PostEntry = {
	metadata: PostMetadata;
	Content: ComponentType;
};

const unsorted: PostEntry[] = [
	{ metadata: helloWorldMeta as PostMetadata, Content: HelloWorld },
];

function byDateDesc(a: PostEntry, b: PostEntry): number {
	return (
		new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
	);
}

export const posts: PostEntry[] = [...unsorted].sort(byDateDesc);

export function getPostBySlug(slug: string): PostEntry | undefined {
	return posts.find((p) => p.metadata.slug === slug);
}
