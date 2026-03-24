"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Tag } from "../../content/tags";

export type PostListItem = {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tags: Tag[];
};

function formatPostDate(isoDate: string): string {
	const d = new Date(isoDate + "T12:00:00");
	return d.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

type Props = {
	posts: PostListItem[];
};

export default function PostsListing({ posts }: Props) {
	const tagOptions = useMemo(
		() =>
			[...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
				a.localeCompare(b),
			),
		[posts],
	);

	const [selectedTags, setSelectedTags] = useState<Set<Tag>>(new Set());

	const filtered = useMemo(() => {
		if (selectedTags.size === 0) return posts;
		return posts.filter((p) => p.tags.some((t) => selectedTags.has(t)));
	}, [posts, selectedTags]);

	function toggleTag(tag: Tag) {
		setSelectedTags((prev) => {
			const next = new Set(prev);
			if (next.has(tag)) next.delete(tag);
			else next.add(tag);
			return next;
		});
	}

	function clearFilters() {
		setSelectedTags(new Set());
	}

	const hasActiveFilter = selectedTags.size > 0;

	return (
		<>
			{tagOptions.length > 0 ? (
				<div className="mt-8">
					<div className="flex flex-wrap items-center gap-2">
						<span className="font-mono text-sm text-base-content/50 shrink-0">
							Filter by tag
						</span>
						{tagOptions.map((tag) => {
							const active = selectedTags.has(tag);
							return (
								<button
									key={tag}
									type="button"
									onClick={() => toggleTag(tag)}
									aria-pressed={active}
									className={[
										"badge badge-sm font-mono border-0 transition-colors",
										active
											? "badge-primary"
											: "bg-base-300 text-base-content/70 hover:bg-base-300/80",
									].join(" ")}
								>
									{tag}
								</button>
							);
						})}
						{hasActiveFilter ? (
							<button
								type="button"
								onClick={clearFilters}
								className="font-mono text-sm text-primary hover:text-primary/80 underline underline-offset-2"
							>
								Clear
							</button>
						) : null}
					</div>
				</div>
			) : null}

			<ul className="mt-10 flex flex-col gap-8">
				{filtered.length === 0 ? (
					<li className="font-mono text-sm text-base-content/60">
						No posts match the selected tags.{" "}
						<button
							type="button"
							onClick={clearFilters}
							className="text-primary hover:text-primary/80 underline underline-offset-2"
						>
							Clear filters
						</button>
					</li>
				) : (
					filtered.map((metadata) => (
						<li key={metadata.slug}>
							<article className="border-b border-base-300 pb-8 last:border-0 last:pb-0">
								<Link
									href={`/posts/${metadata.slug}`}
									className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
								>
									<h2 className="font-mono font-bold text-lg text-accent group-hover:text-primary transition-colors">
										{metadata.title}
									</h2>
								</Link>
								<time
									dateTime={metadata.date}
									className="font-mono text-sm text-base-content/50 mt-2 block"
								>
									{formatPostDate(metadata.date)}
								</time>
								<p className="font-mono text-[0.95rem] text-base-content/75 leading-7 mt-3">
									{metadata.excerpt}
								</p>
								<div className="flex flex-wrap gap-1.5 mt-4">
									{metadata.tags.map((tag) => (
										<span
											key={tag}
											className="badge badge-sm font-mono bg-base-300 text-base-content/70 border-0"
										>
											{tag}
										</span>
									))}
								</div>
							</article>
						</li>
					))
				)}
			</ul>
		</>
	);
}
