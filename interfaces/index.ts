export interface PropertyProps {
  name?: string; // made optional for Zillow compatibility
  address?: {
    state?: string;
    city?: string;
    country?: string;
  };
  rating?: number;
  category?: string[];
  price?: number;
  offers?: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image?: string; // your own format
  imgSrc?: string; // Zillow image key
  discount?: string;
}
