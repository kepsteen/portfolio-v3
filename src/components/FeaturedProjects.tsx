import { IconStar, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

const projects = [
  {
    name: "portfolio-v3",
    description: "Personal portfolio built with Next.js 16, Tailwind v4, and DaisyUI. Features a terminal-inspired aesthetic and dark theme.",
    stars: 142,
    tags: ["Next.js", "TypeScript", "DaisyUI"],
  },
  {
    name: "cli-toolkit",
    description: "A collection of CLI utilities for automating common development workflows. Used by hundreds of developers.",
    stars: 891,
    tags: ["Node.js", "TypeScript", "CLI"],
  },
  {
    name: "open-sync",
    description: "Real-time data synchronization library with offline-first support and conflict resolution.",
    stars: 2047,
    tags: ["Rust", "WebAssembly", "SQLite"],
  },
];

function MacDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#ff5f56" }} />
      <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#ffbd2e" }} />
      <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#27c93f" }} />
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="flex flex-col gap-6 pb-20">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-2xl font-bold flex items-center gap-2">
          <IconStar size={24} stroke={1.5} className="text-accent" />
          Featured Projects
        </h2>
        <Link
          href="/projects"
          className="font-mono text-sm text-accent underline underline-offset-4 flex items-center gap-1 hover:text-accent/80 transition-colors"
        >
          View all
          <IconArrowRight size={14} stroke={1.5} />
        </Link>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.slice(0, 2).map((project) => (
          <div key={project.name} className="card bg-base-200 overflow-hidden">
            {/* Window chrome */}
            <div className="px-4 py-3 bg-base-300 flex items-center justify-between">
              <MacDots />
              <div className="flex items-center gap-1 font-mono text-xs text-base-content/50">
                <IconStar size={12} stroke={1.5} />
                {project.stars.toLocaleString()}
              </div>
            </div>
            {/* Screenshot placeholder */}
            <div className="h-36 bg-base-300/50 border-b border-base-300" />
            {/* Card body */}
            <div className="card-body p-4 gap-2">
              <h3 className="font-mono font-bold text-base-content">{project.name}</h3>
              <p className="font-mono text-sm text-base-content/60 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-sm font-mono bg-base-300 text-base-content/70 border-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Third project — full width */}
      {projects[2] && (
        <div className="card bg-base-200 overflow-hidden">
          <div className="px-4 py-3 bg-base-300 flex items-center justify-between">
            <MacDots />
            <div className="flex items-center gap-1 font-mono text-xs text-base-content/50">
              <IconStar size={12} stroke={1.5} />
              {projects[2].stars.toLocaleString()}
            </div>
          </div>
          <div className="card-body p-4 gap-2">
            <h3 className="font-mono font-bold text-base-content">{projects[2].name}</h3>
            <p className="font-mono text-sm text-base-content/60 leading-relaxed">
              {projects[2].description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {projects[2].tags.map((tag) => (
                <span
                  key={tag}
                  className="badge badge-sm font-mono bg-base-300 text-base-content/70 border-0"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
