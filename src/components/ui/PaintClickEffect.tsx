import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const SPLASH_COLORS = [
  '#ff8500', // Naranja ajá! pinta
  '#ffbe08', // Amarillo cálido
  '#ff3640', // Rojo vivo
  '#00827f', // Turquesa Zenú
  '#006384', // Azul caribeño
];

export const PaintClickEffect: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let nextId = 0;

    const handleClick = (e: MouseEvent) => {
      // Create a cluster of 6-9 paint splash droplets
      const count = 7;
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = 25 + Math.random() * 45;
        const color = SPLASH_COLORS[Math.floor(Math.random() * SPLASH_COLORS.length)];
        const size = Math.random() * 8 + 6;

        newParticles.push({
          id: nextId++,
          x: e.clientX,
          y: e.clientY,
          size,
          color,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove these particles after animation finishes (650ms)
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 650);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="paint-droplet absolute rounded-full shadow-sm"
          style={
            {
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              '--tx': `${p.vx}px`,
              '--ty': `${p.vy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
