// src/interfaces/PropertyListing.ts

export interface PropertyAddress {
  street?: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyPrice {
  amount: number;
  currency?: string;
  formatted?: string;
  originalAmount?: number;
  isDiscounted?: boolean;
}

export interface PropertyAmenities {
  bedrooms: number;
  bathrooms: number;
  squareFootage?: number;
  occupancy?: number;
  amenities?: string[];
}

export interface PropertyImage {
  url: string;
  altText?: string;
  isPrimary?: boolean;
  caption?: string;
}

export interface PropertyHost {
  id: string;
  name: string;
  avatar?: string;
  isSuperhost?: boolean;
  rating?: number;
}

export interface PropertyListing {
  id: string;
  title: string;
  description?: string;
  address: PropertyAddress;
  category: string[];
  rating: number;
  reviewCount?: number;
  price: number | PropertyPrice;
  amenities: PropertyAmenities;
  images: PropertyImage[];
  host?: PropertyHost;
  isFeatured?: boolean;
  isAvailable?: boolean;
  discount?: {
    amount: number;
    percentage?: number;
    badgeText?: string;
  };
  metadata?: {
    createdAt: string;
    updatedAt: string;
    views?: number;
    bookings?: number;
  };
  policies?: {
    cancellation?: string;
    checkIn?: string;
    checkOut?: string;
    petsAllowed?: boolean;
  };
}