import {
	IconArrowLeft,
	IconBrandGithub,
	IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import ProjectCoverImage from "@/components/ProjectCoverImage";
import { getProjectBySlug, projects } from "../../../../content/projects/index";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return projects.map(({ metadata }) => ({ slug: metadata.slug }));
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const entry = getProjectBySlug(slug);
	if (!entry) return { title: "Project" };
	return { title: `${entry.metadata.name} · Projects` };
}

export default async function ProjectDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const entry = getProjectBySlug(slug);
	if (!entry) {
		notFound();
	}

	const { metadata, Content } = entry;

	return (
		<>
			<Navbar />
			<main className="px-8 pt-24 max-w-3xl mx-auto pb-20">
				<Link
					href="/projects"
					className="font-mono text-sm text-primary inline-flex items-center gap-1.5 hover:text-primary/80 transition-colors mb-8"
				>
					<IconArrowLeft size={16} stroke={1.5} />
					All projects
				</Link>

				<header className="flex flex-col gap-4 border-b border-base-300 pb-8">
					<h1 className="font-mono text-3xl font-bold text-accent">
						{metadata.name}
					</h1>
					<p className="font-mono text-base text-base-content/70 leading-relaxed">
						{metadata.description}
					</p>
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
					{(metadata.githubUrl || metadata.liveUrl) && (
						<div className="flex flex-wrap gap-4 pt-2">
							{metadata.githubUrl && (
								<a
									href={metadata.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="font-mono text-sm text-primary inline-flex items-center gap-1.5 hover:text-primary/80 transition-colors"
								>
									<IconBrandGithub size={18} stroke={1.5} />
									Source
									<IconExternalLink size={14} stroke={1.5} className="opacity-60" />
								</a>
							)}
							{metadata.liveUrl && (
								<a
									href={metadata.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="font-mono text-sm text-primary inline-flex items-center gap-1.5 hover:text-primary/80 transition-colors"
								>
									<IconExternalLink size={18} stroke={1.5} />
									Live demo
								</a>
							)}
						</div>
					)}
				</header>

				{metadata.image && (
					<div className="mt-6">
						<ProjectCoverImage
							src={metadata.image}
							alt={metadata.imageAlt ?? `${metadata.name} preview`}
							heightClass="h-48 sm:h-56 md:h-64"
							rounded
						/>
					</div>
				)}

				<div className="mt-10 prose prose-sm sm:prose-base max-w-none font-mono prose-headings:font-mono prose-headings:text-base-content prose-h2:text-secondary prose-h3:text-accent prose-p:text-base-content/85 prose-strong:text-base-content prose-code:text-secondary prose-code:font-mono prose-pre:bg-base-200 prose-pre:text-base-content prose-a:text-primary hover:prose-a:text-primary/80 prose-hr:border-base-300 prose-li:text-base-content/85">
					<Content />
				</div>
			</main>
		</>
	);
}
