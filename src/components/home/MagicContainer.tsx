import React from 'react';

const clsx = (...args: (string | boolean | undefined | null)[]): string => 
  args.filter(Boolean).join(' ');

interface MagicContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MagicContainer: React.FC<MagicContainerProps> = ({ children, className }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative rounded-3xl p-[1px] transition-all duration-300 backdrop-blur-md bg-[#FDF4F5]/40 border border-[#FDF4F5]/20 shadow-xl flex flex-col',
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(186,144,198,0.4), rgba(232,160,191,0.4), rgba(255,255,255,0.4), transparent 80%)`
          : 'rgba(255, 255, 255, 0.2)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex-grow flex flex-col w-full bg-[#FDF4F5]/70 backdrop-blur-lg rounded-3xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MagicContainer;
