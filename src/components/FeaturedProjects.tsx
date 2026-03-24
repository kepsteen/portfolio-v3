import { IconStar, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

import { featuredProjects } from "../../content/projects/index";
import ProjectCoverImage from "./ProjectCoverImage";

/** Height of the “browser” content area below the title bar (title bar uses MacDots). */
const FEATURED_WINDOW_HEIGHT = "h-56";

function MacDots() {
	return (
		<div className="flex items-center gap-1.5">
			<span
				className="w-3 h-3 rounded-full inline-block"
				style={{ backgroundColor: "#ff5f56" }}
			/>
			<span
				className="w-3 h-3 rounded-full inline-block"
				style={{ backgroundColor: "#ffbd2e" }}
			/>
			<span
				className="w-3 h-3 rounded-full inline-block"
				style={{ backgroundColor: "#27c93f" }}
			/>
		</div>
	);
}

export default function FeaturedProjects() {
	const firstTwo = featuredProjects.slice(0, 2);
	const third = featuredProjects[2];

	return (
		<section className="flex flex-col gap-6 pb-20">
			{/* Section header */}
			<div className="flex items-center justify-between">
				<h2 className="font-mono text-2xl font-bold flex items-center gap-2 text-base-content">
					<IconStar size={24} stroke={1.5} className="text-accent" />
					Featured Projects
				</h2>
				<Link
					href="/projects"
					className="group font-mono text-sm text-primary flex items-center gap-1 hover:text-primary/80 transition-colors"
				>
					View all
					<IconArrowRight
						size={16}
						stroke={1.5}
						className="transition-transform duration-200 group-hover:translate-x-0.5"
					/>
				</Link>
			</div>

			{/* Project grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{firstTwo.map((project) => (
					<Link
						key={project.metadata.slug}
						href={`/projects/${project.metadata.slug}`}
						className="card bg-base-200 overflow-hidden transition-colors hover:bg-base-200/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>
						{/* Window chrome */}
						<div className="px-4 py-3 bg-base-300 flex items-center justify-between">
							<MacDots />
						</div>
						<ProjectCoverImage
							src={project.metadata.image}
							alt={
								project.metadata.imageAlt ??
								`${project.metadata.name} preview`
							}
							heightClass={FEATURED_WINDOW_HEIGHT}
						/>
						{/* Card body */}
						<div className="card-body p-4 gap-2">
							<h3 className="font-mono font-bold text-accent">
								{project.metadata.name}
							</h3>
							<p className="font-mono text-sm text-base-content/60 leading-relaxed">
								{project.metadata.description}
							</p>
							<div className="flex flex-wrap gap-1.5 mt-1">
								{project.metadata.tags.map((tag) => (
									<span
										key={tag}
										className="badge badge-sm font-mono bg-base-300 text-base-content/70 border-0"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Third project — full width */}
			{third && (
				<Link
					href={`/projects/${third.metadata.slug}`}
					className="card bg-base-200 overflow-hidden transition-colors hover:bg-base-200/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				>
					<div className="px-4 py-3 bg-base-300 flex items-center justify-between">
						<MacDots />
					</div>
					<ProjectCoverImage
						src={third.metadata.image}
						alt={third.metadata.imageAlt ?? `${third.metadata.name} preview`}
						heightClass={FEATURED_WINDOW_HEIGHT}
					/>
					<div className="card-body p-4 gap-2">
						<h3 className="font-mono font-bold text-primary">
							{third.metadata.name}
						</h3>
						<p className="font-mono text-sm text-base-content/60 leading-relaxed">
							{third.metadata.description}
						</p>
						<div className="flex flex-wrap gap-1.5 mt-1">
							{third.metadata.tags.map((tag) => (
								<span
									key={tag}
									className="badge badge-sm font-mono bg-base-300 text-base-content/70 border-0"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</Link>
			)}
		</section>
	);
}
