import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, varnishOption?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  generateWhatsAppLink: (customerName?: string, city?: string, address?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ajapinta_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ajapinta_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1, varnishOption: boolean = false) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, varnishOption: varnishOption || item.varnishOption }
            : item
        );
      }
      return [...prev, { product, quantity, varnishOption }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.varnishOption ? 6000 : 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  // Free shipping over $90.000 COP
  const shipping = subtotal === 0 ? 0 : subtotal >= 90000 ? 0 : 10000;
  const total = subtotal + shipping;

  const generateWhatsAppLink = (customerName?: string, city?: string, address?: string) => {
    const phoneNumber = "573001234567"; // Sincelejo, Sucre WhatsApp
    let message = `¡Hola ajá! pinta! 🎨✨\n\n`;
    message += `Me gustaría encargar el siguiente pedido artesanal desde la página web:\n\n`;

    items.forEach((item, index) => {
      const unitPrice = item.product.price + (item.varnishOption ? 6000 : 0);
      message += `${index + 1}. *${item.product.name}* (x${item.quantity}) - $${unitPrice.toLocaleString('es-CO')} c/u\n`;
      if (item.varnishOption) {
        message += `   └ Con acabado de Barniz Sellador Brillante (+ $6.000)\n`;
      }
    });

    message += `\n📦 *Subtotal:* $${subtotal.toLocaleString('es-CO')} COP`;
    message += `\n🚚 *Envío:* ${shipping === 0 ? '¡GRATIS!' : `$${shipping.toLocaleString('es-CO')} COP`}`;
    message += `\n💰 *Total a pagar:* $${total.toLocaleString('es-CO')} COP\n`;

    if (customerName) message += `\n👤 *Nombre:* ${customerName}`;
    if (city) message += `\n📍 *Ciudad/Municipio:* ${city}`;
    if (address) message += `\n🏠 *Dirección:* ${address}`;

    message += `\n\n¡Por favor confírmenme medios de pago y tiempos de entrega! Muchas gracias.`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        shipping,
        total,
        generateWhatsAppLink
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

