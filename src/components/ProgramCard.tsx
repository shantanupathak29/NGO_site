import React from 'react';

export interface ProgramCardProps {
  id?: string | number;
  imageUrl?: string;
  title: string;
  subtitle: string;
  highlight: string;
  tag?: string;
  icon?: string;
  subs?: string[];
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, subtitle, highlight, tag, icon = "category", subs }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-[#FDF4F5]/90 backdrop-blur-xl border border-[#BA90C6] shadow-lg shadow-[#BA90C6]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#E8A0BF]/40 hover:-translate-y-1 hover:border-[#E8A0BF] w-full h-full flex flex-col justify-between p-5 sm:p-6">
      {/* Background glow radial blur overlay on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#BA90C6]/20 via-[#E8A0BF]/30 to-[#C0DBEA]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      <div className="space-y-3 relative z-10">
        {/* Header with Icon */}
        <div className="flex justify-between items-center">
          <div className="w-10 h-10 rounded-xl bg-[#BA90C6]/20 border border-[#BA90C6]/50 flex items-center justify-center text-[#BA90C6] group-hover:bg-[#E8A0BF]/40 group-hover:text-[#2A1B3D] group-hover:scale-105 shadow-sm transition-all duration-300">
            <span className="material-symbols-outlined text-xl">{icon}</span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#8E5B9A]">{title}</h3>
          <p className="text-xs sm:text-sm text-[#2A1B3D]/85 leading-relaxed font-medium">{subtitle}</p>
        </div>

        {/* Subcomponents list if available */}
        {subs && subs.length > 0 && (
          <div className="pt-2.5 border-t border-[#BA90C6]/30">
            <h4 className="text-xs font-bold text-[#8E5B9A] uppercase tracking-wider mb-2">Key Initiatives</h4>
            <div className="flex flex-wrap gap-1.5">
              {subs.map((sub, i) => (
                <span key={i} className="text-xs font-bold text-[#2A1B3D] bg-[#FDF4F5] px-2.5 py-1 rounded-md border border-[#BA90C6]/40 shadow-sm group-hover:border-[#E8A0BF]/60 transition-colors">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramCard;
