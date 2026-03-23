import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-8 max-w-4xl mx-auto flex flex-col gap-20">
        <Hero />
        <FeaturedProjects />
      </main>
    </>
  );
}
