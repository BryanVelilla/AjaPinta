import { Product, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'la-iguana',
    name: 'La Iguana',
    subtitle: 'Fauna Caribe • Sucre',
    category: 'fauna',
    categoryLabel: 'Fauna Caribe',
    price: 45000,
    originalPrice: 52000,
    description: 'Guardián de los ríos y manglares sucreños. Su textura de escamas en relieve permite crear degradados vibrantes con verdes esmeralda, amarillos sol y turquesas de la ciénaga.',
    longDescription: 'Las iguanas verdes son uno de los animales más entrañables y representativos del ecosistema de las ciénagas y sabanas de Sucre. Esta pieza artística capta su porte orgulloso sobre un tronco tallado, con escamas marcadas que guían el pincel para un acabado digno de exposición.',
    image: '/iguana-lateral.jpg',
    gallery: [
      '/iguana-lateral.jpg',
      '/iguana-frontal.jpg',
      '/iguana-superior.jpg'
    ],
    badge: '¡Favorito infantil!',
    badgeColor: 'bg-tertiary-container',
    rating: 4.8,
    reviewsCount: 67,
    includedItems: [
      'Figura La Iguana del Caribe en yeso cerámico (20 x 10 cm)',
      '6 colores brillantes de alta pigmentación',
      '2 pinceles (delineador fino y plano suave)',
      'Guía didáctica de fauna sabanera de Sucre'
    ],
    dimensions: '20 x 10 x 8 cm',
    material: 'Yeso cerámico texturizado libre de impurezas',
    origin: 'San Marcos / San Jorge, Sucre',
    isFeatured: true,
  },
  {
    id: 'la-flor-del-bonche',
    name: 'La Flor del Bonche',
    subtitle: 'Flora Caribeña • Sucre',
    category: 'fauna',
    categoryLabel: 'Flora & Tradición',
    price: 46000,
    originalPrice: 54000,
    description: 'La flor insigne de los patios sabaneros y las polleras costeñas. Sus pétalos ondulados en relieve son ideales para pintar tonos carmesí, rosas vibrantes y pistilos dorados.',
    longDescription: 'El bonche (hibisco caribeño) es el adorno tradicional por excelencia en los bailes de cumbia, fandango y en los jardines coloniales de Sucre. Esta delicada pieza escultórica de pétalos abiertos rinde tributo a la alegría y feminidad caribeña, lista para convertirse en una joya decorativa pintada por ti.',
    image: '/flor-del-bonche-frontal.jpg',
    gallery: [
      '/flor-del-bonche-frontal.jpg',
      '/flor-del-bonche-superior.jpg'
    ],
    badge: '¡Edición Floral!',
    badgeColor: 'bg-secondary-container',
    rating: 4.9,
    reviewsCount: 84,
    includedItems: [
      'Figura La Flor del Bonche en relieve tridimensional (16 x 15 cm)',
      '6 témperas acrílicas vivas (incluye rojo carmesí, amarillo oro y verde hoja)',
      '2 pinceles de pelo suave para degradados y detalles',
      'Guía floral caribeña con técnicas de combinación de tonos'
    ],
    dimensions: '16 x 15 x 7 cm',
    material: 'Yeso cerámico de alta densidad con acabado aterciopelado',
    origin: 'Sincelejo, Sucre',
    isFeatured: true,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Camila Villalba',
    role: 'Mamá & Docente',
    city: 'Sincelejo, Sucre',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    text: 'Compré el Sombrero Vueltiao para pintarlo con mis dos hijos un domingo por la tarde. Fue una experiencia hermosa; las témperas son super cubrientes y el relieve de la figura ayuda muchísimo a que los niños no se salgan de las líneas. ¡Ya lo tenemos en la sala!',
    rating: 5,
    figurePurchased: 'Sombrero Vueltiao Zenú'
  },
  {
    id: 't-2',
    author: 'Andrés Felipe Martínez',
    role: 'Arquitecto e ilustrador',
    city: 'Barranquilla, Atlántico',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    text: 'La Casita Colonial tiene un nivel de detalle en las tejas y puertas que me dejó impresionado. El yeso cerámico tiene una densidad excelente y no se desmorona al aplicar capas aguadas. Una iniciativa cultural de 10 estrellas para Sucre.',
    rating: 5,
    figurePurchased: 'Casita Colonial Bahareque'
  },
  {
    id: 't-3',
    author: 'Mariana Gómez',
    role: 'Compradora para evento escolar',
    city: 'Montería, Córdoba',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    text: 'Pedimos 25 kits para una feria de emprendimiento y folclor. Llegaron perfectamente embalados sin un solo rasguño a Montería. El empaque y la atención por WhatsApp de los muchachos de ajá! pinta fue impecable.',
    rating: 5,
    figurePurchased: 'Kits para Eventos'
  }
];
