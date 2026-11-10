import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

// Caribbean color palette for the simulator
const CARIBBEAN_PALETTE = [
  { name: 'Amarillo Sabanero', color: '#ffbe08' },
  { name: 'Naranja Corraleja', color: '#ff8500' },
  { name: 'Rojo Fandango', color: '#ff3640' },
  { name: 'Turquesa Morrosquillo', color: '#5bcecb' },
  { name: 'Azul Golfo', color: '#006384' },
  { name: 'Verde Palma', color: '#00827f' },
  { name: 'Barro Zenú', color: '#944b00' },
  { name: 'Blanco Yeso Puro', color: '#effbff' },
];

export const PaintSimulator: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(CARIBBEAN_PALETTE[0].color);

  // Sombrero parts colors
  const [hatColors, setHatColors] = useState({
    banda: '#ff8500',
    corona: '#ffbe08',
    alaExterna: '#006384',
    alaInterna: '#5bcecb',
    pintaCentral: '#ff3640',
    ribete: '#944b00'
  });

  const handleColorClick = (part: keyof typeof hatColors) => {
    setHatColors(prev => ({
      ...prev,
      [part]: selectedColor
    }));
  };

  const handleRandomize = () => {
    const getRandomColor = () =>
      CARIBBEAN_PALETTE[Math.floor(Math.random() * CARIBBEAN_PALETTE.length)].color;

    setHatColors({
      banda: getRandomColor(),
      corona: getRandomColor(),
      alaExterna: getRandomColor(),
      alaInterna: getRandomColor(),
      pintaCentral: getRandomColor(),
      ribete: getRandomColor()
    });
  };

  const handleReset = () => {
    setHatColors({
      banda: '#effbff',
      corona: '#effbff',
      alaExterna: '#effbff',
      alaInterna: '#effbff',
      pintaCentral: '#effbff',
      ribete: '#effbff'
    });
  };

  const sombreroProduct = PRODUCTS[0]; // Sombrero Vueltiao

  return (
    <section id="simulador" className="w-full py-space-xl bg-surface-container-low relative overflow-hidden border-y-2 border-[#001f25]/10">
      {/* Decorative background pattern from Recurso 1 */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/recurso-1.svg')` }}
      />

      <div className="max-w-[1280px] mx-auto px-margin relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-4 py-1 rounded-full shadow-[2px_2px_0px_#ffb783] border border-secondary/30 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">palette</span>
            <span>Experiencia Interactiva Virtual</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            ¡Pruébalo antes de recibirlo en casa!
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant mt-2">
            Selecciona un color de tu paleta caribeña y haz clic sobre las diferentes zonas del Sombrero Vueltiao para imaginar cómo lucirá en tu repisa.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-[32px_16px_36px_18px] p-6 md:p-10 border-4 border-[#001f25] shadow-[7px_7px_0px_#c1e8ff] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive SVG Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-surface rounded-3xl border-2 border-[#001f25] p-6 flex items-center justify-center shadow-inner overflow-hidden">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full filter drop-shadow-md cursor-pointer select-none"
              >
                {/* Background Shadow of Hat */}
                <ellipse cx="200" cy="230" rx="170" ry="40" fill="#001f25" opacity="0.1" />

                {/* Ala Externa */}
                <path
                  d="M 40,200 C 40,160 360,160 360,200 C 360,240 40,240 40,200 Z"
                  fill={hatColors.alaExterna}
                  stroke="#001f25"
                  strokeWidth="4"
                  onClick={() => handleColorClick('alaExterna')}
                  className="transition-colors hover:brightness-105"
                />

                {/* Ala Interna / Relieve de vueltas */}
                <path
                  d="M 80,195 C 80,165 320,165 320,195 C 320,225 80,225 80,195 Z"
                  fill={hatColors.alaInterna}
                  stroke="#001f25"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  onClick={() => handleColorClick('alaInterna')}
                  className="transition-colors hover:brightness-105"
                />

                {/* Corona / Copa del sombrero */}
                <path
                  d="M 120,175 C 115,100 130,70 200,65 C 270,70 285,100 280,175 Z"
                  fill={hatColors.corona}
                  stroke="#001f25"
                  strokeWidth="4"
                  onClick={() => handleColorClick('corona')}
                  className="transition-colors hover:brightness-105"
                />

                {/* Banda tradicional sabanera */}
                <path
                  d="M 118,160 C 130,150 270,150 282,160 C 280,175 120,175 118,160 Z"
                  fill={hatColors.banda}
                  stroke="#001f25"
                  strokeWidth="3"
                  onClick={() => handleColorClick('banda')}
                  className="transition-colors hover:brightness-105"
                />

                {/* Pinta central geométrica Zenú */}
                <polygon
                  points="200,85 220,115 200,145 180,115"
                  fill={hatColors.pintaCentral}
                  stroke="#001f25"
                  strokeWidth="3"
                  onClick={() => handleColorClick('pintaCentral')}
                  className="transition-colors hover:brightness-105"
                />

                {/* Ribete superior de copa */}
                <ellipse
                  cx="200"
                  cy="70"
                  rx="40"
                  ry="12"
                  fill={hatColors.ribete}
                  stroke="#001f25"
                  strokeWidth="3"
                  onClick={() => handleColorClick('ribete')}
                  className="transition-colors hover:brightness-105"
                />

                {/* Micro tooltip sticker */}
                <text x="200" y="270" textAnchor="middle" fill="#001f25" fontSize="12" fontWeight="700">
                  ✨ Haz clic en cualquier parte para pintar
                </text>
              </svg>
            </div>

            {/* Quick Actions for simulator */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleRandomize}
                className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-secondary-fixed text-xs font-bold border border-outline-variant/60 shadow-[2px_2px_0px_#ffdcc5] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm text-secondary">casino</span>
                <span>Colores al azar</span>
              </button>
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-bold border border-outline-variant/60 shadow-[2px_2px_0px_#c1e8ff] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Lienzo blanco (Yeso)</span>
              </button>
            </div>
          </div>

          {/* Palette Picker & Cart CTA */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Paso 1: Elige tu témpera
              </span>
              <h3 className="font-headline text-xl font-bold text-on-surface mt-1">
                Tus 8 Colores Caribeños
              </h3>
            </div>

            {/* Palette swatch grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {CARIBBEAN_PALETTE.map((swatch) => {
                const isSelected = selectedColor === swatch.color;
                return (
                  <button
                    key={swatch.color}
                    onClick={() => setSelectedColor(swatch.color)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-[#ff8500] bg-secondary-fixed/50 scale-105 shadow-[3px_3px_0px_#ffbe08]'
                        : 'border-outline-variant/40 bg-surface hover:border-[#ff8500]'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full border border-black/20 shadow-[1px_1px_0px_#ffdcc5]"
                      style={{ backgroundColor: swatch.color }}
                    />
                    <span className="text-[10px] font-bold text-on-surface text-center leading-tight truncate w-full">
                      {swatch.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step 2 summary card */}
            <div className="bg-surface p-4 rounded-2xl border-2 border-outline-variant/60 shadow-[3px_3px_0px_#ffdcc5] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-tertiary">Kit listo para enviar:</span>
                  <h4 className="font-headline text-base font-bold text-on-surface">
                    Sombrero Vueltiao Zenú
                  </h4>
                </div>
                <span className="font-headline text-lg font-bold text-secondary">
                  $48.000 COP
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Incluye la figura física en yeso cerámico con los 6 colores primarios y secundarios, pinceles y guía didáctica.
              </p>
              <button
                onClick={() => addToCart(sombreroProduct, 1, false)}
                className="mt-2 w-full py-2.5 px-4 rounded-full bg-secondary-container text-white font-headline text-sm font-bold shadow-[3px_3px_0px_#ffbe08] hover:bg-secondary active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">brush</span>
                <span>¡Pedir este kit para pintar en casa!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

