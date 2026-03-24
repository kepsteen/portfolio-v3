import Image from "next/image";

type ProjectCoverImageProps = {
	/** Path under `public/`, e.g. `/june-bug.webp` */
	src?: string | null;
	alt: string;
	/** Tailwind height class for the cover area */
	heightClass: string;
	/** Rounded frame with full border (e.g. project detail hero) */
	rounded?: boolean;
};

export default function ProjectCoverImage({
	src,
	alt,
	heightClass,
	rounded = false,
}: ProjectCoverImageProps) {
	if (!src) {
		return (
			<div
				className={[
					heightClass,
					"shrink-0 bg-base-300/50",
					rounded
						? "rounded-box border border-base-300"
						: "border-b border-base-300",
				].join(" ")}
			/>
		);
	}

	const shell = rounded
		? `relative w-full ${heightClass} shrink-0 overflow-hidden rounded-box border border-base-300 bg-base-300/30`
		: `relative w-full ${heightClass} shrink-0 overflow-hidden border-b border-base-300 bg-base-300/30`;

	return (
		<div className={shell}>
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover object-top"
				sizes="(max-width: 896px) 100vw, 896px"
			/>
		</div>
	);
}
