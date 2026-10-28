import React from 'react';
import { Activity, Zap, Compass, ShieldCheck } from 'lucide-react';

interface TachometerGaugeProps {
  value: number; // 0 to 100 or higher
  max?: number;
  label: string;
  sublabel?: string;
  unit?: string;
  variant?: 'crimson' | 'amber' | 'cyan';
}

export const TachometerGauge: React.FC<TachometerGaugeProps> = ({
  value,
  max = 100,
  label,
  sublabel = 'RPM x 1000',
  unit = '%',
  variant = 'crimson'
}) => {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  // Tachometer sweep from -140 deg to +140 deg (280 deg total sweep)
  const angle = -140 + percentage * 280;

  const colorClass = variant === 'crimson' 
    ? 'text-rose-500 stroke-rose-600' 
    : variant === 'amber' 
    ? 'text-amber-400 stroke-amber-500' 
    : 'text-cyan-400 stroke-cyan-500';

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
      {/* Background glow radial */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl ${variant === 'crimson' ? 'bg-rose-600' : 'bg-amber-500'}`} />

      {/* Sweeping Gauge Dial */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* SVG Circular Arc Tracks */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Base track */}
          <circle
            cx="80"
            cy="80"
            r="65"
            stroke="currentColor"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray="408"
            strokeDashoffset="100"
            className="text-neutral-800"
            strokeLinecap="round"
          />
          {/* Active sweeping needle arc */}
          <circle
            cx="80"
            cy="80"
            r="65"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="408"
            strokeDashoffset={408 - (percentage * 308)}
            className={`${colorClass} transition-all duration-300`}
            strokeLinecap="round"
          />
        </svg>

        {/* Tachometer needle */}
        <div 
          className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="w-1 h-20 bg-gradient-to-t from-transparent via-rose-500 to-rose-400 rounded-full shadow-[0_0_12px_#f43f5e] -translate-y-8" />
        </div>

        {/* Center dial face */}
        <div className="absolute w-24 h-24 rounded-full bg-[#0d0d12] border border-white/15 flex flex-col items-center justify-center shadow-inner z-10">
          <span className="text-2xl font-black tracking-tight text-white font-mono">
            {Math.round(value)}
            <span className="text-xs text-rose-400 font-sans ml-0.5">{unit}</span>
          </span>
          <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
            {sublabel}
          </span>
        </div>
      </div>

      {/* Gauge Label */}
      <div className="text-center mt-2 z-10">
        <h4 className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">{label}</h4>
      </div>
    </div>
  );
};
