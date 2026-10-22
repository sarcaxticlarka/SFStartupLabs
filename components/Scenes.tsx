"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weeks } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  <path key="a" d="M5 6h14v9H10l-4 3v-3H5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  <path key="b" d="M12 19V6m0 0l-5 5m5-5l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="c" d="M3 13l18-8-6 15-3-6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
];
const SCENES = [
  { w: "Pitch", bg: "linear-gradient(160deg,#c8472a,#872a15)", d: "Two weeks online. Pitch panels, a Communication Lab, and straight notes on your story." },
  { w: "Raise", bg: "linear-gradient(160deg,#1d2c48,#0e1626)", d: "A week in San Francisco. Investor feedback, demo night, VC offices." },
  { w: "Land", bg: "linear-gradient(160deg,#274840,#12251f)", d: "Legal and visa help, so the company can actually operate in the US." },
];

/** Pinned three-scene sequence: each scene opens as a circular wipe from the one before. */
export function Wipe() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".scene");
      gsap.set(layers.slice(1), { clipPath: "circle(0% at 50% 62%)" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "+=320%", pin: true, scrub: 0.6,
          onUpdate: (s) => {
            const i = Math.min(2, Math.floor(s.progress * 3 + 0.12));
            const c = root.current!.querySelector<HTMLElement>(".wipe-count");
            if (c) c.textContent = `0${i + 1} / 03 — ${SCENES[i].w}`;
          },
        },
      });
      tl.from(layers[0].querySelector(".scene-in"), { scale: 0.9, opacity: 0.3, duration: 0.6, ease: "none" }, 0);
      [1, 2].forEach((k, n) => {
        tl.to(layers[k], { clipPath: "circle(150% at 50% 62%)", duration: 1, ease: "power1.inOut" }, 0.9 + n * 1.3)
          .from(layers[k].querySelector(".scene-in"), { scale: 0.86, y: 60, duration: 1, ease: "power2.out" }, 1.1 + n * 1.3);
      });
      tl.to({}, { duration: 0.4 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="wipe">
      {SCENES.map((s, i) => (
        <div key={s.w} className="scene" style={{ background: s.bg }}>
          <div className="scene-in">
            <span className="scene-ico"><svg viewBox="0 0 24 24">{ICONS[i]}</svg></span>
            <h2 className="scene-w">{s.w}</h2>
            <p>{s.d}</p>
          </div>
        </div>
      ))}
      <p className="mono wipe-count">01 / 03 — Pitch</p>
    </section>
  );
}

const ROW1 = ["100+ investors", "16 mentors", "3 weeks", "$2,900 per team"];
const ROW2 = ["No equity", "200 at demo night", "2 weeks online", "1 week in San Francisco"];

/** Giant numerals that slide sideways as you scroll, in opposite directions. */
export function Stats() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".st-a", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".st-b", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      const skew = gsap.quickTo(".st-row", "skewX", { duration: 0.45, ease: "power3" });
      ScrollTrigger.create({ onUpdate: (self) => skew(gsap.utils.clamp(-9, 9, self.getVelocity() / -260)) });
    }, root);
    return () => ctx.revert();
  }, []);
  const row = (a: string[], cls: string) => (
    <div className={`st-row ${cls}`}>{[...a, ...a].map((t, i) => <span key={i} className={i % 2 ? "out" : ""}>{t}<i>✦</i></span>)}</div>
  );
  return (
    <section ref={root} className="stats-band" aria-label="Key numbers">
      {row(ROW1, "st-a")}
      {row(ROW2, "st-b")}
    </section>
  );
}

/** Pinned horizontal schedule on dark, with real photos. */
export function Weeks() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = root.current!.querySelector<HTMLElement>(".w-track")!;
      gsap.matchMedia().add("(min-width: 800px)", () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - innerWidth + 64), ease: "none",
          scrollTrigger: {
            trigger: root.current, start: "top top", end: () => "+=" + (track.scrollWidth - innerWidth), pin: true, scrub: 0.7, invalidateOnRefresh: true,
            onUpdate: (s) => { const f = root.current!.querySelector<HTMLElement>(".w-fill"); if (f) f.style.transform = `scaleX(${s.progress})`; },
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="dark weeks">
      <div className="w-head">
        <p className="mono y">[ The schedule ]</p>
        <h2 className="h2">Eight stops in three weeks.</h2>
        <i className="w-bar"><i className="w-fill" /></i>
      </div>
      <div className="w-track">
        {weeks.map((w) => (
          <article key={w.n} className="w-card">
            <div className="w-img">
              {w.img && /* eslint-disable-next-line @next/next/no-img-element */ <img src={w.img} alt="" loading="lazy" />}
              <span className="w-num">{w.n}</span>
            </div>
            <div className="w-body"><small className="mono y">{w.tag}</small><h3>{w.title}</h3><p>{w.body}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
