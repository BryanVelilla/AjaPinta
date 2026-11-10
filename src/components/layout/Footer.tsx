import React from 'react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacto" className="w-full bg-surface-container-low mt-space-xl pt-space-xl pb-space-lg border-t-2 border-[#001f25]">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg pb-space-lg border-b border-[#001f25]/10">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest p-2 border border-outline-variant/50 shadow-[2px_2px_0px_#ffdcc5] flex items-center justify-center">
                <img
                  alt="Logo ajá! pinta"
                  className="w-full h-full object-contain"
                  src="/recurso-4.svg"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-secondary leading-none">
                  ajá! pinta
                </span>
                <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                  Sincelejo, Sucre • Colombia
                </span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
              Figuras artesanales en yeso y cerámica listas para pintar, inspiradas en las raíces folclóricas, la calidez tropical y la rica cultura caribeña de Sucre. Un lienzo tridimensional para crear en familia.
            </p>

            <div className="inline-flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full shadow-[2px_2px_0px_#ffdcc5] border border-outline-variant/40 w-fit">
              <span className="material-symbols-outlined text-secondary text-base">palette</span>
              <span className="text-xs font-bold text-on-surface">
                Hecho a mano en Sucre con puro corazón
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-headline text-base font-bold text-on-surface mb-2">
              Navegación
            </h3>
            <button
              onClick={() => scrollTo('inicio')}
              className="text-left text-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollTo('tienda')}
              className="text-left text-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              Catálogo de Figuras
            </button>
            <button
              onClick={() => scrollTo('simulador')}
              className="text-left text-sm text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1"
            >
              <span>Simulador Virtual</span>
              <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-bold px-1.5 py-0.5 rounded">
                Nuevo
              </span>
            </button>
            <button
              onClick={() => scrollTo('esencia')}
              className="text-left text-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              Nuestra Esencia y Tradición
            </button>
            <button
              onClick={onOpenContact}
              className="text-left text-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              Puntos de Contacto & FAQ
            </button>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-headline text-base font-bold text-on-surface mb-2">
              Contacto Caribe
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-tertiary">location_on</span>
              <span>Sincelejo, Sucre - Colombia</span>
            </p>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-secondary flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-base text-tertiary">call</span>
              <span>+57 (300) 123-4567</span>
            </a>
            <a
              href="mailto:hola@ajapinta.com"
              className="text-xs sm:text-sm text-on-surface-variant hover:text-secondary flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-base text-tertiary">mail</span>
              <span>hola@ajapinta.com</span>
            </a>

            <div className="flex items-center gap-2 pt-2">
              <span
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant border border-outline-variant/50 shadow-[1px_1px_0px_#73d1ff] cursor-pointer hover:bg-secondary-fixed transition-colors"
                title="Red Caribe"
              >
                <span className="material-symbols-outlined text-base">public</span>
              </span>
              <span
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant border border-outline-variant/50 shadow-[1px_1px_0px_#ffbe08] cursor-pointer hover:bg-secondary-fixed transition-colors"
                title="Talleres de arte"
              >
                <span className="material-symbols-outlined text-base">brush</span>
              </span>
              <span
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant border border-outline-variant/50 shadow-[1px_1px_0px_#ff8da1] cursor-pointer hover:bg-secondary-fixed transition-colors"
                title="Pasion artesanal"
              >
                <span className="material-symbols-outlined text-base">favorite</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm text-center md:text-left">
          <p className="text-xs text-on-surface-variant">
            © 2026 ajá! pinta. Tradición artesanal y alegría caribeña. Todos los derechos reservados.
          </p>
          <p className="text-xs text-secondary font-bold font-headline">
            Pinta tu historia • Vive el folklore sabanero
          </p>
        </div>
      </div>
    </footer>
  );
};

