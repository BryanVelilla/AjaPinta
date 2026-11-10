# ajá! pinta 🎨✨ — Caribe & Yeso

Sitio web oficial interactivo, moderno y modular para **ajá! pinta** (Sincelejo, Sucre • Colombia), especializado en figuras artesanales en yeso cerámico de formulación tradicional listas para pintar en familia.

---

## 🌟 Tecnologías y Stack Moderno

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador y Servidor de Desarrollo:** [Vite 6](https://vitejs.dev/) (Compilación ultrarrápida en ~5s)
- **Estilos & Diseño:** [Tailwind CSS v3](https://tailwindcss.com/)
  - Paleta auténtica con estética *sticker neo-brutalist* caribeña (sombras sólidas `3px 3px 0px #001f25`, bordes asimétricos orgánicos).
  - Colores identitarios: `#ff8500`, `#ffbe08`, `#5bcecb`, `#ff3640`, `#006384`, `#944b00`.
- **Tipografía:** [Quicksand](https://fonts.google.com/specimen/Quicksand) (Google Fonts) + Google Material Symbols Outlined.
- **Gestión de Estado:** React Context API (`CartContext`) con persistencia en `localStorage`.

---

## 📁 Arquitectura Modular del Proyecto

```text
AjaPinta Web/
├── public/
│   ├── recurso-1.svg         # Ondas y patrones caribeños
│   ├── recurso-3.svg         # Patrón decorativo de fondo caribeño
│   ├── recurso-4.svg         # Isotipo oficial ajá! pinta (Badge/Cuadrado)
│   └── recurso-5.svg         # Logotipo horizontal oficial ajá! pinta
├── src/
│   ├── assets/               # Recursos vectoriales y branding
│   ├── components/
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx           # Canasta deslizable con cálculo de envío y checkout a WhatsApp
│   │   ├── contact/
│   │   │   └── ContactModal.tsx         # Modal de cotización corporativa, ferias y nuestra historia
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # Barra de navegación con logo SVG, pill menú y badge de carrito
│   │   │   └── Footer.tsx               # Footer con sellos culturales y datos de contacto en Sincelejo
│   │   ├── product/
│   │   │   └── ProductDetailModal.tsx   # Modal detallado con zoom, dimensiones, kit y barniz protector
│   │   └── sections/
│   │       ├── HeroSection.tsx          # Hero con composición asimétrica de stickers y mosaico de figuras
│   │       ├── MarqueeTicker.tsx        # Cinta infinita de orgullo y folklore sucreño
│   │       ├── FeaturedProducts.tsx     # Catálogo interactivo con filtros de categoría y buscador
│   │       ├── PaintSimulator.tsx       # Simulador interactivo virtual para colorear el Sombrero Vueltiao
│   │       ├── CultureEssence.tsx       # Pilares culturales, apoyo al artesano y testimonios
│   │       ├── KitFeatures.tsx          # Garantías (Pinceles, Pinturas vivas, Envíos nacionales, etc.)
│   │       └── FinalCTA.tsx             # Banner de llamada a la acción con fondo decorativo
│   ├── context/
│   │   └── CartContext.tsx              # Estado global del carrito y generador de pedidos por WhatsApp
│   ├── data/
│   │   └── products.ts                  # Catálogo de figuras (Sombrero Vueltiao, Casita Bahareque, Iguana...)
│   ├── types/
│   │   └── index.ts                     # Definiciones de TypeScript
│   ├── App.tsx                          # Orquestación de la aplicación
│   ├── index.css                        # Configuración Tailwind y utilidades sticker
│   └── main.tsx                         # Punto de entrada React
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Comandos de Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en caliente
npm run dev

# 3. Compilar para producción (Zero-errors TypeScript + Minificación)
npm run build

# 4. Probar la versión de producción localmente
npm run preview
```

---

## 🎨 Características Destacadas

1. **Uso de Recursos Locales:**
   - Se integraron los archivos SVG originales (`Recurso 1.svg`, `Recurso 3.svg`, `Recurso 4.svg`, `Recurso 5.svg`) tanto para el logotipo de alta resolución como para los fondos con motivos caribeños.
2. **Simulador Virtual de Pintura:**
   - Permite a los usuarios elegir entre 8 colores caribeños y aplicarlos dinámicamente sobre las diferentes partes del *Sombrero Vueltiao* en tiempo real antes de ordenar el kit físico.
3. **Canasta y Checkout Automatizado a WhatsApp:**
   - Calcula subtotal, barra de progreso para envío gratis nacional ($90.000 COP) y genera un mensaje personalizado listo para enviar a WhatsApp con los detalles de compra.
4. **Diseño Responsivo Total:**
   - Diseñado y optimizado para pantallas móviles, tablets y monitores de escritorio.
