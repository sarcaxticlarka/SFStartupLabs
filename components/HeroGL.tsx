"use client";
import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const vert = /* glsl */ `
attribute vec2 position; attribute vec2 uv; varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`;

// Duotone (oxblood -> terracotta -> apricot) with a cursor-driven liquid push and RGB split.
const frag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex; uniform vec2 uRes; uniform vec2 uImg; uniform vec2 uMouse; uniform vec2 uVel;
uniform float uTime; uniform float uZoom; uniform float uIntro;
vec2 cover(vec2 uv) {
  float ra = uRes.x / uRes.y; float ia = uImg.x / uImg.y;
  vec2 s = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}
void main() {
  vec2 uv = (vUv - 0.5) / uZoom + 0.5;
  float asp = uRes.x / uRes.y;
  float d = distance(vec2(uv.x * asp, uv.y), vec2(uMouse.x * asp, uMouse.y));
  float f = smoothstep(0.42, 0.0, d);
  vec2 disp = uVel * f * 0.8;
  float wob = sin(uv.y * 16.0 + uTime * 1.1) * 0.0016 + sin(uv.x * 11.0 - uTime * 0.8) * 0.0012;
  vec2 b = uv - disp + vec2(wob, 0.0);
  float r = texture2D(uTex, cover(b + disp * 0.35)).r;
  float g = texture2D(uTex, cover(b)).g;
  float bl = texture2D(uTex, cover(b - disp * 0.35)).b;
  vec3 col = vec3(r, g, bl);
  float l = pow(dot(col, vec3(0.299, 0.587, 0.114)), 0.9) * 1.1;
  vec3 dark = vec3(0.13, 0.045, 0.03); vec3 mid = vec3(0.74, 0.25, 0.14); vec3 hi = vec3(1.0, 0.70, 0.52);
  vec3 duo = l < 0.5 ? mix(dark, mid, l * 2.0) : mix(mid, hi, (l - 0.5) * 2.0);
  duo = mix(duo, col * vec3(1.05, 0.86, 0.78), 0.22 * f);
  gl_FragColor = vec4(duo * uIntro, 1.0);
}`;

/** WebGL hero photo. Falls back to a plain tinted <img> when WebGL or motion is unavailable. */
export default function HeroGL({ src, fallback }: { src: string; fallback: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "fail">("loading");

  useEffect(() => {
    const holder = wrap.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setState("fail"); return; }
    // a fresh canvas per mount, so React StrictMode's double effect never reuses a lost context
    const el = document.createElement("canvas");
    holder.appendChild(el);
    let renderer: Renderer;
    try { renderer = new Renderer({ canvas: el, alpha: false, antialias: false, dpr: Math.min(devicePixelRatio, 2) }); } catch { el.remove(); setState("fail"); return; }
    const gl = renderer.gl;
    const tex = new Texture(gl);
    const program = new Program(gl, {
      vertex: vert, fragment: frag,
      uniforms: {
        uTex: { value: tex }, uRes: { value: [1, 1] }, uImg: { value: [1, 1] }, uMouse: { value: [0.5, 0.5] }, uVel: { value: [0, 0] },
        uTime: { value: 0 }, uZoom: { value: 1 }, uIntro: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const u = program.uniforms;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { tex.image = img; u.uImg.value = [img.naturalWidth, img.naturalHeight]; setState("ready"); };
    img.onerror = () => setState("fail");
    img.src = src;

    const parent = el.parentElement!;
    const resize = () => { const r = parent.getBoundingClientRect(); renderer.setSize(r.width, r.height); u.uRes.value = [r.width, r.height]; };
    const ro = new ResizeObserver(resize); ro.observe(parent); resize();

    const target = { x: 0.5, y: 0.5 }; const cur = { x: 0.5, y: 0.5 }; const vel = { x: 0, y: 0 };
    const move = (e: MouseEvent) => { const r = parent.getBoundingClientRect(); target.x = (e.clientX - r.left) / r.width; target.y = 1 - (e.clientY - r.top) / r.height; };
    addEventListener("mousemove", move);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(parent);

    const tick = (t: number) => {
      if (!visible) return;
      const px = cur.x, py = cur.y;
      cur.x += (target.x - cur.x) * 0.12; cur.y += (target.y - cur.y) * 0.12;
      vel.x += ((cur.x - px) * 6 - vel.x) * 0.2; vel.y += ((cur.y - py) * 6 - vel.y) * 0.2;
      u.uMouse.value = [cur.x, cur.y]; u.uVel.value = [vel.x, vel.y]; u.uTime.value = t;
      renderer.render({ scene: mesh });
    };
    gsap.ticker.add(tick);

    const a = gsap.fromTo(u.uIntro, { value: 0 }, { value: 1, duration: 1.6, delay: 2.1, ease: "power2.out" });
    const z = gsap.to(u.uZoom, { value: 1.32, ease: "none", scrollTrigger: { trigger: ".hero", start: "top 10px", end: "+=120%", scrub: true } });

    return () => {
      gsap.ticker.remove(tick); a.kill(); z.scrollTrigger?.kill(); z.kill();
      removeEventListener("mousemove", move); ro.disconnect(); io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      el.remove();
    };
  }, [src]);

  return (
    <>
      <div ref={wrap} className={`hero-gl${state === "ready" ? " on" : ""}`} aria-hidden />
      {state !== "ready" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero-fallback" src={fallback} alt="" />
      )}
    </>
  );
}
