export interface PropertyProps {
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: string;
}

// Add this for API usage in detail page
export interface Property {
  id: number;
  title: string;
  location: string;
  category: string;
  price: number | string;
  image: string;
  description: string;
  rating: number;
}