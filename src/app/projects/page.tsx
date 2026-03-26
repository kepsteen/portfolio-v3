import Link from "next/link";

import Navbar from "@/components/Navbar";
import DrosteWindow from "@/components/DrosteWindow";
import ProjectCoverImage from "@/components/ProjectCoverImage";
import { projects } from "../../../content/projects/index";

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

type Props = {
	searchParams: Promise<{ droste?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
	const { droste } = await searchParams;
	const isDroste = droste === "1";

	return (
		<>
			<Navbar />
			<main className="px-8 pt-24 max-w-6xl mx-auto pb-20">
				<div className="prose prose-sm sm:prose-base max-w-none font-mono prose-headings:font-mono prose-headings:text-secondary prose-p:text-base-content/75">
					<h1 className="mb-0">Projects</h1>
					<p className="mt-4 max-w-2xl">
						Selected work and experiments. Each project is authored as MDX
						alongside structured metadata for reuse on the home page and here.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
					{projects.map(({ metadata }) => (
						<Link
							key={metadata.slug}
							href={`/projects/${metadata.slug}`}
							className="card bg-base-200 overflow-hidden transition-colors hover:bg-base-200/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						>
							<div className="px-4 py-3 bg-base-300 flex items-center justify-between">
								<MacDots />
							</div>
							{metadata.slug === "portfolio-v3" && !isDroste ? (
								<DrosteWindow heightClass="h-56 md:h-60" />
							) : (
								<ProjectCoverImage
									src={metadata.image}
									alt={metadata.imageAlt ?? `${metadata.name} preview`}
									heightClass="h-56 md:h-60"
								/>
							)}
							<div className="card-body p-5 gap-3">
								<h2 className="font-mono font-bold text-lg text-accent">
									{metadata.name}
								</h2>
								<p className="font-mono text-[0.95rem] text-base-content/70 leading-7">
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
							</div>
						</Link>
					))}
				</div>
			</main>
		</>
	);
}
