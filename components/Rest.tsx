"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bridge } from "@/lib/paths";
import { faq, photos } from "@/lib/data";
import { APPLY } from "./Chrome";
import { SFClock } from "./Clock";

gsap.registerPlugin(ScrollTrigger);
const Lines = ({ lines }: { lines: React.ReactNode[] }) => (<>{lines.map((l, i) => <span className="ln" key={i}><span>{l}</span></span>)}</>);

/** Rounded photo panel with frosted caption cards (Jeton testimonials, with real captions). */
export function Photos() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".photos-bg img", { scale: 1.4 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } });
      gsap.from(".frost", { y: 90, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".frost-row", start: "top 92%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  const caps = [
    ["Demo night", "Pitch to 200 members of the San Francisco tech community."],
    ["Meeting YC founders", "Fireside chats with people who have been through it."],
    ["Visiting top companies", "Walk through the offices you have been reading about."],
    ["Stanford day", "A full day on campus with the d.school."],
  ];
  return (
    <section ref={root} className="photos">
      <div className="photos-bg" aria-hidden>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={photos.sf} alt="" loading="lazy" /><i /></div>
      <div className="photos-in">
        <h2 className="h2 white" data-lines><Lines lines={["A week in San Francisco"]} /></h2>
        <div className="frost-row">
          {caps.map(([t, b]) => <div key={t} className="frost"><b>{t}</b><span>{b}</span></div>)}
        </div>
      </div>
    </section>
  );
}

export function Fit() {
  const yes = ["A working MVP", "Early traction", "A team that is committed to this", "Plans to build for a global market"];
  const no = ["You are still at the idea stage", "You would rather not hear criticism", "You want community and nothing else", "You have no plans for the US"];
  return (
    <section className="white-sec">
      <p className="mono o" data-reveal>[ Who should apply ]</p>
      <h2 className="h2 org" data-lines><Lines lines={["Is this for you?"]} /></h2>
      <div className="tints" data-stagger>
        <div className="tint"><h3>Apply if you have</h3><ul>{yes.map((t) => <li key={t}><i>+</i>{t}</li>)}</ul></div>
        <div className="tint dim"><h3>Wait if</h3><ul>{no.map((t) => <li key={t}><i>×</i>{t}</li>)}</ul></div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="white-sec faq">
      <p className="mono o" data-reveal>[ Questions ]</p>
      <h2 className="h2 org" data-lines><Lines lines={["Before you ask"]} /></h2>
      <div className="acc" data-stagger>
        {faq.map((f, i) => (
          <div key={f.q} className={`acc-item${open === i ? " open" : ""}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{f.q}</span><i>{open === i ? "−" : "+"}</i></button>
            <div className="acc-body"><p>{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The closing bridge draws itself as you scroll into it. */
export function Cta() {
  const root = useRef<HTMLElement>(null);
  const b = bridge(40, 1160, 300, 36);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGGeometryElement>(".cta-art .draw");
      paths.forEach((p) => gsap.set(p, { strokeDasharray: p.getTotalLength(), strokeDashoffset: p.getTotalLength() }));
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", end: "top 15%", scrub: 0.8 } })
        .to(".c-deck", { strokeDashoffset: 0, duration: 1, ease: "none" })
        .to(".c-towers", { strokeDashoffset: 0, duration: 1, ease: "none" })
        .to(".c-cable", { strokeDashoffset: 0, duration: 1.6, ease: "none" })
        .to(".c-hang", { strokeDashoffset: 0, duration: 1.4, ease: "none" });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="cta">
      <svg className="cta-art" viewBox="0 0 1200 330" aria-hidden>
        <path className="draw c-deck" d={b.deck} /><path className="draw c-towers" d={b.towers} />
        <path className="draw c-cable" d={b.cable} /><path className="draw c-hang thin" d={b.hangers} />
      </svg>
      <div className="cta-in">
        <p className="mono">Cohort starts April 5, 2027</p>
        <h2 className="giant w" data-lines><Lines lines={["Ready to find", "out?"]} /></h2>
        <a className="btn white big" href={APPLY} data-cursor="Apply">Apply now</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-grid">
        <div><p className="mono dim">Program</p><a href="#program">How it works</a><a href="#people">People</a><a href="#apply">How to apply</a><a href="#faq">FAQ</a></div>
        <div><p className="mono dim">Contact</p><a href="mailto:hello@sfstartuplabs.com">hello@sfstartuplabs.com</a></div>
        <div><p className="mono dim">System status</p><span className="status"><i />Applications open</span></div>
      </div>
      <p className="mono dim fine">© 2026 SF Startup Labs. No equity. <SFClock className="foot-clock" /></p>
      <div className="foot-word" aria-hidden>SF STARTUP LABS</div>
    </footer>
  );
}
