import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
    generateWhatsAppLink
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 90000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    const waLink = generateWhatsAppLink(customerName, city, address);
    window.open(waLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#001f25]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest border-l-4 border-[#001f25] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-space-md border-b-2 border-surface-container-high bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-2xl">shopping_cart</span>
              <h2 className="font-headline text-xl font-bold text-on-surface">Tu Canasta Caribeña</h2>
              <span className="text-xs font-bold bg-secondary-container text-white px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#ffbe08]">
                {items.length} {items.length === 1 ? 'kit' : 'kits'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center border border-outline-variant/60 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-surface-container px-space-md py-2 border-b border-surface-container-highest">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                {amountToFreeShipping > 0
                  ? `Faltan $${amountToFreeShipping.toLocaleString('es-CO')} para Envío Gratis`
                  : '¡Tienes Envío GRATIS a toda Colombia! 🎉'}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden border border-[#001f25]/20">
              <div
                className="h-full bg-secondary-container transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-3">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-on-surface-variant">
                <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mb-3 shadow-[3px_3px_0px_#ffdcc5] border border-[#001f25]">
                  <span className="material-symbols-outlined text-4xl text-secondary">palette</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1">
                  Tu canasta está vacía
                </h3>
                <p className="text-sm max-w-xs mb-4">
                  ¡Elige un Sombrero Vueltiao, una Casita Bahareque o uno de nuestros kits y dale color!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="font-bold text-sm bg-secondary-container text-white px-5 py-2 rounded-full shadow-[2px_2px_0px_#ffbe08] hover:bg-secondary"
                >
                  Ver figuras disponibles
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = (item.product.price + (item.varnishOption ? 6000 : 0)) * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="p-3 bg-surface rounded-2xl border border-outline-variant/60 shadow-[3px_3px_0px_#ffdcc5] flex gap-3 relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-[#001f25] bg-surface-container-highest flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="pr-6">
                        <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider block">
                          {item.product.categoryLabel}
                        </span>
                        <h4 className="font-headline text-sm font-bold text-on-surface leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="text-xs font-bold text-secondary mt-0.5">
                          ${item.product.price.toLocaleString('es-CO')} COP
                        </div>
                        {item.varnishOption && (
                          <span className="inline-block mt-1 text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded border border-[#001f25]/20">
                            + Barniz protector
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-container-high">
                        <div className="flex items-center gap-1.5 bg-surface-container-lowest rounded-full border border-[#001f25] px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center font-bold text-sm hover:text-secondary"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center font-bold text-sm hover:text-secondary"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-xs text-on-surface">
                          ${itemTotal.toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="absolute top-2 right-2 text-on-surface-variant hover:text-error transition-colors p-1"
                      title="Eliminar kit"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                );
              })
            )}

            {/* Quick customer form if items exist */}
            {items.length > 0 && (
              <div className="mt-2 p-3 bg-surface-container-low rounded-xl border border-[#001f25]/30 flex flex-col gap-2">
                <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-secondary">person_pin</span>
                  Tus datos de envío (opcional):
                </span>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#001f25]/20 bg-surface-container-lowest focus:outline-none focus:border-secondary"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Ciudad o Municipio"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#001f25]/20 bg-surface-container-lowest focus:outline-none focus:border-secondary"
                  />
                  <input
                    type="text"
                    placeholder="Dirección / Barrio"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#001f25]/20 bg-surface-container-lowest focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & WhatsApp Checkout */}
          {items.length > 0 && (
            <div className="p-space-md border-t-2 border-[#001f25] bg-surface-container-low flex flex-col gap-3">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal:</span>
                  <span className="font-bold text-on-surface">${subtotal.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    Envío nacional:
                    {shipping === 0 && (
                      <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1 rounded font-bold">
                        GRATIS
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-on-surface">
                    {shipping === 0 ? '$0 COP' : `$${shipping.toLocaleString('es-CO')} COP`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-on-surface pt-1 border-t border-[#001f25]/10">
                  <span>Total estimado:</span>
                  <span className="text-secondary text-lg leading-none">${total.toLocaleString('es-CO')} COP</span>
                </div>
              </div>

              {/* Checkout WhatsApp Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 rounded-full bg-[#25D366] text-white font-headline text-base font-bold shadow-[3px_3px_0px_#86efac] hover:bg-[#20ba59] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                <span>Pedir por WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                <button
                  onClick={clearCart}
                  className="hover:text-error underline"
                >
                  Vaciar canasta
                </button>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-tertiary">lock</span>
                  Atención directa y segura
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

