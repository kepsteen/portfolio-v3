import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
	return {
		img: ({ src, alt, className, ...props }) => {
			if (typeof src !== "string") return null;
			return (
				// eslint-disable-next-line @next/next/no-img-element -- MDX authors use arbitrary paths under /public
				<img
					src={src}
					alt={typeof alt === "string" ? alt : ""}
					className={[
						"my-6 w-full max-w-full rounded-lg border border-base-300",
						className,
					]
						.filter(Boolean)
						.join(" ")}
					{...props}
				/>
			);
		},
	};
}
