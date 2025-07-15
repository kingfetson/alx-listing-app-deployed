// src/interfaces/PropertyCardData.ts

export interface PropertyCardData {
  id: string;
  title: string;
  location: string;
  shortAddress?: string;
  category: string;
  price: number; // Normalized to always be a number
  formattedPrice?: string;
  rating: number;
  reviewCount?: number;
  image: string;
  isFeatured?: boolean;
  isAvailable?: boolean;
  discountBadge?: string;
  amenities?: {
    bedrooms?: number;
    bathrooms?: number;
    guests?: number;
  };
  host?: {
    name?: string;
    isSuperhost?: boolean;
  };
}