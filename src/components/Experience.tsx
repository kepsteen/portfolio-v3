import { IconBriefcase } from "@tabler/icons-react";
import { experiences } from "../../content/experience/index";

type ExperienceMetadata = {
	company: string;
	role: string;
	startDate: string;
	endDate: string | null;
	type: "full-time" | "part-time" | "contract";
	companyUrl: string;
};

function formatDate(dateStr: string): string {
	const [year, month] = dateStr.split("-");
	const date = new Date(Number(year), Number(month) - 1);
	return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Experience() {
	return (
		<section className="flex flex-col gap-6">
			<h2 className="font-mono text-2xl font-bold flex items-center gap-2 text-base-content">
				<IconBriefcase size={24} stroke={1.5} className="text-accent" />
				Experience
			</h2>

			<div className="flex flex-col gap-6">
				{experiences.map(({ metadata, Content }) => {
					const meta = metadata as ExperienceMetadata;
					return (
						<div
							key={meta.company}
							className="flex flex-col gap-3 border-l-2 border-base-300 pl-5"
						>
							<div className="flex flex-col gap-1">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<a
										href={meta.companyUrl}
										className="font-mono font-bold text-primary hover:text-primary/80 transition-colors"
										target="_blank"
										rel="noopener noreferrer"
									>
										{meta.company}
									</a>
									<span className="font-mono text-xs text-base-content/40">
										{formatDate(meta.startDate)} —{" "}
										{meta.endDate ? formatDate(meta.endDate) : "Present"}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-mono text-sm text-secondary">
										{meta.role}
									</span>
									<span className="badge badge-sm font-mono border-0 bg-base-300 text-base-content/60">
										{meta.type}
									</span>
								</div>
							</div>

							<div className="prose prose-sm sm:prose-base mt-2 max-w-none font-mono prose-headings:font-mono prose-p:text-base-content/80 prose-li:text-base-content/80 prose-li:marker:text-accent">
								<Content />
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
