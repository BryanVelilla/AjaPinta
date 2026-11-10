import React, { useState } from 'react';
import { Product, CategoryType } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface FeaturedProductsProps {
  onSelectProduct: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todos los Kits', icon: 'auto_awesome' },
    { id: 'zenu', label: 'Tradición Zenú', icon: 'interests' },
    { id: 'arquitectura', label: 'Arquitectura', icon: 'cottage' },
    { id: 'fauna', label: 'Fauna Caribe', icon: 'pets' },
    { id: 'combos', label: 'Combos Familiares', icon: 'family_restroom' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tienda" className="w-full py-space-xl bg-surface-container-lowest relative">
      <div className="max-w-[1280px] mx-auto px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-6">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="inline-flex items-center gap-space-xs bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-space-xs rounded-full shadow-[2px_2px_0px_#001f25] border border-[#001f25] w-fit">
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

          {/* Search box */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Buscar figura o kit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-[#001f25] bg-surface text-sm font-medium shadow-[2px_2px_0px_#001f25] focus:outline-none focus:border-secondary"
            />
            <span className="material-symbols-outlined text-gray-500 absolute left-3 top-3 text-lg">
              search
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap border-2 border-[#001f25] transition-all ${
                  isActive
                    ? 'bg-secondary-container text-white shadow-[3px_3px_0px_#001f25] -translate-y-0.5'
                    : 'bg-surface text-on-surface hover:bg-surface-container shadow-[1px_1px_0px_#001f25]'
                }`}
              >
                <span className="material-symbols-outlined text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl pt-6">
          {filteredProducts.map((product, index) => {
            const isAlternate = index % 2 === 1;
            const cardBg = isAlternate ? 'bg-surface-container' : 'bg-surface-container-low';
            const radiusStyle = isAlternate
              ? 'rounded-[16px_28px_14px_32px]'
              : 'rounded-[28px_16px_32px_14px]';

            return (
              <div
                key={product.id}
                className={`group ${cardBg} ${radiusStyle} p-space-md md:p-space-lg shadow-[5px_5px_0px_#001f25] border-3 border-[#001f25] flex flex-col md:flex-row gap-space-md items-center transform transition-all duration-300 hover:shadow-[7px_7px_0px_#001f25] hover:-translate-x-0.5 hover:-translate-y-0.5`}
              >
                {/* Product Photo */}
                <div className="w-full md:w-1/2 relative cursor-pointer" onClick={() => onSelectProduct(product)}>
                  <div className="relative overflow-hidden rounded-[22px_12px_24px_10px] bg-secondary-fixed shadow-[3px_3px_0px_#001f25] border-2 border-[#001f25]">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="w-full h-64 md:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className={`absolute top-space-xs left-space-xs ${product.badgeColor || 'bg-secondary-container'} text-white text-xs font-bold px-space-sm py-space-xs rounded-full shadow-[2px_2px_0px_#001f25] border border-[#001f25] -rotate-2`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-between gap-space-sm h-full">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-tertiary uppercase font-bold tracking-wider">
                        {product.subtitle}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-on-surface">
                        <span className="material-symbols-outlined text-yellow-500 text-sm fill-1">star</span>
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-headline text-xl sm:text-2xl font-bold text-on-surface leading-tight hover:text-secondary cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Included Items Pill */}
                  <div className="bg-surface-container-lowest p-2 rounded-xl shadow-[2px_2px_0px_#001f25] border border-[#001f25] flex items-center justify-between text-xs font-bold text-on-surface">
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
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#001f25]/10">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant font-medium">Kit Completo</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline text-xl sm:text-2xl font-bold text-secondary leading-none">
                          ${product.price.toLocaleString('es-CO')}
                        </span>
                        <span className="text-[11px] font-bold">COP</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex items-center justify-center gap-1 bg-surface-container-lowest text-on-surface text-xs font-bold px-3.5 py-2 rounded-full border-2 border-[#001f25] shadow-[2px_2px_0px_#001f25] hover:bg-surface-container active:scale-95 transition-all"
                        title="Ver detalles completos"
                      >
                        <span>Detalles</span>
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>

                      <button
                        onClick={() => addToCart(product, 1, false)}
                        className="inline-flex items-center justify-center gap-1 bg-secondary-container text-white text-xs font-bold px-3.5 py-2 rounded-full border-2 border-[#001f25] shadow-[3px_3px_0px_#001f25] hover:bg-secondary active:scale-95 transition-all"
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

