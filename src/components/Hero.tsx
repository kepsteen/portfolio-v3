import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandX,
	IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";

const socialLinks = [
	{ label: "GitHub", href: "https://github.com", icon: IconBrandGithub },
	{ label: "LinkedIn", href: "https://linkedin.com", icon: IconBrandLinkedin },
	{ label: "X", href: "https://x.com", icon: IconBrandX },
];

const companies = [
	{ name: "Acme Corp", emoji: "🏢", current: true },
	{ name: "StorageCo", emoji: "📦", current: false },
	{ name: "Hack Club", emoji: "🐒", current: false },
];

export default function Hero() {
	return (
		<section className="flex flex-col gap-8 pt-20 pb-4">
			{/* Headline */}
			<div>
				<h1 className="font-mono text-3xl md:text-4xl font-bold leading-tight">
					Hey! I&apos;m <span className="text-primary">Your Name</span>
				</h1>
			</div>

			{/* Bio */}
			<p className="font-mono text-base text-base-content/80 leading-relaxed max-w-2xl">
				I&apos;m currently working as a Senior SWE @{" "}
				<a
					href="#"
					className="text-primary underline underline-offset-2 decoration-primary decoration-wavy hover:opacity-80 transition-opacity"
				>
					Acme Corp
				</a>
				. I&apos;ve written{" "}
				<span className="bg-base-300 px-1 rounded text-primary">software</span>{" "}
				that is trusted by{" "}
				<a
					href="#"
					className="text-primary underline underline-offset-2 decoration-primary decoration-wavy hover:opacity-80 transition-opacity"
				>
					The Open Source Foundation
				</a>
				,{" "}
				<a
					href="#"
					className="text-primary underline underline-offset-2 decoration-primary decoration-wavy hover:opacity-80 transition-opacity"
				>
					Major Linux Distro
				</a>
				, and many others. Seeing code I wrote actually help people at scale is
				what keeps me building. Currently building AI that helps people
				articulate their ideas and share them at scale.
			</p>

			{/* Social links */}
			<div className="flex flex-wrap items-center gap-3 font-mono text-sm text-base-content/60">
				{socialLinks.map((link, i) => (
					<span key={link.label} className="flex items-center gap-3">
						<a
							href={link.href}
							className="flex items-center gap-1.5 hover:text-base-content transition-colors"
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
					className="flex items-center gap-1 hover:text-base-content transition-colors"
				>
					More about me
					<IconArrowRight size={14} stroke={1.5} />
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
									company.current ? "text-base-content" : "text-base-content/60"
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
		</section>
	);
}
