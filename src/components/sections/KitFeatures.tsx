import React from 'react';

export const KitFeatures: React.FC = () => {
  const features = [
    {
      icon: 'brush',
      title: 'Pinceles Pro',
      subtitle: 'Detalle y cubrimiento',
      color: 'text-secondary',
      bgColor: 'bg-secondary-fixed'
    },
    {
      icon: 'format_paint',
      title: 'Pinturas Vivas',
      subtitle: 'Acrílicas no tóxicas',
      color: 'text-tertiary',
      bgColor: 'bg-tertiary-fixed'
    },
    {
      icon: 'local_shipping',
      title: 'Envíos Colombia',
      subtitle: 'Embalaje ultra seguro',
      color: 'text-primary',
      bgColor: 'bg-primary-fixed'
    },
    {
      icon: 'family_restroom',
      title: 'Para Todos',
      subtitle: 'Desde los 4 a 99 años',
      color: 'text-secondary',
      bgColor: 'bg-secondary-fixed'
    }
  ];

  return (
    <section className="w-full py-space-lg bg-surface-container-high relative border-y-2 border-[#001f25]/10">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-space-sm bg-surface-container-lowest p-space-md rounded-2xl shadow-[3px_3px_0px_#001f25] border-2 border-[#001f25] hover:-translate-y-1 transition-transform"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center border border-[#001f25] flex-shrink-0`}>
                <span className={`material-symbols-outlined text-2xl ${feature.color}`}>
                  {feature.icon}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-base font-bold text-on-surface leading-snug">
                  {feature.title}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {feature.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

