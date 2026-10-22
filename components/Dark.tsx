"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { mentors } from "@/lib/data";
import { Scrub } from "./Chrome";

const CELLS = [
  ["01", "Pitch", "Weeks 1–2, online", "Pitch panels with investors and a Communication Lab with actors."],
  ["02", "Paper", "Weeks 1–2, online", "Fundraising law with a Harvard Law expert, plus metrics and finance basics."],
  ["03", "People", "Week 3, San Francisco", "Investor feedback, demo days and meetings in VC offices."],
  ["04", "Place", "Week 3, San Francisco", "Stanford, Big Tech campuses, YC fireside chats and Palo Alto."],
];

const INCLUDED = [
  ["Pitch panels", "Investors take your story apart, then help you rebuild it."],
  ["Fundraising law", "Delaware C-Corp or Flip, SAFEs, founder agreements."],
  ["Product workshops", "Led by Stanford. Customer signal into roadmap choices."],
  ["Communication Lab", "Practice with actors until the first 90 seconds land."],
  ["Visa consultation", "A one-on-one on O-1, EB-1 and EB-2 routes."],
  ["Weekly mentoring", "Someone checking in on you, every week."],
];

function Orbit({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 120 120" className="orbit" aria-hidden>
      <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeOpacity=".35" />
      <g className={`spin s${i}`}><circle cx="106" cy="60" r="3.5" fill="currentColor" /></g>
      <rect x="46" y="46" width="28" height="28" fill="#d6b36a" />
      <path d="M54 60h12M60 54v12" stroke="#000" strokeWidth="2.5" />
    </svg>
  );
}

/** HIFI black block: letters light up on scroll, hairline table with orbit icons. */
export function Pipeline() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dash").forEach((d, i) =>
        gsap.to(d, { backgroundPositionX: (i % 2 ? "-" : "") + gsap.utils.random(300, 800) + "px", duration: gsap.utils.random(12, 28), repeat: -1, ease: "none" }));
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="program" ref={root} className="dark pipeline">
      <div className="dashes" aria-hidden>
        {Array.from({ length: 16 }, (_, i) => <i key={i} className="dash" style={{ top: `${4 + i * 6}%`, width: `${24 + ((i * 19) % 50)}%`, left: `${(i * 29) % 70}%` }} />)}
      </div>
      <div className="wrap">
        <p className="mono y">[ How the three weeks work ]</p>
        <Scrub className="scrub-h" text="Three weeks, built like a pipeline. Each stage hands your startup to the next one a little sharper." />
        <div className="table">
          {CELLS.map(([n, t, when, b], i) => (
            <article key={n} className="tcell" data-reveal>
              <p className="mono">{n} / {t}</p>
              <Orbit i={i} />
              <small className="mono dim">{when}</small>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const Ico = ({ k }: { k: number }) => (
  <svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.3">
    {k % 3 === 0 && <><circle cx="16" cy="16" r="12" /><ellipse cx="16" cy="16" rx="5" ry="12" /><path d="M4 16h24" /></>}
    {k % 3 === 1 && <><circle cx="16" cy="16" r="12" /><rect x="10" y="10" width="12" height="12" /></>}
    {k % 3 === 2 && <><rect x="3" y="8" width="26" height="16" /><path d="M3 14h26" /></>}
  </svg>
);

/** HIFI smeared "horizon" behind a translucent hairline grid. */
export function Included() {
  return (
    <section className="dark horizon">
      <div className="streaks" aria-hidden><i /><i /><i /></div>
      <div className="wrap">
        <p className="mono y" data-reveal>[ What is included ]</p>
        <h2 className="h2" data-lines><span className="ln"><span>Everything a founder trips over</span></span></h2>
        <div className="glass" data-stagger>
          {INCLUDED.map(([t, b], i) => (
            <article key={t} className="gcell"><Ico k={i} /><h3>{t}</h3><p>{b}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Dim pixel matrix (HIFI). */
function Matrix() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const g = c.getContext("2d")!;
    const cols = 48, rows = 26, s = 18;
    c.width = cols * s; c.height = rows * s;
    const grid = Array.from({ length: cols * rows }, () => Math.random());
    const draw = () => {
      g.clearRect(0, 0, c.width, c.height);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const fade = y / rows; // dimmer toward the top
        const v = grid[y * cols + x];
        if (v > 0.72) { g.fillStyle = `rgba(255,255,255,${(v - 0.7) * 0.5 * fade})`; g.fillRect(x * s + 3, y * s + 3, 5 + (v > 0.9 ? 4 : 0), 8); }
      }
      for (let k = 0; k < 40; k++) grid[(Math.random() * grid.length) | 0] = Math.random();
    };
    draw();
    const id = setInterval(draw, 180);
    return () => clearInterval(id);
  }, []);
  return <canvas ref={ref} className="matrix" aria-hidden />;
}

const TREE = [
  "Investors at TCA, Meadow Ventures, Rogue Women's Fund and Decile Group",
  "A scout for a16z",
  "Operators from Y Combinator, xAI, Meta and HockeyStack",
  "People who built products at Apple and DoorDash",
  "Stanford d.school and BDO USA",
  "A network of 100+ investors after the program",
];

export function People() {
  const list = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    const x = gsap.quickTo(box.current, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(box.current, "y", { duration: 0.5, ease: "power3" });
    const el = list.current!;
    const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); x(e.clientX - r.left + 28); y(e.clientY - r.top - 120); };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
  const show = (src: string | null) => {
    if (src) img.current!.src = src;
    gsap.to(box.current, { opacity: src ? 1 : 0, scale: src ? 1 : 0.9, duration: 0.3, ease: "power2.out" });
  };
  return (
    <section id="people" className="dark people">
      <Matrix />
      <div className="wrap">
        <div className="people-top">
          <div>
            <p className="mono y" data-reveal>[ People ]</p>
            <h2 className="h2 yel" data-lines><span className="ln"><span>Learn from people</span></span><span className="ln"><span>who have been there.</span></span></h2>
          </div>
          <div className="tree-wrap">
            <p className="soft" data-reveal>Sixteen mentors from venture funds, early-stage startups and Big Tech.</p>
            <ul className="tree" data-stagger>{TREE.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
        <div className="roster" ref={list} onMouseLeave={() => show(null)}>
          <div className="roster-img" ref={box}>{/* eslint-disable-next-line @next/next/no-img-element */}<img ref={img} alt="" /></div>
          {mentors.map((p, i) => (
            <div key={p.name} className="r-row" onMouseEnter={() => show(p.img)}>
              <span className="mono dim">{String(i + 1).padStart(2, "0")}</span><b>{p.name}</b><span className="r-role">{p.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Corner = () => (
  <svg viewBox="0 0 200 200" className="pgfx" aria-hidden>
    <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeOpacity=".4" />
    {[0, 1, 2, 3].map((k) => (
      <g key={k} transform={`translate(${34 + k * 44} 100)`}>
        <circle r="13" fill="#000" stroke="currentColor" strokeOpacity=".7" />
        <path d="M-5 0h10M0 -5v10" stroke="#d6b36a" strokeWidth="1.6" />
      </g>
    ))}
  </svg>
);

/** HIFI stacked sticky panels. */
export function Panels() {
  return (
    <section className="dark panels">
      <div className="wrap">
        <p className="mono y" data-reveal>[ Support ]</p>
        <h2 className="h2" data-lines><span className="ln"><span>The paperwork that sinks</span></span><span className="ln"><span>good startups</span></span></h2>
        <div className="stack">
          <article className="spanel">
            <Corner />
            <div><h3>It handles the paperwork.</h3>
              <p>A Harvard Law attorney covers incorporation and fundraising, then answers your questions.</p>
              <ul className="gt"><li>Delaware C-Corp or Flip</li><li>SAFEs and convertible notes</li><li>Founder agreements and IP assignment</li><li>Open AMA</li></ul></div>
          </article>
          <article className="spanel">
            <Corner />
            <div><h3>It sorts out your visa.</h3>
              <p>An immigration lawyer affiliated with Techstars maps out how your team can work in the US.</p>
              <ul className="gt"><li>O-1, EB-1 and EB-2 strategy</li><li>A one-on-one consultation for your team</li></ul></div>
          </article>
        </div>
      </div>
    </section>
  );
}
