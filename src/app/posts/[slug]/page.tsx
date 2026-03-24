import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import { getPostBySlug, posts } from "../../../../content/posts/index";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return posts.map(({ metadata }) => ({ slug: metadata.slug }));
}

function formatPostDate(isoDate: string): string {
	const d = new Date(isoDate + "T12:00:00");
	return d.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const entry = getPostBySlug(slug);
	if (!entry) return { title: "Post" };
	return { title: `${entry.metadata.title} · Posts` };
}

export default async function PostDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const entry = getPostBySlug(slug);
	if (!entry) {
		notFound();
	}

	const { metadata, Content } = entry;

	return (
		<>
			<Navbar />
			<main className="px-8 pt-24 max-w-3xl mx-auto pb-20">
				<Link
					href="/posts"
					className="font-mono text-sm text-primary inline-flex items-center gap-1.5 hover:text-primary/80 transition-colors mb-8"
				>
					<IconArrowLeft size={16} stroke={1.5} />
					All posts
				</Link>

				<header className="flex flex-col gap-4 border-b border-base-300 pb-8">
					<h1 className="font-mono text-3xl font-bold text-primary">{metadata.title}</h1>
					<time
						dateTime={metadata.date}
						className="font-mono text-sm text-base-content/60"
					>
						{formatPostDate(metadata.date)}
					</time>
					<div className="flex flex-wrap gap-1.5">
						{metadata.tags.map((tag) => (
							<span
								key={tag}
								className="badge badge-sm font-mono bg-base-300 text-base-content/70 border-0"
							>
								{tag}
							</span>
						))}
					</div>
				</header>

				<div className="mt-10 prose prose-sm sm:prose-base max-w-none font-mono prose-headings:font-mono prose-headings:text-base-content prose-h2:text-accent prose-h3:text-secondary prose-p:text-base-content/85 prose-strong:text-base-content prose-code:text-secondary prose-code:font-mono prose-pre:bg-base-200 prose-pre:text-base-content prose-a:text-primary hover:prose-a:text-primary/80 prose-hr:border-base-300 prose-li:text-base-content/85">
					<Content />
				</div>
			</main>
		</>
	);
}
