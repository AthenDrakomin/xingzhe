import React, { useEffect, useState } from 'react';

interface IntroCardProps {
  onEnter: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ onEnter }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in effect
    const timer = setTimeout(() => setOpacity(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center transition-opacity duration-1000 ease-in-out relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Background ambient effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black -z-10"></div>
      
      <div className="max-w-2xl space-y-8 z-10">
        <p className="serif text-xl md:text-2xl leading-loose text-slate-300 font-light italic opacity-90">
          "我也不是虔诚的基督教徒，我只是找不到妈妈，麻痹自己。<br/>
          而你也只是个假和尚，既心虚，又空虚。<br/>
          我们是同病相怜的孤独者。"
        </p>

        <div className="w-16 h-px bg-slate-600 mx-auto my-8"></div>

        <button
          onClick={onEnter}
          className="group relative px-8 py-3 text-sm tracking-[0.2em] text-slate-400 border border-slate-700 hover:text-white hover:border-slate-500 transition-all duration-500 rounded-sm overflow-hidden"
        >
          <span className="relative z-10">进入静室 (ENTER)</span>
          <div className="absolute inset-0 bg-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>
      </div>

      <div className="absolute bottom-8 text-xs text-slate-600 tracking-widest">
        SOLACE • SANCTUARY
      </div>
    </div>
  );
};

export default IntroCard;