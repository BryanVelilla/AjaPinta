import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'contact' | 'story';
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'contact'
}) => {
  const [tab, setTab] = useState<'contact' | 'story'>(defaultTab);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [eventType, setEventType] = useState('Colegio / Institución');
  const [kitQuantity, setKitQuantity] = useState('20-50 unidades');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSendInquiry = () => {
    const waNumber = '573001234567';
    let text = `¡Hola ajá! pinta! Quisiera cotizar kits al por mayor / corporativos:\n\n`;
    text += `👤 *Nombre:* ${name || 'Interesado'}\n`;
    if (phone) text += `📞 *Teléfono:* ${phone}\n`;
    if (city) text += `📍 *Ciudad:* ${city}\n`;
    text += `🎯 *Tipo de evento:* ${eventType}\n`;
    text += `📦 *Cantidad estimada:* ${kitQuantity}\n`;
    if (message) text += `💬 *Mensaje:* ${message}\n`;

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#001f25]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-surface-container-lowest rounded-[32px_16px_36px_18px] border-4 border-[#001f25] shadow-[8px_8px_0px_#001f25] max-w-2xl w-full p-6 md:p-8 z-10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container hover:bg-secondary-fixed text-on-surface flex items-center justify-center border border-[#001f25] shadow-[2px_2px_0px_#001f25] transition-transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 mb-6 border-b-2 border-surface-container-high pb-3">
          <button
            onClick={() => setTab('contact')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 border-[#001f25] transition-all ${
              tab === 'contact'
                ? 'bg-secondary-container text-white shadow-[2px_2px_0px_#001f25]'
                : 'bg-surface hover:bg-surface-container'
            }`}
          >
            Kits al por Mayor & Contacto
          </button>
          <button
            onClick={() => setTab('story')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 border-[#001f25] transition-all ${
              tab === 'story'
                ? 'bg-tertiary text-white shadow-[2px_2px_0px_#001f25]'
                : 'bg-surface hover:bg-surface-container'
            }`}
          >
            Nuestra Historia
          </button>
        </div>

        {tab === 'contact' ? (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-headline text-2xl font-bold text-on-surface">
                ¡Lleva la gozadera caribeña a tu evento!
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Ofrecemos descuentos especiales para colegios, eventos empresariales, cumpleaños infantiles y ferias artesanales.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Nombre o Empresa:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. María o Colegio Sabanas"
                  className="w-full p-2.5 rounded-xl border border-[#001f25]/30 bg-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Teléfono o WhatsApp:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 300 123 4567"
                  className="w-full p-2.5 rounded-xl border border-[#001f25]/30 bg-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Ciudad de entrega:</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ej. Sincelejo, Barranquilla, Medellín..."
                  className="w-full p-2.5 rounded-xl border border-[#001f25]/30 bg-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Cantidad de kits:</label>
                <select
                  value={kitQuantity}
                  onChange={(e) => setKitQuantity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#001f25]/30 bg-surface focus:outline-none focus:border-secondary font-medium"
                >
                  <option>10 a 25 kits</option>
                  <option>26 a 50 kits</option>
                  <option>51 a 100 kits</option>
                  <option>Más de 100 kits (+ sorpresa especial)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-xs text-on-surface block mb-1">Mensaje o solicitud específica:</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntanos fecha del evento, figuras que prefieres, etc."
                className="w-full p-2.5 rounded-xl border border-[#001f25]/30 bg-surface text-xs focus:outline-none focus:border-secondary"
              />
            </div>

            <button
              onClick={handleSendInquiry}
              className="mt-2 w-full py-3 rounded-full bg-[#25D366] text-white font-headline text-sm font-bold shadow-[3px_3px_0px_#001f25] border-2 border-[#001f25] hover:bg-[#20ba59] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>Cotizar directamente por WhatsApp</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <div className="flex items-center gap-3">
              <img
                src="/recurso-4.svg"
                alt="ajá! pinta"
                className="w-12 h-12 object-contain p-1 rounded-full bg-surface-container border border-[#001f25]"
              />
              <div>
                <h4 className="font-headline text-lg font-bold text-on-surface">
                  Nacidos en el corazón de Sucre
                </h4>
                <span className="text-xs text-secondary font-bold">Desde Sincelejo con amor artesanal</span>
              </div>
            </div>

            <p>
              <strong>ajá! pinta</strong> nació con una premisa simple y poderosa: rescatar los símbolos de nuestra identidad sabanera y ponerlos en las manos de todas las familias colombianas para que cada quien sea el artista de su propia tradición.
            </p>

            <p>
              El departamento de Sucre alberga una de las tradiciones orfebres, cerámicas y de cestería más ricas del mundo a través de la cultura Zenú y la arquitectura vernácula de bahareque. En nuestros talleres familiares en Sincelejo, seleccionamos yesos y arcillas de altísima calidad para moldear esculturas duraderas, seguras y libres de tóxicos.
            </p>

            <div className="p-3 bg-secondary-fixed/40 rounded-xl border border-[#001f25]/20 text-on-surface">
              <span className="font-bold block mb-1">🎨 Nuestra Misión:</span>
              Fomentar el arte manual, la desconexión tecnológica saludable y el orgullo por nuestras raíces costeñas en cada rincón de Colombia y el exterior.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

