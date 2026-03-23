"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

const moreLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Posts", href: "/posts" },
  { label: "Pics", href: "/pics" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
            <Link
              href="/"
              className="font-mono text-base-content hover:text-primary transition-colors"
            >
              ~/
              <span className="cursor-blink">▋</span>
            </Link>
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
        </div>
      </div>
    </div>
  );
}
