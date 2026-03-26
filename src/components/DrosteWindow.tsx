"use client";

import { useEffect, useRef, useState } from "react";

type DrosteWindowProps = {
	/** Tailwind height class for the window area, e.g. "h-56 md:h-60" */
	heightClass: string;
};

export default function DrosteWindow({ heightClass }: DrosteWindowProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [scale, setScale] = useState(0);
	const [iframeHeight, setIframeHeight] = useState(0);
	// Use empty string on server to avoid SSR mismatch; set to current URL after mount
	const [src, setSrc] = useState("");
	// Set src to current page URL with ?droste=1 so the iframe renders the static image
	useEffect(() => {
		const url = new URL(window.location.href);
		url.searchParams.set("droste", "1");
		setSrc(url.toString());
	}, []);

	// Measure container and compute scale
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const measure = () => {
			const containerWidth = el.offsetWidth;
			const containerHeight = el.offsetHeight;
			const s = containerWidth / window.innerWidth;
			setScale(s);
			setIframeHeight(containerHeight / s);
		};

		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	// Sync iframe scroll position to match the parent page
	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe || !src) return;

		const syncScroll = () => {
			try {
				iframe.contentWindow?.scrollTo(0, window.scrollY);
			} catch {
				// same-origin should always succeed; guard for safety
			}
		};

		const handleLoad = () => syncScroll();

		iframe.addEventListener("load", handleLoad);
		window.addEventListener("scroll", syncScroll, { passive: true });

		return () => {
			iframe.removeEventListener("load", handleLoad);
			window.removeEventListener("scroll", syncScroll);
		};
	}, [src]);

	return (
		<div
			ref={containerRef}
			className={`relative w-full ${heightClass} shrink-0 overflow-hidden border-b border-base-300 bg-base-300/50`}
		>
			{scale > 0 && src && (
				<iframe
					ref={iframeRef}
					src={src}
					aria-hidden="true"
					tabIndex={-1}
					title="Portfolio preview"
					style={{
						width: "100vw",
						height: iframeHeight,
						transform: `scale(${scale})`,
						transformOrigin: "top left",
						pointerEvents: "none",
						border: "none",
					}}
				/>
			)}
		</div>
	);
}
