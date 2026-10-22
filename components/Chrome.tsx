"use client";
import { useEffect, useState } from "react";

export const APPLY = "mailto:hello@sfstartuplabs.com?subject=Spring%202027%20application";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo${light ? " light" : ""}`} href="#top" aria-label="SF Startup Labs">
      <svg viewBox="0 0 36 22" width="34" height="21" aria-hidden>
        <path d="M2 20h32M9 20V3m18 17V3M9 3c4 12 14 12 18 0M0 11c5 0 9-4 9-8m27 8c-5 0-9-4-9-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span>SF Startup Labs</span>
    </a>
  );
}

/** Dismissible acid-yellow bar (HIFI). */
export function Announce() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="announce">
      <span>Applications are open for Spring 2027</span>
      <a href={APPLY}>Read more</a>
      <button onClick={() => setOpen(false)} aria-label="Dismiss">×</button>
    </div>
  );
}

const DOCK = [["program", "Program"], ["people", "People"], ["apply", "Apply"], ["faq", "FAQ"]];

/** Floating pill dock (Jeton). */
export function Dock() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = DOCK.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -45% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="dock" aria-label="Sections">
      <a href="#top" className="home" aria-label="Top">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
      </a>
      {DOCK.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>{label}</a>)}
    </nav>
  );
}

/** Text whose letters light up with scroll. */
export function Scrub({ text, className }: { text: string; className?: string }) {
  return (
    <p data-scrub className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="sw">{w.split("").map((c, j) => <span key={j} className="sc">{c}</span>)}{" "}</span>
      ))}
    </p>
  );
}
