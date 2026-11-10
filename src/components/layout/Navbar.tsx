import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['inicio', 'tienda', 'esencia', 'simulador', 'contacto'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,31,37,0.06)] border-b border-surface-container-high'
          : 'bg-surface/90 backdrop-blur-sm'
      }`}
    >
      <div className="h-20 max-w-[1280px] mx-auto px-margin flex items-center justify-between gap-space-md">
        {/* Brand / Logo */}
        <div className="flex items-center">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className="flex items-center group py-1"
            aria-label="ajá! pinta - Inicio"
          >
            <img
              src="/recurso-4.svg"
              alt="Logo ajá! pinta"
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
            />
          </a>
        </div>

        {/* Desktop Navigation pill */}
        <nav className="hidden md:flex items-center gap-1.5 bg-surface-container-lowest px-2 py-1.5 rounded-full shadow-[2px_2px_0px_#ffdcc5] border border-outline-variant/40">
          <button
            onClick={() => scrollToSection('inicio')}
            className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all ${
              activeSection === 'inicio'
                ? 'bg-secondary-container text-white shadow-[2px_2px_0px_#ffbe08]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('tienda')}
            className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all ${
              activeSection === 'tienda'
                ? 'bg-secondary-container text-white shadow-[2px_2px_0px_#ffbe08]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => scrollToSection('simulador')}
            className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all flex items-center gap-1 ${
              activeSection === 'simulador'
                ? 'bg-tertiary text-white shadow-[2px_2px_0px_#84f5f0]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="text-xs">🎨</span>
            <span>Simulador</span>
          </button>
          <button
            onClick={() => scrollToSection('esencia')}
            className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all ${
              activeSection === 'esencia'
                ? 'bg-secondary-container text-white shadow-[2px_2px_0px_#ffbe08]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Nuestra esencia
          </button>
          <button
            onClick={onOpenContact}
            className="px-4 py-1.5 text-sm font-bold rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
          >
            Contacto
          </button>
        </nav>

        {/* Right Actions: Cart & CTA */}
        <div className="flex items-center gap-space-sm">
          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-surface-container-lowest text-on-surface border border-outline-variant/60 shadow-[2px_2px_0px_#73d1ff] hover:bg-surface-container hover:scale-105 active:scale-95 transition-all"
            aria-label="Abrir carrito"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface shadow-[1px_1px_0px_#ff8da1] animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Quick CTA */}
          <button
            onClick={() => scrollToSection('tienda')}
            className="hidden sm:inline-flex items-center gap-1.5 font-bold text-sm bg-secondary-container text-white px-5 py-2.5 rounded-full shadow-[3px_3px_0px_#ffbe08] hover:bg-secondary active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            <span className="material-symbols-outlined text-lg">brush</span>
            <span>Ver figuras</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-surface-container-lowest text-on-surface border border-outline-variant/60 shadow-[2px_2px_0px_#73d1ff]"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b-2 border-[#001f25] px-margin py-space-md shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('inicio')}
              className={`text-left px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 ${
                activeSection === 'inicio' ? 'bg-secondary-fixed text-secondary' : 'text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined">home</span>
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('tienda')}
              className={`text-left px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 ${
                activeSection === 'tienda' ? 'bg-secondary-fixed text-secondary' : 'text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined">storefront</span>
              Catálogo de Figuras
            </button>
            <button
              onClick={() => scrollToSection('simulador')}
              className={`text-left px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 ${
                activeSection === 'simulador' ? 'bg-tertiary-fixed text-tertiary' : 'text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined">palette</span>
              Simulador de Pintura
            </button>
            <button
              onClick={() => scrollToSection('esencia')}
              className={`text-left px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 ${
                activeSection === 'esencia' ? 'bg-secondary-fixed text-secondary' : 'text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined">local_florist</span>
              Nuestra Esencia Caribeña
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 text-on-surface hover:bg-surface-container"
            >
              <span className="material-symbols-outlined">mail</span>
              Contacto & Pedidos Especiales
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

