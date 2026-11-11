import React, { useEffect, useRef, useState } from 'react';

interface ModelViewer3DProps {
  src: string;
  alt: string;
  poster?: string;
  className?: string;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  src,
  alt,
  poster,
  className = '',
}) => {
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    setLoadingProgress(0);

    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleProgress = (event: Event) => {
      const customEvent = event as CustomEvent<{ totalProgress: number }>;
      if (customEvent.detail && typeof customEvent.detail.totalProgress === 'number') {
        setLoadingProgress(Math.round(customEvent.detail.totalProgress * 100));
      }
    };

    const handleLoad = () => {
      setIsLoaded(true);
      setLoadingProgress(100);
    };

    viewer.addEventListener('progress', handleProgress);
    viewer.addEventListener('load', handleLoad);

    return () => {
      viewer.removeEventListener('progress', handleProgress);
      viewer.removeEventListener('load', handleLoad);
    };
  }, [src]);

  const handleResetCamera = () => {
    const viewer = modelViewerRef.current as any;
    if (viewer && typeof viewer.resetTurntableRotation === 'function') {
      viewer.resetTurntableRotation();
    }
    if (viewer && viewer.cameraOrbit) {
      viewer.cameraOrbit = '0deg 75deg 105%';
    }
  };

  const handleToggleAutoRotate = () => {
    setIsAutoRotating((prev) => !prev);
  };

  return (
    <div
      className={`relative w-full h-72 md:h-80 bg-[#f7fcfe] flex items-center justify-center overflow-hidden select-none ${className}`}
      onMouseDown={() => setHasInteracted(true)}
      onTouchStart={() => setHasInteracted(true)}
    >
      {/* 3D Model Viewer Web Component */}
      <model-viewer
        ref={modelViewerRef as any}
        src={src}
        alt={alt}
        poster={poster}
        loading="eager"
        reveal="auto"
        camera-controls
        auto-rotate={isAutoRotating ? '' : undefined}
        rotation-per-second="24deg"
        touch-action="pan-y"
        shadow-intensity="1.2"
        shadow-softness="0.6"
        exposure="1.15"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          outline: 'none',
        }}
      />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20 transition-opacity">
          <div className="w-12 h-12 rounded-full border-4 border-secondary/30 border-t-secondary animate-spin mb-3 shadow-[2px_2px_0px_#ffbe08]" />
          <span className="font-headline font-bold text-sm text-on-surface">
            Cargando modelo 3D...
          </span>
          <span className="text-xs text-on-surface-variant font-medium mt-1">
            {loadingProgress}% descargado
          </span>
          <div className="w-40 h-2 bg-surface-container rounded-full mt-3 overflow-hidden border border-[#001f25]/20">
            <div
              className="h-full bg-secondary transition-all duration-200"
              style={{ width: `${Math.max(5, loadingProgress)}%` }}
            />
          </div>
        </div>
      )}

      {/* 3D Floating Badge */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-1.5 bg-[#001f25] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#ffbe08] border border-white/20">
        <span className="material-symbols-outlined text-sm text-secondary animate-pulse">view_in_ar</span>
        <span>Modelo 3D Interactivo</span>
      </div>

      {/* Helper Interaction Hint */}
      {isLoaded && !hasInteracted && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-surface/90 backdrop-blur-sm border border-[#001f25]/20 text-[#001f25] text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-bounce">
          <span className="material-symbols-outlined text-sm text-secondary">pan_tool</span>
          <span>Arrastra para girar en 360°</span>
        </div>
      )}

      {/* Floating Action Controls */}
      {isLoaded && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-surface/85 backdrop-blur-sm p-1 rounded-full border border-[#001f25]/30 shadow-[2px_2px_0px_#c1e8ff]">
          <button
            type="button"
            onClick={handleToggleAutoRotate}
            title={isAutoRotating ? 'Pausar rotación' : 'Activar auto-rotación'}
            className="w-7 h-7 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-sm">
              {isAutoRotating ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button
            type="button"
            onClick={handleResetCamera}
            title="Reiniciar cámara"
            className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
          </button>
        </div>
      )}
    </div>
  );
};

