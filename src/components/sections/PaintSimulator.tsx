import React, { useState, useRef, useEffect, useCallback } from 'react';
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

const FLOR_PARTS = [
  { id: 'Pétalo Superior', label: 'Pétalo Superior', icon: '🌸' },
  { id: 'Pétalo Frontal', label: 'Pétalo Frontal', icon: '🌸' },
  { id: 'Pétalo Izquierdo', label: 'Pétalo Izquierdo', icon: '🌸' },
  { id: 'Pétalo Derecho', label: 'Pétalo Derecho', icon: '🌸' },
  { id: 'Pétalo Inferior', label: 'Pétalo Inferior', icon: '🌸' },
  { id: 'Pistilo y Polen', label: 'Pistilo y Polen', icon: '✨' },
  { id: 'Base y Cáliz', label: 'Base y Cáliz', icon: '🍃' },
];

const INITIAL_COLORS: Record<string, string> = {
  'Pétalo Superior': '#ff3640',
  'Pétalo Frontal': '#ff3640',
  'Pétalo Izquierdo': '#ff8500',
  'Pétalo Derecho': '#ff8500',
  'Pétalo Inferior': '#ffbe08',
  'Pistilo y Polen': '#ffbe08',
  'Base y Cáliz': '#00827f',
};

function hexToRgba(hex: string): [number, number, number, number] {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
    1.0,
  ];
}

export const PaintSimulator: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(CARIBBEAN_PALETTE[1].color); // Naranja Corraleja
  const [partColors, setPartColors] = useState<Record<string, string>>(INITIAL_COLORS);
  const [lastPainted, setLastPainted] = useState<string | null>('Pétalo Frontal');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const modelViewerRef = useRef<HTMLElement | null>(null);
  const pointerDownRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Apply colors to model-viewer materials
  const applyColorsToModel = useCallback((colors: Record<string, string>) => {
    const viewer = modelViewerRef.current as any;
    if (!viewer || !viewer.model || !viewer.model.materials) return;

    viewer.model.materials.forEach((mat: any) => {
      const colorHex = colors[mat.name];
      if (colorHex && mat.pbrMetallicRoughness) {
        const rgba = hexToRgba(colorHex);
        if (typeof mat.pbrMetallicRoughness.setBaseColorFactor === 'function') {
          mat.pbrMetallicRoughness.setBaseColorFactor(rgba);
        } else {
          mat.pbrMetallicRoughness.baseColorFactor = rgba;
        }
      }
    });
  }, []);

  // Update specific material color
  const paintPartByName = useCallback((partName: string, colorHex: string) => {
    const viewer = modelViewerRef.current as any;
    if (viewer && viewer.model && viewer.model.materials) {
      const mat = viewer.model.materials.find((m: any) => m.name === partName);
      if (mat && mat.pbrMetallicRoughness) {
        const rgba = hexToRgba(colorHex);
        if (typeof mat.pbrMetallicRoughness.setBaseColorFactor === 'function') {
          mat.pbrMetallicRoughness.setBaseColorFactor(rgba);
        } else {
          mat.pbrMetallicRoughness.baseColorFactor = rgba;
        }
      }
    }

    setPartColors(prev => ({ ...prev, [partName]: colorHex }));
    setLastPainted(partName);
  }, []);

  // Model-viewer event listeners
  useEffect(() => {
    const viewer = modelViewerRef.current as any;
    if (!viewer) return;

    const handleProgress = (event: any) => {
      if (event.detail && typeof event.detail.totalProgress === 'number') {
        setLoadingProgress(Math.round(event.detail.totalProgress * 100));
      }
    };

    const handleLoad = () => {
      setIsLoaded(true);
      setLoadingProgress(100);
      // Initialize with our starter Caribbean colors
      setTimeout(() => {
        applyColorsToModel(partColors);
      }, 50);
    };

    viewer.addEventListener('progress', handleProgress);
    viewer.addEventListener('load', handleLoad);

    return () => {
      viewer.removeEventListener('progress', handleProgress);
      viewer.removeEventListener('load', handleLoad);
    };
  }, [applyColorsToModel, partColors]);

  // Click on 3D Canvas
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setHasInteracted(true);
    if (!pointerDownRef.current) return;
    const dx = Math.abs(e.clientX - pointerDownRef.current.x);
    const dy = Math.abs(e.clientY - pointerDownRef.current.y);
    const dt = Date.now() - pointerDownRef.current.time;
    pointerDownRef.current = null;

    // Detect click vs drag: only trigger paint if click was quick (< 350ms) and without drag (< 6px)
    if (dx < 6 && dy < 6 && dt < 350) {
      const viewer = modelViewerRef.current as any;
      if (viewer && typeof viewer.materialFromPoint === 'function') {
        const mat = viewer.materialFromPoint(e.clientX, e.clientY);
        if (mat) {
          const partName = mat.name;
          if (partName && FLOR_PARTS.some(p => p.id === partName)) {
            paintPartByName(partName, selectedColor);
          } else if (viewer.model && viewer.model.materials) {
            const idx = viewer.model.materials.indexOf(mat);
            if (idx >= 0 && idx < FLOR_PARTS.length) {
              paintPartByName(FLOR_PARTS[idx].id, selectedColor);
            }
          }
        }
      }
    }
  };

  // Quick Action: Randomize
  const handleRandomize = () => {
    const getRandomColor = () =>
      CARIBBEAN_PALETTE[Math.floor(Math.random() * (CARIBBEAN_PALETTE.length - 1))].color;

    const newColors: Record<string, string> = {};
    FLOR_PARTS.forEach(part => {
      newColors[part.id] = getRandomColor();
    });

    setPartColors(newColors);
    applyColorsToModel(newColors);
    setLastPainted('¡Combinación aleatoria aplicada!');
  };

  // Quick Action: Reset to unpainted white plaster
  const handleReset = () => {
    const white = '#effbff';
    const newColors: Record<string, string> = {};
    FLOR_PARTS.forEach(part => {
      newColors[part.id] = white;
    });

    setPartColors(newColors);
    applyColorsToModel(newColors);
    setLastPainted('Lienzo en yeso cerámico blanco');
  };

  const handleResetCamera = () => {
    const viewer = modelViewerRef.current as any;
    if (viewer) {
      if (typeof viewer.resetTurntableRotation === 'function') {
        viewer.resetTurntableRotation();
      }
      viewer.cameraOrbit = '0deg 75deg 105%';
    }
  };

  const florProduct = PRODUCTS[1]; // La Flor del Bonche

  return (
    <section id="simulador" className="w-full py-space-xl bg-surface-container-low relative overflow-hidden border-y-2 border-[#001f25]/10">
      {/* Decorative background pattern from Recurso 1 */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/recurso-1.svg')` }}
      />

      <div className="max-w-[1280px] mx-auto px-margin relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-4 py-1 rounded-full shadow-[2px_2px_0px_#ffb783] border border-secondary/30 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-sm">view_in_ar</span>
            <span>Simulador 3D Interactivo en Tiempo Real</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            ¡Pinta en 3D antes de recibirlo en casa!
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant mt-2">
            Gira <strong>La Flor del Bonche</strong> en 360°, elige un color de tu paleta caribeña y toca directamente los pétalos para ver tu figura cobrar vida con iluminación real.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-[32px_16px_36px_18px] p-6 md:p-10 border-4 border-[#001f25] shadow-[7px_7px_0px_#c1e8ff] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ======================================================== */}
          {/*                 3D INTERACTIVE CANVAS                    */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center w-full">
            <div
              className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#f0f9fc] to-[#e4f3f8] rounded-3xl border-3 border-[#001f25] flex items-center justify-center shadow-inner overflow-hidden select-none"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              {/* Top Banner inside canvas */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <span className="text-[11px] font-bold text-on-surface bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#001f25]/20 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>🌺 Modelo 3D: La Flor del Bonche</span>
                </span>

                {lastPainted && (
                  <span className="text-[11px] font-bold text-white bg-[#001f25] px-3 py-1 rounded-full shadow-[2px_2px_0px_#ffbe08] animate-fadeIn">
                    Pintado: {lastPainted}
                  </span>
                )}
              </div>

              {/* Google Model Viewer Web Component */}
              <model-viewer
                ref={modelViewerRef as any}
                src="/flor-del-bonche-3d.glb?v=materials7"
                alt="Modelo 3D de La Flor del Bonche"
                poster="/flor-del-bonche-frontal.jpg"
                loading="eager"
                reveal="auto"
                camera-controls
                auto-rotate={isAutoRotating ? '' : undefined}
                rotation-per-second="20deg"
                touch-action="pan-y"
                shadow-intensity="1.3"
                shadow-softness="0.5"
                exposure="1.1"
                camera-orbit="0deg 75deg 105%"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  outline: 'none',
                }}
              />

              {/* Loading progress overlay */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20">
                  <div className="w-12 h-12 rounded-full border-4 border-secondary/30 border-t-secondary animate-spin mb-3 shadow-[2px_2px_0px_#ffbe08]" />
                  <span className="font-headline font-bold text-sm text-on-surface">
                    Cargando modelo 3D de La Flor...
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium mt-1">
                    {loadingProgress}% completado
                  </span>
                </div>
              )}

              {/* Interaction Hint for First-time users */}
              {isLoaded && !hasInteracted && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-surface/90 backdrop-blur-sm border border-[#001f25]/20 text-[#001f25] text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 animate-bounce">
                  <span className="material-symbols-outlined text-sm text-secondary">touch_app</span>
                  <span>Toca un pétalo para pintarlo • Arrastra para girar en 360°</span>
                </div>
              )}

              {/* In-Canvas Floating Camera Controls */}
              {isLoaded && (
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-surface/90 backdrop-blur-sm p-1 rounded-full border border-[#001f25]/30 shadow-[2px_2px_0px_#c1e8ff]">
                  <button
                    type="button"
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    title={isAutoRotating ? 'Pausar rotación' : 'Activar auto-rotación 360°'}
                    className="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center transition-all hover:scale-105"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isAutoRotating ? 'pause' : '360'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetCamera}
                    title="Centrar vista"
                    className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-all hover:scale-105"
                  >
                    <span className="material-symbols-outlined text-base">restart_alt</span>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Part Selector Chips (easy 1-click painting option) */}
            <div className="w-full mt-3">
              <span className="text-[11px] font-bold text-on-surface-variant block mb-1.5 text-center">
                O selecciona directamente la zona que deseas pintar con tu color activo:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {FLOR_PARTS.map((part) => {
                  const partColor = partColors[part.id] || '#effbff';
                  return (
                    <button
                      key={part.id}
                      type="button"
                      onClick={() => paintPartByName(part.id, selectedColor)}
                      className="px-2.5 py-1 rounded-full text-xs font-bold border border-[#001f25]/40 hover:border-secondary bg-surface transition-all flex items-center gap-1.5 shadow-[1px_1px_0px_#ffdcc5] hover:scale-105"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm flex-shrink-0"
                        style={{ backgroundColor: partColor }}
                      />
                      <span className="text-[11px] text-on-surface">{part.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions for simulator */}
            <div className="flex gap-2.5 mt-3.5">
              <button
                type="button"
                onClick={handleRandomize}
                className="px-4 py-2 rounded-full bg-surface-container hover:bg-secondary-fixed text-xs font-bold border border-outline-variant/60 shadow-[2px_2px_0px_#ffdcc5] flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-secondary">casino</span>
                <span>Colores al azar</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-bold border border-outline-variant/60 shadow-[2px_2px_0px_#c1e8ff] flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Lienzo blanco (Yeso)</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/*             PALETTE PICKER & PRODUCT CARD CTA            */}
          {/* ======================================================== */}
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
                    type="button"
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

            {/* Step 2 summary card for La Flor del Bonche */}
            <div className="bg-surface p-5 rounded-2xl border-2 border-outline-variant/60 shadow-[3px_3px_0px_#ffdcc5] flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-tertiary">Kit listo para enviar:</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-secondary-container">
                      ¡Edición Floral!
                    </span>
                  </div>
                  <h4 className="font-headline text-lg font-bold text-on-surface mt-0.5">
                    {florProduct.name}
                  </h4>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {florProduct.subtitle}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-headline text-xl font-bold text-secondary block">
                    ${florProduct.price.toLocaleString('es-CO')}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/70 font-bold uppercase">COP</span>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                Incluye la escultura física de La Flor del Bonche en cerámica con pétalos tridimensionales, 6 témperas acrílicas, 2 pinceles y guía artística floral caribeña.
              </p>

              <button
                type="button"
                onClick={() => addToCart(florProduct, 1, false)}
                className="mt-2 w-full py-2.5 px-4 rounded-full bg-secondary text-white font-headline text-sm font-bold shadow-[3px_3px_0px_#ffbe08] hover:bg-[#e07500] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">brush</span>
                <span>¡Pedir kit Flor del Bonche para pintar!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
