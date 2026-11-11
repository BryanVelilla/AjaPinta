import React from 'react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenSombrero: () => void;
  onOpenCasita: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenSombrero,
  onOpenCasita,
}) => {
  return (
    <section id="inicio" className="relative w-full overflow-hidden pt-space-xl pb-space-xl bg-surface">
      {/* Caribbean pattern background using user's Recurso 3 with clear, scaled figures */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/recurso-3.svg')`,
          backgroundSize: 'clamp(1200px, 100vw, 1900px)',
          backgroundPosition: 'center 20%',
        }}
      />
      {/* Soft gradient overlay to keep text comfortable and readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-surface/45 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-margin relative z-10 pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          {/* Main Copy Column */}
          <div className="lg:col-span-7 flex flex-col gap-space-md text-left">
            {/* Hero Title */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-on-surface font-extrabold leading-[1.08] tracking-tight">
              ¡Pinta, crea y dale color a{' '}
              <span className="relative inline-block text-secondary-container">
                nuestras raíces!
                <svg
                  className="absolute left-0 -bottom-2.5 w-full h-3.5 text-secondary pointer-events-none overflow-visible"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 12 Q 25 3, 50 12 T 100 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    pathLength="100"
                    className="animate-draw-line"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Descubre la magia de nuestras tradiciones sucreñas a través de figuras artesanales listas para cobrar vida con tus pinceles y tu propia imaginación. Un pedacito del Caribe en tu hogar.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-space-sm bg-secondary-container text-white font-headline text-base sm:text-lg font-bold px-space-xl py-space-md rounded-full shadow-[4px_4px_0px_#ffbe08] border-2 border-[#ff8500] hover:bg-secondary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#ffbe08] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined">brush</span>
                <span>Explorar el catálogo</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-md max-w-lg">
              <div className="flex flex-col bg-secondary-fixed p-space-sm rounded-[16px_8px_18px_10px] shadow-[3px_3px_0px_#ffb783] border-2 border-secondary/30">
                <span className="font-headline text-lg sm:text-xl font-bold text-black leading-none">
                  6 Colores
                </span>
                <span className="text-xs text-black/80 font-medium mt-1">
                  Témperas vivas
                </span>
              </div>

              <div className="flex flex-col bg-primary-fixed p-space-sm rounded-[8px_16px_10px_18px] shadow-[3px_3px_0px_#73d1ff] border-2 border-primary/30">
                <span className="font-headline text-lg sm:text-xl font-bold text-black leading-none">
                  2 Pinceles
                </span>
                <span className="text-xs text-black/80 font-medium mt-1">
                  Fino y plano pro
                </span>
              </div>

              <div className="flex flex-col bg-tertiary-fixed p-space-sm rounded-[14px_10px_16px_8px] shadow-[3px_3px_0px_#84f5f0] border-2 border-tertiary/30">
                <span className="font-headline text-lg sm:text-xl font-bold text-black leading-none">
                  Guía Sabanera
                </span>
                <span className="text-xs text-black/80 font-medium mt-1">
                  Historia y tips Zenú
                </span>
              </div>
            </div>
          </div>

          {/* Asymmetric Visual Composition with Stickers */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-space-md mt-6 lg:mt-0">
            {/* Glow / Backdrop Accent */}
            <div className="absolute w-72 h-72 rounded-full bg-secondary-fixed opacity-70 blur-2xl -z-10 animate-pulse" />

            {/* Stacked Cards */}
            <div className="relative w-full max-w-md flex flex-col items-center">
              {/* Card 1: La Iguana Sabanera (Interactive click) */}
              <div
                onClick={onOpenSombrero}
                className="cursor-pointer w-11/12 bg-surface-container-lowest p-space-xs rounded-[28px_14px_30px_16px] shadow-[6px_6px_0px_#c1e8ff] border-3 border-[#001f25] transform -rotate-3 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="relative overflow-hidden rounded-[24px_10px_26px_12px] bg-surface-container-highest">
                  <img
                    alt="Figura artesanal de La Iguana Sabanera lista para pintar"
                    className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    src="/iguana-hero.jpg"
                  />
                  {/* Sticker Top Photo */}
                  <div className="absolute top-2 left-2 bg-secondary-container text-white px-3 py-1 rounded-full shadow-[2px_2px_0px_#ffbe08] border border-secondary-container flex items-center gap-1 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                    <span>¡Pinturas incluidas!</span>
                  </div>
                </div>
              </div>

              {/* Card 2: La Flor del Bonche (Interactive click) */}
              <div
                onClick={onOpenCasita}
                className="cursor-pointer w-9/12 bg-surface-container-lowest p-space-xs rounded-[16px_28px_14px_26px] shadow-[5px_5px_0px_#84f5f0] border-3 border-[#001f25] -mt-16 ml-20 transform rotate-4 hover:rotate-1 hover:scale-[1.03] transition-all duration-300 z-20 group"
              >
                <div className="relative overflow-hidden rounded-[12px_24px_10px_22px] bg-tertiary-fixed">
                  <img
                    alt="Figura artesanal de La Flor del Bonche lista para pintar"
                    className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    src="/flor-hero.jpg"
                  />
                  {/* Corner Badge */}
                  <div className="absolute bottom-2 right-2 bg-primary text-white px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_#73d1ff] border border-primary flex items-center gap-1 text-[11px] font-bold">
                    <span className="material-symbols-outlined text-xs">favorite</span>
                    <span>Edición Sucre</span>
                  </div>
                </div>
              </div>

              {/* Floating Neo-Brutalist Sticker */}
              <div className="absolute -bottom-4 -left-2 z-30 bg-[#ff3640] text-white font-headline text-sm md:text-base font-bold px-4 py-1.5 rounded-[18px_6px_16px_8px] shadow-[4px_4px_0px_#ff8da1] border-2 border-[#ff3640] transform -rotate-6 animate-float">
                ✨ ¡Listo para pintar!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

