import React, { useState, useEffect } from 'react';

const greetings = [
  { word: "Welcome", lang: "English" },
  { word: "नमस्ते", lang: "Hindi" },
  { word: "স্বাগতম", lang: "Bengali" },
  { word: "Bienvenido", lang: "Spanish" },
  { word: "Bienvenue", lang: "French" },
  { word: "ようこそ", lang: "Japanese" },
  { word: "مرحباً", lang: "Arabic" }
];

export default function Loader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState('in');

  useEffect(() => {
    if (index === greetings.length) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 300); // Allow fade out to finish
      return () => clearTimeout(timeout);
    }

    // Cycle timing
    const displayTimeout = setTimeout(() => {
      setFade('out');
      const switchTimeout = setTimeout(() => {
        setIndex(prev => prev + 1);
        setFade('in');
      }, 150); // delay during switch
      
      return () => clearTimeout(switchTimeout);
    }, 350); // display duration per greeting

    return () => clearTimeout(displayTimeout);
  }, [index, onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-[#07040f] z-[9999] flex flex-col items-center justify-center text-white select-none transition-all duration-700 ease-in-out ${
        index === greetings.length ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      <div className="relative flex flex-col items-center gap-6 z-10">
        {/* Subtle loading label */}
        <div className="flex items-center gap-2 opacity-50">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-accent">Portfolio Loading</span>
        </div>

        {/* Word Display with transition */}
        <div className="h-24 flex items-center justify-center overflow-hidden">
          <h1 
            className={`text-5xl sm:text-6xl font-black tracking-tight transition-all duration-300 transform ${
              fade === 'in' 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-4 scale-95'
            }`}
            style={{
              background: 'linear-gradient(135deg, #f5f3ff 0%, #c4b5fd 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {greetings[index === greetings.length ? index - 1 : index]?.word}
          </h1>
        </div>

        {/* Current Language Label */}
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] h-4 opacity-50">
          {greetings[index === greetings.length ? index - 1 : index]?.lang}
        </p>

        {/* Progress Bar indicator */}
        <div className="w-40 h-[2px] bg-white/5 rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-accent transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_#a78bfa]"
            style={{ width: `${Math.min(((index + 1) / greetings.length) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
