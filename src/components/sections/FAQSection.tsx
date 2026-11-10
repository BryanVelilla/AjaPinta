import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Materiales & Seguridad',
      question: '¿Qué tipo de pinturas y pinceles vienen en cada kit?',
      answer: 'Cada kit incluye 6 témperas acrílicas al agua de formulación no tóxica y lavable de alta cobertura, seguras tanto para niños desde los 4 años como para adultos. Además, contiene 2 pinceles artísticos con cerdas sintéticas de calidad (uno de punta redonda fina para delinear detalles y otro plano para cubrir superficies amplias) y una guía explicativa.'
    },
    {
      category: 'Proceso Creativo',
      question: '¿Qué pasa si me equivoco de color al pintar la figura?',
      answer: '¡No te preocupes! El yeso cerámico que fabricamos en Sincelejo permite corregir con facilidad: si la témpera aún está fresca, puedes limpiarla suavemente con un pañito o hisopo ligeramente húmedo. Si ya secó, simplemente puedes darle una capa base de blanco o del nuevo color y pintar encima sin problema.'
    },
    {
      category: 'Envíos & Embalaje',
      question: '¿Cómo garantizan que las figuras de yeso lleguen intactas por correo?',
      answer: 'Empacamos cada pieza artesanal en papel kraft absorbente, cámara de burbujas de alto impacto y esquineros reforzados dentro de una caja de cartón rígido serigrafiada. Realizamos envíos a toda Colombia (Sincelejo, Montería, Barranquilla, Cartagena, Bogotá, Medellín, Cali, Bucaramanga y municipios intermedios). Además, en compras superiores a $90.000 COP, ¡el envío es totalmente GRATIS!'
    },
    {
      category: 'Eventos & Mayoristas',
      question: '¿Ofrecen descuentos por cantidad para colegios, empresas o recuerdos de fiesta?',
      answer: '¡Sí, totalmente! Contamos con paquetes corporativos y kits para fiestas infantiles, talleres comunitarios, ferias culturales y souvenirs turísticos con precios especiales a partir de 10 unidades. Puedes hacer clic en el botón "Kits corporativos y eventos" o escribirnos directo al WhatsApp para cotizar tu paquete a la medida.'
    },
    {
      category: 'Cuidado & Durabilidad',
      question: '¿Es necesario aplicar barniz protector a la pieza terminada?',
      answer: 'Las témperas secan con un acabado mate muy bonito por sí solas. Sin embargo, si deseas que tu figura tenga un brillo cerámico permanente y esté protegida contra el polvo y la humedad, puedes marcar la opción de "Barniz Sellador Brillante" en el carrito o aplicarle barniz al agua una vez que esté 100% seca.'
    }
  ];

  return (
    <section className="w-full py-space-xl bg-surface-container-lowest relative">
      <div className="max-w-[960px] mx-auto px-margin">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-4 py-1 rounded-full shadow-[2px_2px_0px_#ffb783] border border-secondary/30 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">help</span>
            <span>Resuelve tus Dudas</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface">
            Preguntas Frecuentes Caribeñas
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl mx-auto">
            Todo lo que necesitas saber sobre nuestros kits artesanales, métodos de pago y envíos desde Sucre.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border border-outline-variant/60 transition-all duration-200 overflow-hidden ${isOpen
                    ? 'bg-surface shadow-[4px_4px_0px_#ffbe08]'
                    : 'bg-surface-container-low hover:bg-surface shadow-[2px_2px_0px_#ffdcc5]'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-secondary-container text-white text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#ffbe08]">
                      {index + 1}
                    </span>
                    <span className="font-headline text-base sm:text-lg font-bold text-on-surface">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-xl text-secondary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                      }`}
                  >
                    keyboard_arrow_down
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-[#001f25]/10 animate-fadeIn">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[11px] font-bold text-tertiary bg-surface-container-highest px-2 py-0.5 rounded-full border border-[#001f25]/20">
                      🏷️ {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

