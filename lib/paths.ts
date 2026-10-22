const f = (n: number) => n.toFixed(1);
type P = [number, number];

/** A tangle that loosens into a straight line: a prolate trochoid whose radius decays to zero. */
export function scribble(x0: number, x1: number, y: number, loops = 8, radius = 62) {
  const pts: string[] = [];
  const N = 520;
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const decay = u < 0.62 ? Math.pow(1 - u / 0.62, 1.5) : 0;
    const th = u * loops * Math.PI * 2;
    const b = radius * decay;
    const x = x0 + (x1 - x0) * u - b * Math.sin(th) + b * 0.28 * Math.sin(th * 2.3 + 1);
    const yy = y - b * Math.cos(th) * 0.95 + b * 0.18 * Math.cos(th * 1.7);
    pts.push(`${i ? "L" : "M"}${f(x)} ${f(yy)}`);
  }
  return pts.join("");
}

const quad = (a: P, c: P, b: P, n: number): P[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const u = i / n;
    return [(1 - u) ** 2 * a[0] + 2 * u * (1 - u) * c[0] + u ** 2 * b[0], (1 - u) ** 2 * a[1] + 2 * u * (1 - u) * c[1] + u ** 2 * b[1]] as P;
  });

/** Suspension bridge split into drawable pieces. */
export function bridge(x0: number, x1: number, deckY: number, topY: number) {
  const w = x1 - x0;
  const t1 = x0 + w * 0.27;
  const t2 = x0 + w * 0.73;
  const mid = (t1 + t2) / 2;
  const sag = deckY - (deckY - topY) * 0.2;
  const rise = deckY - topY;
  const left = quad([x0, deckY - 2], [x0 + (t1 - x0) * 0.6, topY + rise * 0.3], [t1, topY], 24);
  const span = quad([t1, topY], [mid, sag * 2 - topY], [t2, topY], 40);
  const right = quad([t2, topY], [t2 + (x1 - t2) * 0.4, topY + rise * 0.3], [x1, deckY - 2], 24);
  const line = (p: P[]) => p.map((q, i) => `${i ? "L" : "M"}${f(q[0])} ${f(q[1])}`).join("");
  const cable = line(left) + line(span).replace("M", "M") + line(right);
  const hangers = [...left, ...span, ...right]
    .filter((_, i) => i % 2 === 0)
    .map((q) => `M${f(q[0])} ${f(q[1])}V${f(deckY)}`)
    .join("");
  const cross = (x: number) => `M${f(x - 7)} ${f(topY + rise * 0.18)}H${f(x + 7)}M${f(x - 7)} ${f(topY + rise * 0.5)}H${f(x + 7)}`;
  return {
    deck: `M${f(x0)} ${f(deckY)}H${f(x1)}`,
    towers: `M${f(t1)} ${f(deckY)}V${f(topY)}M${f(t2)} ${f(deckY)}V${f(topY)}` + cross(t1) + cross(t2),
    cable,
    hangers,
  };
}

/** Vertical line that starts out wobbly and straightens as it goes down. */
export function journey(H: number, cx: number, amp: number) {
  const pts: string[] = [];
  for (let y = 0; y <= H; y += 6) {
    const p = y / H;
    const a = amp * Math.pow(1 - p, 1.5);
    const x = cx + a * Math.sin(y * 0.05) + a * 0.4 * Math.sin(y * 0.13 + 1);
    pts.push(`${y ? "L" : "M"}${f(x)} ${f(y)}`);
  }
  return pts.join("");
}
