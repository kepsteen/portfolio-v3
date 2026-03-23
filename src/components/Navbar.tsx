"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	useEffect,
	useLayoutEffect,
	useState,
	useSyncExternalStore,
} from "react";
import { IconX } from "@tabler/icons-react";

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME = "aura-dark";

function getThemeSnapshot(): string {
	return localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME;
}

function subscribeTheme(onStoreChange: () => void): () => void {
	const onStorage = () => onStoreChange();
	window.addEventListener("storage", onStorage);
	window.addEventListener("themechange", onStorage);
	return () => {
		window.removeEventListener("storage", onStorage);
		window.removeEventListener("themechange", onStorage);
	};
}

const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Projects", href: "/projects" },
];

const moreLinks = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Projects", href: "/projects" },
	{ label: "Posts", href: "/posts" },
];

const themes = [
	{
		id: "aura-dark",
		label: "Aura Dark",
		bg: "oklch(0.196 0.006 295.7)",
		colors: [
			"oklch(0.677 0.16 280)",
			"oklch(0.907 0.12 165)",
			"oklch(0.872 0.114 62)",
			"oklch(0.298 0.01 290.7)",
		],
	},
	{
		id: "retro",
		label: "Retro",
		bg: "oklch(0.91637 0.034 90.515)",
		colors: [
			"oklch(0.41 0.112 45.904)",
			"oklch(0.8 0.114 19.571)",
			"oklch(0.92 0.084 155.995)",
			"oklch(0.68 0.162 75.834)",
		],
	},
	{
		id: "synthwave",
		label: "Synthwave",
		bg: "oklch(0.15 0.09 281.288)",
		colors: [
			"oklch(0.78 0.115 274.713)",
			"oklch(0.71 0.202 349.761)",
			"oklch(0.82 0.111 230.318)",
			"oklch(0.75 0.183 55.934)",
		],
	},
	{
		id: "forest",
		label: "Forest",
		bg: "oklch(0.2084 0.008 17.911)",
		colors: [
			"oklch(0.83768 0.001 17.911)",
			"oklch(0.68628 0.185 148.958)",
			"oklch(0.69776 0.135 168.327)",
			"oklch(0.70628 0.119 185.713)",
		],
	},
	{
		id: "aqua",
		label: "Aqua",
		bg: "oklch(0.37 0.146 265.522)",
		colors: [
			"oklch(0.9 0.058 230.902)",
			"oklch(0.85661 0.144 198.645)",
			"oklch(0.60682 0.108 309.782)",
			"oklch(0.93426 0.102 94.555)",
		],
	},
	{
		id: "pastel",
		label: "Pastel",
		bg: "oklch(1 0 0)",
		colors: [
			"oklch(0.2 0 0)",
			"oklch(0.9 0.063 306.703)",
			"oklch(0.89 0.058 10.001)",
			"oklch(0.9 0.093 164.15)",
		],
	},
	{
		id: "lemonade",
		label: "Lemonade",
		bg: "oklch(0.9871 0.02 123.72)",
		colors: [
			"oklch(0.19742 0.004 123.72)",
			"oklch(0.5892 0.199 134.6)",
			"oklch(0.7775 0.196 111.09)",
			"oklch(0.8539 0.201 100.73)",
		],
	},
	{
		id: "sunset",
		label: "Sunset",
		bg: "oklch(0.22 0.019 237.69)",
		colors: [
			"oklch(0.77383 0.043 245.096)",
			"oklch(0.74703 0.158 39.947)",
			"oklch(0.72537 0.177 2.72)",
			"oklch(0.71294 0.166 299.844)",
		],
	},
	{
		id: "caramellatte",
		label: "Caramel Latte",
		bg: "oklch(0.98 0.016 73.684)",
		colors: [
			"oklch(0.4 0.123 38.172)",
			"oklch(0 0 0)",
			"oklch(0.2245 0.075 37.85)",
			"oklch(0.4644 0.111 37.85)",
		],
	},
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const pageSegment = pathname === "/" ? null : pathname.split("/")[1];
	const activeTheme = useSyncExternalStore(
		subscribeTheme,
		getThemeSnapshot,
		() => DEFAULT_THEME,
	);

	useLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", activeTheme);
	}, [activeTheme]);

	const handleThemeChange = (themeId: string) => {
		localStorage.setItem(THEME_STORAGE_KEY, themeId);
		window.dispatchEvent(new Event("themechange"));
	};

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="drawer drawer-end">
			<input id="nav-drawer" type="checkbox" className="drawer-toggle" />

			{/* Fixed navbar */}
			<div
				className={[
					"drawer-content fixed top-0 left-0 right-0 z-50 transition-all duration-300",
					scrolled
						? "backdrop-blur-md bg-base-100/70 border-b border-base-300"
						: "bg-transparent",
				].join(" ")}
			>
				<div className="navbar max-w-5xl mx-auto px-6 py-3">
					{/* Left: home link with blinking cursor */}
					<div className="navbar-start">
						<span className="font-mono text-base-content">
							<Link
								href="/"
								className="text-primary hover:text-primary/80 transition-colors"
								style={{ textDecoration: "none" }}
							>
								~
							</Link>
							/{pageSegment && <span>{pageSegment}/</span>}
							<span className="cursor-blink text-primary">▋</span>
						</span>
					</div>

					{/* Right: nav links + More */}
					<div className="navbar-end gap-6">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="font-mono text-sm text-base-content/80 hover:text-base-content transition-colors hidden sm:block"
							>
								{link.label}
							</Link>
						))}
						<label
							htmlFor="nav-drawer"
							className="font-mono text-sm text-base-content/80 hover:text-base-content transition-colors cursor-pointer"
						>
							More...
						</label>
					</div>
				</div>
			</div>

			{/* Drawer sidebar */}
			<div className="drawer-side z-[60]">
				<label
					htmlFor="nav-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				/>
				<div className="bg-base-200 w-72 min-h-full p-8 flex flex-col gap-6">
					<div className="flex justify-between items-center mb-2">
						<span className="font-mono text-base-content/50 text-sm">Menu</span>
						<label
							htmlFor="nav-drawer"
							className="btn btn-ghost btn-sm btn-square"
							aria-label="close"
						>
							<IconX size={16} />
						</label>
					</div>
					<nav className="flex flex-col gap-4">
						{moreLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="font-mono text-lg text-base-content hover:text-primary transition-colors"
							>
								{link.label}
							</Link>
						))}
					</nav>
					<div className="mt-auto flex flex-col gap-3">
						<span className="font-mono text-base-content/50 text-sm">
							Theme
						</span>
						<div className="flex flex-col gap-1">
							{themes.map((t) => (
								<button
									key={t.id}
									onClick={() => handleThemeChange(t.id)}
									className={[
										"flex items-center gap-3 text-sm text-left px-3 py-1.5 rounded-btn transition-colors",
										activeTheme === t.id
											? "bg-base-300 text-base-content"
											: "text-base-content/70 hover:text-base-content hover:bg-base-300",
									].join(" ")}
								>
									<div
										className="grid shrink-0 grid-cols-2 gap-0.5 rounded p-1 shadow-sm"
										style={{ backgroundColor: t.bg }}
									>
										{t.colors.map((color, i) => (
											<div
												key={i}
												className="size-1.5 rounded-full"
												style={{ backgroundColor: color }}
											/>
										))}
									</div>
									<span className="font-mono">{t.label}</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
