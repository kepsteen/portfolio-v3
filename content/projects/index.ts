import type { ComponentType } from "react";

import type { Tag } from "../tags";
import PortfolioV3, {
	metadata as portfolioV3Meta,
} from "./02-portfolio-v3.mdx";
import JuneBug, { metadata as juneBugMeta } from "./01-junebug.mdx";
import PicklePal, { metadata as picklePalMeta } from "./03-picklepal.mdx";
import ReactExpressStarter, {
	metadata as reactExpressStarterMeta,
} from "./04-react-express-starter.mdx";

export type ProjectMetadata = {
	slug: string;
	name: string;
	description: string;
	tags: Tag[];
	/** Path served from `public/`, e.g. `/june-bug.webp` */
	image?: string | null;
	imageAlt?: string | null;
	githubUrl?: string | null;
	liveUrl?: string | null;
};

export type ProjectEntry = {
	metadata: ProjectMetadata;
	Content: ComponentType;
};

export const projects: ProjectEntry[] = [
	{ metadata: juneBugMeta as ProjectMetadata, Content: JuneBug },
	{ metadata: picklePalMeta as ProjectMetadata, Content: PicklePal },
	{
		metadata: reactExpressStarterMeta as ProjectMetadata,
		Content: ReactExpressStarter,
	},
	{ metadata: portfolioV3Meta as ProjectMetadata, Content: PortfolioV3 },
];

/** First three entries power the Featured Projects section on the home page. */
export const featuredProjects = projects.slice(0, 3);

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
	return projects.find((p) => p.metadata.slug === slug);
}
