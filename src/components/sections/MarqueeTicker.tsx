import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { icon: 'wb_sunny', text: 'CULTURA SUCREÑA' },
    { icon: 'brush', text: 'ARTE EN FAMILIA' },
    { icon: 'palette', text: 'CERÁMICA' },
    { icon: 'celebration', text: 'ORGULLO CARIBE' },
    { icon: 'location_on', text: 'HECHO EN SINCELEJO' },
    { icon: 'favorite', text: 'DESCONEXIÓN DIGITAL' },
  ];

  return (
    <div className="w-full py-3.5 bg-secondary-container overflow-hidden shadow-[0_4px_0px_#ffbe08]">
      <div className="flex w-max animate-marquee-infinite">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span className="flex items-center gap-2 font-headline text-base sm:text-lg font-bold text-white tracking-wide">
              <span className="material-symbols-outlined text-lg text-white">{item.icon}</span>
              <span>{item.text}</span>
            </span>
            <span className="text-white/80 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};


