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
				<div className="prose prose-sm sm:prose-base max-w-none font-mono prose-headings:font-mono prose-headings:text-primary prose-p:text-base-content/75">
					<h1 className="mb-0">Posts</h1>
					<p className="mt-4 max-w-2xl">
					Recent writing and notes. Each entry is MDX with metadata for this list and the post
					page.
					</p>
				</div>

				<PostsListing posts={listItems} />
			</main>
		</>
	);
}
