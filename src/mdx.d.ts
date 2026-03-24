type ExperienceMetadata = {
	company: string;
	role: string;
	startDate: string;
	endDate: string | null;
	type: "full-time" | "part-time" | "contract";
};

type ProjectMetadata = {
	slug: string;
	name: string;
	description: string;
	tags: import("../content/tags").Tag[];
	image?: string | null;
	imageAlt?: string | null;
	githubUrl?: string | null;
	liveUrl?: string | null;
};

declare module "*.mdx" {
	export const metadata:
		| ExperienceMetadata
		| ProjectMetadata
		| {
				slug: string;
				title: string;
				date: string;
				excerpt: string;
				tags: import("../content/tags").Tag[];
		  };
}
