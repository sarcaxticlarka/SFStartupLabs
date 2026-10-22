"use client";
import { mentors } from "@/lib/data";

const Lines = ({ lines }: { lines: React.ReactNode[] }) => (
  <>{lines.map((l, i) => <span className="ln" key={i}><span>{l}</span></span>)}</>
);

const CARDS = [
  { i: 0, l: "4%", t: "10%", s: 0.5 }, { i: 6, l: "74%", t: "6%", s: 0.9 }, { i: 2, l: "1%", t: "46%", s: 1.2 },
  { i: 8, l: "78%", t: "44%", s: 0.6 }, { i: 7, l: "10%", t: "78%", s: 0.8 }, { i: 13, l: "68%", t: "80%", s: 1.1 },
];

/** Jeton "Unify your finances": oversized brand-colour headline with real people floating around it. */
export function Statement() {
  return (
    <section className="statement">
      <h2 className="giant" data-lines><Lines lines={["Meet the room", "before you move", <span key="t" className="under">there.<svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden><path d="M4 15c36-12 62 8 100-2s64 8 98-2 58 6 94-2" /></svg></span>]} /></h2>
      {CARDS.map((c) => (
        <div key={c.i} className="fcard" style={{ left: c.l, top: c.t }} data-speed={c.s}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mentors[c.i].img} alt="" loading="lazy" />
          <div><b>{mentors[c.i].name}</b><span>{mentors[c.i].role}</span></div>
        </div>
      ))}
    </section>
  );
}
