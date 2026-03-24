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

				<div className="mt-10 font-mono text-sm text-base-content/90 leading-relaxed [&_h2]:font-bold [&_h2]:text-lg [&_h2]:text-accent [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:first:mt-0 [&_p]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['–'] [&_li]:before:text-accent [&_li]:before:shrink-0 [&_li]:before:pt-0.5">
					<Content />
				</div>
			</main>
		</>
	);
}
