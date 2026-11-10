import React from 'react';

interface FinalCTAProps {
  onExploreClick: () => void;
  onCorporateClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreClick, onCorporateClick }) => {
  return (
    <section className="w-full py-space-xl bg-surface relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-margin relative z-10">
        <div className="relative bg-secondary-fixed rounded-[32px_16px_36px_18px] p-8 md:p-14 shadow-[6px_6px_0px_#ffbe08] border-4 border-[#001f25] overflow-hidden">
          {/* Subtle Caribbean pattern from user's assets */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-repeat"
            style={{
              backgroundImage: `url('/recurso-3.svg')`,
              backgroundSize: '280px',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-xl">
            {/* Copy */}
            <div className="flex flex-col gap-space-sm max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-[2px_2px_0px_#ffbe08] border border-outline-variant/50 w-fit mx-auto lg:mx-0">
                <span className="material-symbols-outlined text-secondary text-sm">celebration</span>
                <span className="text-xs font-bold text-on-surface uppercase tracking-wider font-headline">
                  ¡Manos a la obra, mi gente!
                </span>
              </div>

              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-secondary-fixed leading-tight">
                ¡Ahora te toca a ti ponerle color a nuestra historia!
              </h2>

              <p className="text-base sm:text-lg text-on-secondary-fixed-variant leading-relaxed">
                Elige tu figura artesanal favorita, recibe la caja en la puerta de tu casa con pinturas, pinceles y guía didáctica, y déjate llevar por el sabor y la magia caribeña.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-space-md flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm bg-secondary-container text-white font-headline text-base sm:text-lg font-bold px-space-xl py-space-md rounded-full shadow-[4px_4px_0px_#ffbe08] border-2 border-[#ff8500] hover:bg-secondary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#ffbe08] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                <span>Explorar figuras</span>
              </button>

              <button
                onClick={onCorporateClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm bg-surface-container-lowest text-on-surface font-headline text-base sm:text-lg font-bold px-space-lg py-space-md rounded-full shadow-[4px_4px_0px_#c1e8ff] border-2 border-outline-variant/60 hover:bg-surface-container hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#c1e8ff] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined">forum</span>
                <span>Kits corporativos y eventos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

