import { gsap } from "gsap";
import { useEffect, useRef } from "react";

// Decorative canvas of walking dots in the site's palette
export function CrowdCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#E8A0BF", "#C0DBEA", "#C0DBEA", "#BA90C6"];
    type Peep = {
      x: number;
      y: number;
      r: number;
      color: string;
      dir: 1 | -1;
      tween: gsap.core.Timeline;
      bob: number;
    };
    const peeps: Peep[] = [];
    const stage = { width: 0, height: 0 };

    const resetPeep = (p: Peep) => {
      p.dir = Math.random() > 0.5 ? 1 : -1;
      p.color = colors[(Math.random() * colors.length) | 0];
      p.r = 8 + Math.random() * 16;
      const laneY = stage.height - p.r * 2 - Math.random() * (stage.height * 0.55);
      p.y = laneY;
      p.bob = laneY;
      const startX = p.dir === 1 ? -p.r * 2 : stage.width + p.r * 2;
      const endX = p.dir === 1 ? stage.width + p.r * 2 : -p.r * 2;
      p.x = startX;
      if (p.tween) p.tween.kill();
      const dur = 12 + Math.random() * 14;
      const tl = gsap.timeline();
      tl.timeScale(0.6 + Math.random());
      tl.to(p, { duration: dur, x: endX, ease: "none", onComplete: () => resetPeep(p) }, 0);
      tl.to(p, { duration: 0.28, repeat: Math.floor(dur / 0.28), yoyo: true, y: laneY - 6 }, 0);
      p.tween = tl;
    };

    const createPeeps = (n: number) => {
      for (let i = 0; i < n; i++) {
        const p: Peep = {
          x: 0,
          y: 0,
          r: 12,
          color: colors[0],
          dir: 1,
          tween: gsap.timeline(),
          bob: 0,
        };
        peeps.push(p);
        resetPeep(p);
        p.tween.progress(Math.random());
      }
    };

    const render = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(devicePixelRatio, devicePixelRatio);
        peeps
          .slice()
          .sort((a, b) => a.y - b.y)
          .forEach((p) => {
            const safeR = Math.max(1, p.r);
            // body
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y + safeR * 1.6, safeR, 0, Math.PI * 2);
            ctx.fill();
            // head
            ctx.beginPath();
            ctx.arc(p.x, p.y, safeR * 0.7, 0, Math.PI * 2);
            ctx.fill();
            // shadow
            ctx.fillStyle = "rgba(142,88,214,0.15)";
            ctx.beginPath();
            const rx = Math.max(0.1, safeR * 0.9);
            const ry = Math.max(0.1, safeR * 0.22);
            ctx.ellipse(p.x, p.y + safeR * 2.7, rx, ry, 0, 0, Math.PI * 2);
            ctx.fill();
          });
        ctx.restore();
      } catch (err) {
        console.warn("CrowdCanvas render error:", err);
      }
    };

    const resize = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      peeps.forEach(resetPeep);
    };

    createPeeps(28);
    resize();
    gsap.ticker.add(render);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(render);
      peeps.forEach((p) => p.tween.kill());
    };
  }, []);

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-center px-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#BA90C6]/80 font-semibold">
          Together on the path
        </span>
        <h3 className="mt-3 text-3xl md:text-4xl font-bold text-[#BA90C6]">
          A community, always in motion
        </h3>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </section>
  );
}
