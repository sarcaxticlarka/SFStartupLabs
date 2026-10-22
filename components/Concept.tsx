"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { profile } from "@/lib/profile";

/** Floating credit pill that opens a "build notes" drawer: the case for the person who made this. */
export default function Concept() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panel.current) return;
    if (open) {
      document.documentElement.classList.add("is-loading");
      gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: "power4.out" });
      gsap.fromTo(".notes-in > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, delay: 0.2, ease: "power3.out" });
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => { removeEventListener("keydown", esc); document.documentElement.classList.remove("is-loading"); };
  }, [open]);
  const close = () => gsap.to(panel.current, { xPercent: 100, duration: 0.5, ease: "power3.in", onComplete: () => setOpen(false) });
  return (
    <>
      <button className="concept" onClick={() => setOpen(true)} data-cursor="Notes">
        <i /> Concept by {profile.name} <span>↗</span>
      </button>
      {open && (
        <div className="notes" role="dialog" aria-modal="true" aria-label="Build notes">
          <div className="notes-bg" onClick={close} />
          <div className="notes-panel" ref={panel} data-lenis-prevent>
            <button className="notes-x" onClick={close} aria-label="Close">×</button>
            <div className="notes-in">
              <p className="mono y">[ Build notes ]</p>
              <h2>A concept for SF Startup Labs, built as an internship pitch.</h2>
              <p className="lede">
                Hi, I&apos;m {profile.name}, a {profile.role.toLowerCase()}. This is an unsolicited concept. I rebuilt your landing page to                show how I think about design and motion, and I&apos;d like to help build the real thing.
              </p>

              <h3 className="mono">What I changed</h3>
              <ul>
                <li><b>One idea, not a template.</b> A scribble that tightens into the Golden Gate Bridge. It is generated from path math and reused as the loader, the hero line and the closing scene.</li>
                <li><b>One palette.</b> Your real photos are tinted in a shader so every image sits in the same ivory, ink and terracotta world.</li>
                <li><b>Plain copy.</b> Rewritten in simple language, using only facts already on your site.</li>
                <li><b>Motion with a job.</b> The Pitch / Raise / Land sequence maps to the three stages of the program. The schedule scrolls sideways because it is a journey.</li>
              </ul>

              <h3 className="mono">Under the hood</h3>
              <ul>
                <li>Next.js App Router, TypeScript</li>
                <li>GSAP and ScrollTrigger for timelines and pinned scenes</li>
                <li>Lenis smooth scroll, synced to ScrollTrigger</li>
                <li>OGL for the hero shader: cursor-driven liquid push, RGB split, duotone grade</li>
                <li>Custom cursor with context labels, magnetic buttons, text scramble, scroll-velocity skew</li>
                <li>A same-origin image route so WebGL can use photos from your server</li>
              </ul>

              <h3 className="mono">Care details</h3>
              <ul>
                <li>Smooth scroll and the shader switch off for reduced-motion users</li>
                <li>Layouts checked at phone width, with sideways scroll falling back to swipe</li>
                <li>Photos load from your site. Nothing is hosted or copied here</li>
              </ul>

              <div className="notes-cta">
                <a className="btn solid" href={`mailto:${profile.email}?subject=Internship%20-%20SF%20Startup%20Labs%20concept`}>Email me</a>
                <a className="btn line" href={profile.site} target="_blank" rel="noreferrer">Portfolio</a>
                <a className="btn line" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
