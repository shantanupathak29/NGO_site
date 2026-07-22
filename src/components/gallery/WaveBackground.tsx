import React, { useEffect, useRef } from "react";

export type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface WaveBackgroundProps {
  backdropBlurAmount?: BlurSize;
  className?: string;
  colors?: string[];
  children?: React.ReactNode;
}

const blurMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  backdropBlurAmount = "sm",
  className = "",
  colors = ["#E8A0BF", "#BA90C6", "#C0DBEA", "#FDF4F5"],
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let step = 0;

    const waveLines = [
      { color: colors[0] || "#E8A0BF", speed: 0.008, amplitude: 45, wavelength: 0.006, offset: 0.2 },
      { color: colors[1] || "#BA90C6", speed: 0.005, amplitude: 60, wavelength: 0.004, offset: 0.5 },
      { color: colors[2] || "#C0DBEA", speed: 0.009, amplitude: 50, wavelength: 0.005, offset: 0.8 },
      { color: colors[0] || "#E8A0BF", speed: 0.004, amplitude: 35, wavelength: 0.008, offset: 1.1 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft background fill
      ctx.fillStyle = colors[3] || "#FDF4F5";
      ctx.fillRect(0, 0, width, height);

      step += 1;

      waveLines.forEach((wave) => {
        ctx.beginPath();
        ctx.fillStyle = wave.color + "55"; // 33% opacity for soft layered waves

        const baseHeight = height * wave.offset;

        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        for (let x = 0; x <= width; x += 10) {
          const y =
            baseHeight +
            Math.sin(x * wave.wavelength + step * wave.speed) * wave.amplitude +
            Math.cos(x * 0.002 + step * 0.003) * 15;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors]);

  const blurClass = blurMap[backdropBlurAmount] || "backdrop-blur-sm";

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />
      <div className={`relative z-10 w-full h-full ${blurClass}`}>
        {children}
      </div>
    </div>
  );
};

export default WaveBackground;
