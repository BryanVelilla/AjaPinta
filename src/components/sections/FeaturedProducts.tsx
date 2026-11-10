import React from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface FeaturedProductsProps {
  onSelectProduct: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onSelectProduct }) => {
  const { addToCart } = useCart();

  return (
    <section id="tienda" className="w-full py-space-xl bg-surface-container-lowest relative">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col gap-space-xs max-w-2xl pb-6">
          <div className="inline-flex items-center gap-space-xs bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-space-xs rounded-full shadow-[2px_2px_0px_#84f5f0] border border-tertiary-container/30 w-fit">
            <span className="material-symbols-outlined text-sm">storefront</span>
            <span className="text-xs uppercase font-bold tracking-wider">Catálogo Hecho a Mano</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface">
            ¡Escoge tu próxima creación!
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant">
            Figuras inspiradas en nuestra tierra sabanera, listas para llenarse de color con el toque único de tus manos.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg lg:gap-space-xl pt-2">
          {PRODUCTS.map((product, index) => {
            const isAlternate = index % 2 === 1;
            const cardBg = isAlternate ? 'bg-surface-container' : 'bg-surface-container-low';
            const radiusStyle = isAlternate
              ? 'rounded-[16px_28px_14px_32px]'
              : 'rounded-[28px_16px_32px_14px]';

            return (
              <div
                key={product.id}
                className={`group ${cardBg} ${radiusStyle} p-4 sm:p-5 md:p-6 shadow-[5px_5px_0px_#ffdcc5] border-3 border-[#001f25] flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch transform transition-all duration-300 hover:shadow-[7px_7px_0px_#ffdcc5] hover:-translate-x-0.5 hover:-translate-y-0.5`}
              >
                {/* Product Photo */}
                <div
                  className="w-full sm:w-5/12 flex-shrink-0 relative cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <div className="relative h-56 sm:h-full min-h-[200px] overflow-hidden rounded-[20px_10px_22px_8px] bg-secondary-fixed shadow-[3px_3px_0px_#ffdcc5] border-2 border-[#001f25]">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className={`absolute top-2 left-2 ${product.badgeColor || 'bg-secondary-container'} text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#ffbe08] border border-white/40 -rotate-2`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="w-full sm:w-7/12 flex flex-col justify-between gap-3 min-w-0">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-tertiary uppercase font-bold tracking-wider truncate">
                        {product.subtitle}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-on-surface flex-shrink-0">
                        <span className="material-symbols-outlined text-yellow-500 text-sm fill-1">star</span>
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-headline text-lg sm:text-xl font-bold text-on-surface leading-tight hover:text-secondary cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Included Items Pill */}
                  <div className="bg-surface-container-lowest py-1.5 px-2.5 rounded-xl shadow-[2px_2px_0px_#ffdcc5] border border-outline-variant/50 flex items-center justify-between text-[11px] font-bold text-on-surface">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-sm">brush</span>
                      2 Pinceles
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-sm">format_paint</span>
                      6 Acrílicos
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-tertiary text-sm">menu_book</span>
                      Guía
                    </span>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pt-2 border-t border-[#001f25]/10 mt-auto">
                    <div className="flex flex-col flex-shrink-0">
                      <span className="text-[10px] text-on-surface-variant font-medium">Kit Completo</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline text-lg sm:text-xl font-bold text-secondary leading-none">
                          ${product.price.toLocaleString('es-CO')}
                        </span>
                        <span className="text-[10px] font-bold">COP</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex items-center justify-center gap-1 bg-surface-container-lowest text-on-surface text-xs font-bold px-3 py-1.5 rounded-full border border-outline-variant/60 shadow-[2px_2px_0px_#73d1ff] hover:bg-surface-container active:scale-95 transition-all"
                        title="Ver detalles completos"
                      >
                        <span>Detalles</span>
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>

                      <button
                        onClick={() => addToCart(product, 1, false)}
                        className="inline-flex items-center justify-center gap-1 bg-secondary-container text-white text-xs font-bold px-3 py-1.5 rounded-full border border-secondary-container shadow-[3px_3px_0px_#ffbe08] hover:bg-secondary active:scale-95 transition-all"
                        title="Añadir a la canasta"
                      >
                        <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                        <span>Llevar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

