"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scroll synced to ScrollTrigger, plus page-wide reveals. */
export default function Smooth() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.09, smoothWheel: true });
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.from(el, { y: 32, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((w) =>
        gsap.from(w.children, { y: 40, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: w, start: "top 85%" } }));
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((h) =>
        gsap.from(h.querySelectorAll(".ln > span"), { yPercent: 105, duration: 1.1, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: h, start: "top 88%" } }));
      // letters light up as you scroll past (HIFI)
      gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) =>
        gsap.fromTo(el.querySelectorAll(".sc"), { opacity: 0.16 }, { opacity: 1, stagger: 0.04, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } }));
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) =>
        gsap.to(el, { y: () => -Number(el.dataset.speed) * 140, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, { v: Number(el.dataset.count), duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%" }, onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString()) });
      });
    });
    return () => {
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
      }
    };
  }, []);
  return null;
}
