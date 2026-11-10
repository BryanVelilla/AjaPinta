import React from 'react';
import { TESTIMONIALS } from '../../data/products';

interface CultureEssenceProps {
  onStoryClick: () => void;
}

export const CultureEssence: React.FC<CultureEssenceProps> = ({ onStoryClick }) => {
  return (
    <section id="esencia" className="w-full py-space-xl bg-surface relative overflow-hidden">
      {/* Decorative background with subtle pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-repeat"
        style={{ backgroundImage: `url('/recurso-1.svg')`, backgroundSize: '400px' }}
      />

      <div className="max-w-[1280px] mx-auto px-margin relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-space-xs pb-space-xl">
          <span className="inline-flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full shadow-[2px_2px_0px_#001f25] border border-[#001f25] text-xs text-secondary font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">local_florist</span>
            Nuestra Esencia Caribeña
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface">
            Mucho más que una figura, un pedacito de nuestra tierra
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            En cada trazo honramos la alegría de nuestras sabanas, el brillo del sol caribe y el legado artesanal transmitido con paciencia y amor de generación en generación.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Card 1: Sucre Caribbean Charm */}
          <div className="relative bg-surface-container-lowest p-space-lg rounded-[24px_12px_26px_10px] shadow-[4px_4px_0px_#001f25] border-3 border-[#001f25] flex flex-col justify-between gap-space-md transform hover:-translate-y-1.5 transition-transform duration-300">
            <div className="flex flex-col gap-space-sm">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center shadow-[3px_3px_0px_#001f25] border-2 border-[#001f25]">
                <span className="material-symbols-outlined text-secondary text-2xl">landscape</span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
                El encanto del Caribe Sucreño
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Desde las brisas del Golfo de Morrosquillo hasta las colinas de Montes de María y los arroyos de San Jorge. Nuestras figuras capturan la flora, la arquitectura colonial y la fauna que hacen palpitar al departamento de Sucre.
              </p>
            </div>
            <div className="pt-space-xs inline-flex items-center gap-space-xs text-secondary text-xs font-bold">
              <span className="material-symbols-outlined text-base">explore</span>
              <span>Inspiración 100% regional y costera</span>
            </div>
          </div>

          {/* Card 2: Intergenerational Connection */}
          <div className="relative bg-surface-container-high p-space-lg rounded-[12px_24px_10px_26px] shadow-[4px_4px_0px_#001f25] border-3 border-[#001f25] flex flex-col justify-between gap-space-md transform hover:-translate-y-1.5 transition-transform duration-300">
            <div className="flex flex-col gap-space-sm">
              <div className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center shadow-[3px_3px_0px_#001f25] border-2 border-[#001f25]">
                <span className="material-symbols-outlined text-tertiary text-2xl">handshake</span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
                Arte que conecta generaciones
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Moldeado artesanal con mezclas especiales de yeso y cerámica fina que aseguran una porosidad perfecta para que la pintura se adhiera con fuerza y los colores mantengan su fulgor tropical con los años sin descascararse.
              </p>
            </div>
            <div className="pt-space-xs inline-flex items-center gap-space-xs text-tertiary text-xs font-bold">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Moldeado en talleres locales</span>
            </div>
          </div>

          {/* Card 3: Creative Therapy */}
          <div className="relative bg-surface-container-low p-space-lg rounded-[22px_14px_20px_16px] shadow-[4px_4px_0px_#001f25] border-3 border-[#001f25] flex flex-col justify-between gap-space-md transform hover:-translate-y-1.5 transition-transform duration-300">
            <div className="flex flex-col gap-space-sm">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center shadow-[3px_3px_0px_#001f25] border-2 border-[#001f25]">
                <span className="material-symbols-outlined text-primary text-2xl">mood</span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
                Terapia creativa y color
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Un ritual para desconectarse de las pantallas del celular, sentarse alrededor de la mesa familiar, tomarse un jugo de corozo bien helado y dejar que la intuición artística guíe cada pincelada libremente.
              </p>
            </div>
            <div className="pt-space-xs inline-flex items-center gap-space-xs text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-base">favorite</span>
              <span>Bienestar, calma y gozadera pura</span>
            </div>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="mt-space-xl p-space-md md:p-space-lg bg-surface-container-lowest rounded-[20px_10px_22px_12px] shadow-[3px_3px_0px_#001f25] border-2 border-[#001f25] flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-white flex items-center justify-center shadow-[2px_2px_0px_#001f25] border border-[#001f25] flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-base sm:text-lg font-bold text-on-surface">
                Compromiso ajá! pinta con el artesano de Sucre
              </span>
              <span className="text-xs sm:text-sm text-on-surface-variant">
                Cada kit apoya directamente el sustento de familias ceramistas y moldeadores de Sincelejo, Sampués y Corozal.
              </span>
            </div>
          </div>
          <button
            onClick={onStoryClick}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-secondary hover:text-on-secondary-container underline underline-offset-4 whitespace-nowrap"
          >
            <span>Conoce nuestra historia</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        {/* Community Testimonials */}
        <div className="mt-space-xl pt-space-lg border-t-2 border-[#001f25]/10">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
              Historias pintadas en familia
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Lo que dicen quienes ya le pusieron color a su pedacito de Caribe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-surface-container-low p-6 rounded-2xl border-2 border-[#001f25] shadow-[3px_3px_0px_#001f25] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm fill-1">star</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface italic leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#001f25]/10">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#001f25]"
                  />
                  <div>
                    <h5 className="font-headline text-xs font-bold text-on-surface">{t.author}</h5>
                    <span className="text-[11px] text-tertiary block font-medium">{t.role} • {t.city}</span>
                    <span className="text-[10px] text-secondary font-bold">Compró: {t.figurePurchased}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

