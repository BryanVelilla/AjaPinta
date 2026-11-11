export type CategoryType = 'todos' | 'zenu' | 'arquitectura' | 'fauna' | 'combos';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  model3d?: string;
  badge?: string;
  badgeColor?: string;
  rating: number;
  reviewsCount: number;
  includedItems: string[];
  dimensions: string;
  material: string;
  origin: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  varnishOption?: boolean; // Barniz sellador brillante
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  city: string;
  avatar: string;
  text: string;
  rating: number;
  figurePurchased: string;
}

