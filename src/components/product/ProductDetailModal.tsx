import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [varnishOption, setVarnishOption] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, varnishOption);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const unitPrice = product.price + (varnishOption ? 6000 : 0);
  const totalPrice = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001f25]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-surface-container-lowest rounded-[32px_16px_36px_18px] border-4 border-[#001f25] shadow-[8px_8px_0px_#c1e8ff] max-w-3xl w-full overflow-hidden z-10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center border-2 border-[#001f25] shadow-[2px_2px_0px_#ffdcc5] transition-all hover:scale-105"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Badges */}
          <div className="relative bg-surface-container p-6 flex flex-col items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-[#001f25]">
            <div className="relative w-full max-w-sm rounded-[24px_12px_26px_10px] overflow-hidden border-2 border-[#001f25] shadow-[4px_4px_0px_#c1e8ff] bg-surface-container-highest">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 md:h-80 object-cover object-center"
              />
              {product.badge && (
                <div className={`absolute top-3 left-3 ${product.badgeColor || 'bg-secondary-container'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-[2px_2px_0px_#ffbe08] border border-[#001f25]`}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Quick specs pill */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs font-bold text-on-surface">
              <span className="bg-surface-container-lowest px-2.5 py-1 rounded-full border border-[#001f25] shadow-[1px_1px_0px_#ffdcc5] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-secondary">straighten</span>
                {product.dimensions}
              </span>
              <span className="bg-surface-container-lowest px-2.5 py-1 rounded-full border border-[#001f25] shadow-[1px_1px_0px_#84f5f0] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-tertiary">location_on</span>
                {product.origin}
              </span>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-xs font-bold text-tertiary uppercase tracking-wider block">
                  {product.subtitle}
                </span>
                <h3 className="font-headline text-2xl font-bold text-on-surface leading-tight mt-1">
                  {product.name}
                </h3>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between gap-2 border-b border-surface-container pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-2xl font-bold text-secondary">
                    ${product.price.toLocaleString('es-CO')}
                  </span>
                  <span className="text-xs text-on-surface-variant font-bold">COP</span>
                  {product.originalPrice && (
                    <span className="text-xs text-on-surface-variant line-through">
                      ${product.originalPrice.toLocaleString('es-CO')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold bg-surface-container px-2 py-1 rounded-full border border-[#001f25]/20">
                  <span className="material-symbols-outlined text-yellow-500 text-sm fill-1">star</span>
                  <span>{product.rating}</span>
                  <span className="text-on-surface-variant">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {product.longDescription || product.description}
              </p>

              {/* Included items */}
              <div className="bg-surface-container-low p-3.5 rounded-2xl border border-[#001f25]/30">
                <span className="text-xs font-bold text-on-surface block mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-secondary">inventory_2</span>
                  El kit incluye todo listo para pintar:
                </span>
                <ul className="text-xs text-on-surface-variant space-y-1.5 pl-1">
                  {product.includedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-secondary font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Addon: Varnish */}
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-surface hover:bg-surface-container border border-[#001f25]/20 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={varnishOption}
                  onChange={(e) => setVarnishOption(e.target.checked)}
                  className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-on-surface">Agregar Barniz Sellador Brillante (+ $6.000 COP)</span>
                  <p className="text-[11px] text-on-surface-variant">Protege tu figura contra polvo y le da un acabado vidriado permanente.</p>
                </div>
              </label>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="mt-6 pt-4 border-t-2 border-surface-container-high flex flex-col sm:flex-row items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center gap-2 bg-surface-container-lowest rounded-full border-2 border-[#001f25] px-3 py-1.5 shadow-[2px_2px_0px_#ffdcc5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center font-bold text-base hover:text-secondary"
                >
                  -
                </button>
                <span className="font-bold text-sm min-w-5 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center font-bold text-base hover:text-secondary"
                >
                  +
                </button>
              </div>

              {/* Add button */}
              <button
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className="w-full flex-1 py-3 px-6 rounded-full bg-secondary-container text-white font-headline font-bold text-sm shadow-[4px_4px_0px_#ffbe08] hover:bg-secondary active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#ffbe08] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">
                  {addedAnimation ? 'check_circle' : 'shopping_bag'}
                </span>
                <span>
                  {addedAnimation
                    ? '¡Agregado a la canasta!'
                    : `Agregar • $${totalPrice.toLocaleString('es-CO')} COP`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

