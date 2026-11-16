"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/ui/Wordmark";
import { useTrip } from "@/components/trip/TripProvider";

const navLinks = [
  { href: "#destinations", label: "Destinations" },
  { href: "#experiences", label: "Experiences" },
  { href: "#why-trav2asia", label: "Why Trav2Asia" },
  { href: "#stories", label: "Stories" },
];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const { resetFilters } = useTrip();

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    firstLinkRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function exploreAll() {
    resetFilters();
    closeMenu();
  }

  const headerSurface = solid || menuOpen ? "bg-paper/95 border-b border-ink/15 shadow-[0_1px_0_0_var(--ink)]" : "bg-transparent";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-(--duration-ui) ${headerSurface}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <a href="#top" className="rounded-sm" onClick={closeMenu}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold hover:text-orange-deep focus-visible:outline-offset-4">
              {link.label}
            </a>
          ))}
          <a
            href="#experiences"
            onClick={resetFilters}
            className="inline-flex min-h-11 items-center bg-orange px-5 text-sm font-bold text-ink hover:bg-orange-deep hover:text-paper"
          >
            Explore
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-ink md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <motion.div
          id="mobile-menu"
          initial={reduceMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="border-t border-ink/15 bg-paper px-5 pb-8 pt-4 md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href} className="border-b border-ink/15">
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex min-h-12 items-center text-lg font-bold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#experiences"
            onClick={exploreAll}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center bg-orange px-5 text-base font-bold text-ink"
          >
            Explore experiences
          </a>
        </motion.div>
      ) : null}
    </header>
  );
}
