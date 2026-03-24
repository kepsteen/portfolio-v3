import Link from "next/link";

import Navbar from "@/components/Navbar";
import { posts } from "../../../content/posts/index";

function formatPostDate(isoDate: string): string {
	const d = new Date(isoDate + "T12:00:00");
	return d.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default function PostsPage() {
	return (
		<>
			<Navbar />
			<main className="px-8 pt-24 max-w-3xl mx-auto pb-20">
				<h1 className="font-mono text-3xl font-bold text-primary">Posts</h1>
				<p className="font-mono text-base-content/70 mt-4 max-w-2xl leading-relaxed">
					Recent writing and notes. Each entry is MDX with metadata for this list and the post
					page.
				</p>

				<ul className="mt-10 flex flex-col gap-8">
					{posts.map(({ metadata }) => (
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
								<p className="font-mono text-sm text-base-content/70 leading-relaxed mt-3">
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
					))}
				</ul>
			</main>
		</>
	);
}
