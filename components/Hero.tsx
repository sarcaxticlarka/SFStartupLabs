"use client";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { bridge, scribble } from "@/lib/paths";
import { photos } from "@/lib/data";
import { APPLY, Logo } from "./Chrome";

/** Jeton-style colour panel: giant white headline, small text block bottom-right. The scribble tightens into the bridge. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const art = useMemo(() => ({ scr: scribble(10, 760, 130, 8, 70), ...bridge(740, 1190, 130, 22) }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGGeometryElement>(".hero .draw").forEach((p) => gsap.set(p, { strokeDasharray: p.getTotalLength(), strokeDashoffset: p.getTotalLength() }));
      const tl = gsap.timeline({ delay: 2.1 });
      tl.from(".hero-bg", { scale: 1.2, duration: 2.4, ease: "power3.out" }, 0)
        .from(".hero-h1 .ln > span", { yPercent: 105, duration: 1.1, stagger: 0.12, ease: "power4.out" }, 0.3)
        .from(".hero-in", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 0.9)
        .to(".d-scr", { strokeDashoffset: 0, duration: 3.2, ease: "power1.inOut" }, 0.6)
        .to(".d-deck", { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 3.5)
        .to(".d-towers", { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, 3.8)
        .to(".d-cable", { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 4.1)
        .to(".d-hang", { strokeDashoffset: 0, duration: 1.2, ease: "power1.out" }, 4.7);
      // cinematic push-in while the hero stays pinned
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 10px", end: "+=120%", pin: true, scrub: 0.6 } })
        .to(".hero-bg img", { scale: 1.32, ease: "none" }, 0)
        .to(".hero-bg i", { opacity: 1, ease: "none" }, 0)
        .to(".hero-bottom", { y: -160, opacity: 0, ease: "none" }, 0)
        .to(".hero-art", { opacity: 0, y: -60, ease: "power1.in" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-bg" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos.demo} alt="" />
        <i />
      </div>
      <header className="hero-bar">
        <Logo light />
        <a className="btn white" href={APPLY}>Apply</a>
      </header>
      <svg className="hero-art" viewBox="0 0 1200 170" aria-hidden>
        <path className="draw d-scr" d={art.scr} />
        <path className="draw d-deck" d={art.deck} />
        <path className="draw d-towers" d={art.towers} />
        <path className="draw d-cable" d={art.cable} />
        <path className="draw d-hang thin" d={art.hangers} />
      </svg>
      <div className="hero-bottom">
        <h1 className="hero-h1">
          <span className="ln"><span>Find out what</span></span>
          <span className="ln"><span>Silicon Valley thinks</span></span>
          <span className="ln"><span>of your startup.</span></span>
        </h1>
        <div className="hero-side hero-in">
          <p>Three weeks for early-stage founders. Two online, one in San Francisco, with the people who decide who gets funded. $2,900 per team, no equity.</p>
          <div className="hero-btns">
            <a className="btn white" href={APPLY}>Apply for Spring 2027</a>
            <a className="btn ghost" href="#program">See the schedule</a>
          </div>
        </div>
      </div>
    </section>
  );
}
