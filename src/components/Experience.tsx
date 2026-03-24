import { IconBriefcase } from "@tabler/icons-react";
import { experiences } from "../../content/experience/index";

type ExperienceMetadata = {
	company: string;
	role: string;
	startDate: string;
	endDate: string | null;
	type: "full-time" | "part-time" | "contract";
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
									<span className="font-mono font-bold text-base-content">
										{meta.company}
									</span>
									<span className="font-mono text-xs text-base-content/40">
										{formatDate(meta.startDate)} —{" "}
										{meta.endDate ? formatDate(meta.endDate) : "Present"}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-mono text-sm text-primary">
										{meta.role}
									</span>
									<span className="badge badge-sm font-mono border-0 bg-base-300 text-base-content/60">
										{meta.type}
									</span>
								</div>
							</div>

							<div className="mt-2 font-mono text-sm text-base-content/80 leading-relaxed [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5 [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:before:content-['–'] [&_li]:before:text-accent [&_li]:before:shrink-0 [&_li]:before:pt-0.5">
								<Content />
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
