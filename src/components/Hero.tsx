import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconArrowRight,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
	{ label: "GitHub", href: "https://github.com", icon: IconBrandGithub },
	{ label: "LinkedIn", href: "https://linkedin.com", icon: IconBrandLinkedin },
];

const companies = [
	{ name: "HOTB Software", emoji: "🏢", current: true },
	{ name: "Quantiiv", emoji: "📊", current: false },
];

export default function Hero() {
	return (
		<section className="pt-20 pb-4">
			<div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start sm:items-center sm:justify-between">
				<div className="flex flex-col gap-8 min-w-0 flex-1">
					{/* Headline */}
					<div>
						<h1 className="font-mono text-3xl md:text-4xl font-bold leading-tight">
							Hey! I&apos;m <span className="text-accent">Cody Epstein</span>
						</h1>
					</div>

					{/* Bio */}
					<p className="font-mono text-base text-base-content/80 leading-relaxed max-w-2xl">
						Full-stack dev who works across every layer of the app — backend,
						frontend, and everything holding them together. Currently shipping
						production software in gov tech, previously in startups. I like small
						teams, hard problems, and owning solutions from end to end.
					</p>

					{/* Social links */}
					<div className="flex flex-wrap items-center gap-3 font-mono text-sm text-base-content/60">
						{socialLinks.map((link, i) => (
							<span key={link.label} className="flex items-center gap-3">
								<a
									href={link.href}
									className="flex items-center gap-1.5 hover:text-primary transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									<link.icon size={16} stroke={1.5} />
									{link.label}
								</a>
								{i < socialLinks.length - 1 && (
									<span className="text-base-content/30">|</span>
								)}
							</span>
						))}
						<span className="text-base-content/30">|</span>
						<Link
							href="/about"
							className="group flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
						>
							More about me
							<IconArrowRight
								size={16}
								stroke={1.5}
								className="transition-transform duration-200 group-hover:translate-x-0.5"
							/>
						</Link>
					</div>

					{/* Companies row */}
					<div className="flex flex-wrap items-center gap-3 font-mono text-sm text-base-content/70">
						{companies.map((company, i) => (
							<span key={company.name} className="flex items-center gap-3">
								<span className="flex items-center gap-1.5">
									<span>{company.emoji}</span>
									<span
										className={
											company.current
												? "text-base-content"
												: "text-base-content/60"
										}
									>
										{company.name}
									</span>
									{!company.current && (
										<span className="text-base-content/40 text-xs">(Past)</span>
									)}
								</span>
								{i < companies.length - 1 && (
									<span className="text-base-content/30">/</span>
								)}
							</span>
						))}
					</div>
				</div>

				<div className="relative size-[200px] shrink-0 overflow-hidden rounded-full self-end sm:self-auto">
					<Image
						src="/portfolio-headshot.webp"
						alt="Cody Epstein"
						fill
						className="object-cover object-top"
						sizes="200px"
						priority
					/>
				</div>
			</div>
		</section>
	);
}
