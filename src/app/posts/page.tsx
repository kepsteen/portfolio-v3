import Navbar from "@/components/Navbar";
import PostsListing from "@/components/PostsListing";
import { posts } from "../../../content/posts/index";

export default function PostsPage() {
	const listItems = posts.map(({ metadata }) => ({
		slug: metadata.slug,
		title: metadata.title,
		date: metadata.date,
		excerpt: metadata.excerpt,
		tags: metadata.tags,
	}));

	return (
		<>
			<Navbar />
			<main className="px-8 pt-24 max-w-3xl mx-auto pb-20">
				<h1 className="font-mono text-3xl font-bold text-primary">Posts</h1>
				<p className="font-mono text-base-content/70 mt-4 max-w-2xl leading-relaxed">
					Recent writing and notes. Each entry is MDX with metadata for this list and the post
					page.
				</p>

				<PostsListing posts={listItems} />
			</main>
		</>
	);
}
