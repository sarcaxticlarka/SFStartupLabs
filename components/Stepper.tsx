"use client";
import { useEffect, useState } from "react";
import { APPLY } from "./Chrome";

const STEPS = [
  ["Send a short form", "A few minutes. Tell us what you are building and who is on the team."],
  ["Talk to us for 20 minutes", "Selected founders get a short interview with the team."],
  ["Get selected", "Admissions are rolling. Earlier applications get a decision sooner."],
  ["Two weeks online", "April 5–16. Panels, law, product workshops and the Communication Lab."],
  ["One week in San Francisco", "April 19–23. Investors, demo night, Stanford and a pool party."],
];

function Screen({ i }: { i: number }) {
  if (i === 0) return (<><h4>Spring 2027 application</h4>{["Startup name", "What are you building?", "Team size"].map((f) => <label key={f}><small>{f}</small><i /></label>)}<button>Send</button></>);
  if (i === 1) return (<><h4>20-minute interview</h4><p>Pick a time that works.</p>{["Mon 10:00", "Tue 15:30", "Thu 09:00"].map((t, k) => <div key={t} className={`chip${k === 1 ? " on" : ""}`}>{t}</div>)}<button>Confirm</button></>);
  if (i === 2) return (<div className="center"><div className="tick">✓</div><h4>You&apos;re in.</h4><p>Welcome to the Spring 2027 cohort.</p></div>);
  if (i === 3) return (<><h4>Online · Apr 5–16</h4>{["Pitch panels", "Fundraising law", "Product workshops", "Communication Lab"].map((t) => <div key={t} className="row">{t}<span>→</span></div>)}</>);
  return (<><h4>San Francisco · Apr 19–23</h4>{["Investor feedback", "Demo night", "Stanford day", "Pool party"].map((t) => <div key={t} className="row">{t}<span>→</span></div>)}</>);
}

/** Jeton-style numbered stepper with a phone showing each step. */
export default function Stepper() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % STEPS.length), 3400);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <section id="apply" className="stepper" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="step-left">
        <h2 className="h2 white" data-reveal>Apply in five steps.</h2>
        <div className="step-text" key={i}>
          <h3>{STEPS[i][0]}</h3>
          <p>{STEPS[i][1]}</p>
        </div>
        <ol className="pills">
          {STEPS.map(([t], k) => (
            <li key={t}><button className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={t}><b>{String(k + 1).padStart(2, "0")}</b>{k === i && <span>{t.split(" ")[0]}</span>}</button></li>
          ))}
        </ol>
        <a className="btn white" href={APPLY}>Start your application</a>
      </div>
      <div className="phone" aria-hidden>
        <div className="phone-in">
          <div className="phone-status"><span>9:41</span><span>●●●</span></div>
          <div className="phone-screen" key={i}><Screen i={i} /></div>
        </div>
      </div>
    </section>
  );
}
