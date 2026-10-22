"use client";
import { useEffect, useState } from "react";

/** Live San Francisco time. Rendered after mount to avoid a hydration mismatch. */
export function SFClock({ className = "" }: { className?: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className={`mono clock ${className}`}>San Francisco {t || "--:--:--"} PT · 37.77°N 122.42°W</span>;
}
