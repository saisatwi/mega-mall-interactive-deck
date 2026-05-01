'use client';

interface ToggleProps {
  isNight: boolean;
  setNight: (val: boolean) => void;
}

export default function DayNightToggle({ isNight, setNight }: ToggleProps) {
  return (
    <div className="flex flex-col items-end gap-3">
      <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase">Atmosphere</span>
      <div className="flex gap-6">
        <button 
          onClick={() => setNight(false)}
          className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-700 ${!isNight ? 'text-gold' : 'text-white/20'}`}
        >
          Dusk
        </button>
        <div className="w-[1px] h-3 bg-white/10 self-center" />
        <button 
          onClick={() => setNight(true)}
          className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-700 ${isNight ? 'text-gold' : 'text-white/20'}`}
        >
          Twilight
        </button>
      </div>
    </div>
  );
}