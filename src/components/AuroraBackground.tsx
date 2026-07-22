import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import "./AuroraBackground.css";

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
  animationSpeed?: number;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  animationSpeed = 60,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-[#FDF4F5] text-[#BA90C6] transition-bg",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn("aurora-layer", showRadialGradient && "aurora-mask")}
          style={{ ["--aurora-duration" as string]: `${animationSpeed}s` }}
        />
      </div>
      {children}
    </div>
  );
};

export default AuroraBackground;
