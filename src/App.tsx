import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeTicker } from './components/sections/MarqueeTicker';
import { FeaturedProducts } from './components/sections/FeaturedProducts';
import { PaintSimulator } from './components/sections/PaintSimulator';
import { CultureEssence } from './components/sections/CultureEssence';
import { KitFeatures } from './components/sections/KitFeatures';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { ContactModal } from './components/contact/ContactModal';
import { Product } from './types';
import { PRODUCTS } from './data/products';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDefaultTab, setContactDefaultTab] = useState<'contact' | 'story'>('contact');

  const scrollToCatalog = () => {
    const el = document.getElementById('tienda');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openSombrero = () => {
    const sombrero = PRODUCTS.find(p => p.id === 'sombrero-vueltiao');
    if (sombrero) setSelectedProduct(sombrero);
  };

  const openCasita = () => {
    const casita = PRODUCTS.find(p => p.id === 'casita-bahareque');
    if (casita) setSelectedProduct(casita);
  };

  const handleOpenStory = () => {
    setContactDefaultTab('story');
    setIsContactOpen(true);
  };

  const handleOpenCorporate = () => {
    setContactDefaultTab('contact');
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col selection:bg-secondary-container selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenContact={handleOpenCorporate} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full pt-20">
        {/* 1. Hero */}
        <HeroSection
          onExploreClick={scrollToCatalog}
          onOpenSombrero={openSombrero}
          onOpenCasita={openCasita}
        />

        {/* 2. Marquee Ticker */}
        <MarqueeTicker />

        {/* 3. Catalog & Featured Figures */}
        <FeaturedProducts onSelectProduct={(prod) => setSelectedProduct(prod)} />

        {/* 4. Interactive Virtual Painting Simulator */}
        <PaintSimulator />

        {/* 5. Cultural Essence & History */}
        <CultureEssence onStoryClick={handleOpenStory} />

        {/* 6. Complete Kit Features */}
        <KitFeatures />

        {/* 7. Final Call to Action */}
        <FinalCTA
          onExploreClick={scrollToCatalog}
          onCorporateClick={handleOpenCorporate}
        />
      </main>

      {/* Footer */}
      <Footer onOpenContact={handleOpenCorporate} />

      {/* Modals & Slide-overs */}
      <CartDrawer />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultTab={contactDefaultTab}
      />
    </div>
  );
};

export default App;

