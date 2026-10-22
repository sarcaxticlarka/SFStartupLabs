"use client";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { bridge, scribble } from "@/lib/paths";

/** Opening curtain: the scribble tightens into the bridge while a counter runs, then the curtain lifts. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const d = useMemo(() => {
    const b = bridge(300, 590, 70, 10);
    return scribble(10, 310, 70, 6, 34) + b.deck + b.towers + b.cable;
  }, []);
  useEffect(() => {
    const el = root.current!;
    document.documentElement.classList.add("is-loading");
    const ctx = gsap.context(() => {
      const p = el.querySelector<SVGPathElement>(".pl-path")!;
      const L = p.getTotalLength();
      gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
      const o = { v: 0 };
      gsap.timeline({ onComplete: () => { el.style.display = "none"; document.documentElement.classList.remove("is-loading"); } })
        .to(p, { strokeDashoffset: 0, duration: 1.7, ease: "power2.inOut" }, 0)
        .to(o, { v: 100, duration: 1.7, ease: "power2.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(o.v)).padStart(3, "0"); } }, 0)
        .to(".pl-in", { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" }, 1.85)
        .to(el, { yPercent: -100, duration: 1, ease: "power4.inOut" }, 2.0);
    }, el);
    return () => { ctx.revert(); document.documentElement.classList.remove("is-loading"); };
  }, []);
  return (
    <div ref={root} className="preloader" aria-hidden>
      <div className="pl-in">
        <svg viewBox="0 0 600 140" className="pl-art"><path className="pl-path" d={d} /></svg>
        <div className="pl-row"><span className="mono">SF Startup Labs</span><span className="mono"><span ref={num}>000</span> / 100</span></div>
      </div>
    </div>
  );
}

/** Cursor ring that grows over interactive things, plus magnetic buttons. Desktop only. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ring.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    const move = (e: MouseEvent) => {
      x(e.clientX); y(e.clientY);
      const t = (e.target as HTMLElement).closest("a, button, .r-row, .fcard");
      el.classList.toggle("big", !!t);
      const b = (e.target as HTMLElement).closest<HTMLElement>(".btn");
      document.querySelectorAll<HTMLElement>(".btn").forEach((n) => { if (n !== b) gsap.to(n, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,.5)", overwrite: "auto" }); });
      if (b) { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3, overwrite: "auto" }); }
    };
    el.style.opacity = "1";
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);
  return <div ref={ring} className="cursor" aria-hidden />;
}
