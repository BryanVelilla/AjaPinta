import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { icon: 'wb_sunny', text: 'CULTURA SUCREÑA', color: 'text-secondary' },
    { icon: 'brush', text: 'ARTE EN FAMILIA', color: 'text-primary' },
    { icon: 'cottage', text: 'TRADICIÓN DE BAHAREQUE', color: 'text-tertiary' },
    { icon: 'palette', text: 'YESO Y CERÁMICA FINA', color: 'text-secondary' },
    { icon: 'celebration', text: 'ORGULLO CARIBE', color: 'text-primary' },
    { icon: 'location_on', text: 'HECHO EN SINCELEJO', color: 'text-tertiary' },
    { icon: 'favorite', text: 'DESCONEXIÓN DIGITAL', color: 'text-secondary' },
  ];

  return (
    <div className="w-full py-3 bg-surface-container-high overflow-hidden border-y-2 border-[#001f25] shadow-[0_2px_0px_#001f25]">
      <div className="flex w-max animate-marquee-infinite">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span className={`flex items-center gap-2 font-headline text-base sm:text-lg font-bold ${item.color}`}>
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </span>
            <span className="text-tertiary font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

