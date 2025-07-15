// components/PropertyGrid.tsx
import PropertyCard from "./PropertyCard";
import { PropertyListing} from "@/interfaces/PropertyListing";
import { PropertyCardData } from "@/interfaces/PropertyCardData";

interface PropertyGridProps {
  properties: PropertyListing[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  columns?: 1 | 2 | 3 | 4;
}

export const PropertyGrid = ({ 
  properties, 
  loading = false, 
  error = null, 
  onRetry,
  columns = 4 
}: PropertyGridProps) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  const normalizePropertyData = (property: PropertyListing): PropertyCardData => {
    const priceValue = typeof property.price === 'number' 
      ? property.price 
      : property.price.amount;
      
    const formattedPrice = typeof property.price === 'number'
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(property.price)
      : property.price.formatted || '';

    return {
      id: property.id,
      title: property.title,
      location: `${property.address.city}, ${property.address.country}`,
      shortAddress: property.address.street,
      category: property.category[0] || '',
      price: priceValue,
      formattedPrice,
      rating: property.rating,
      reviewCount: property.reviewCount,
      image: property.images.find(img => img.isPrimary)?.url || property.images[0]?.url || '',
      isFeatured: property.isFeatured,
      isAvailable: property.isAvailable,
      discountBadge: property.discount?.badgeText,
      amenities: {
        bedrooms: property.amenities.bedrooms,
        bathrooms: property.amenities.bathrooms,
        guests: property.amenities.occupancy
      },
      host: property.host ? {
        name: property.host.name,
        isSuperhost: property.host.isSuperhost
      } : undefined
    };
  };

  if (loading) {
    return (
      <div className={`grid gap-6 ${gridClasses[columns]}`}>
        {[...Array(8)].map((_, index) => (
          <div key={`skeleton-${index}`} className="animate-pulse">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"></div>
            <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <svg 
          className="mx-auto h-12 w-12 text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading properties</h3>
        <p className="mt-1 text-sm text-red-500">{error}</p>
        <button 
          onClick={onRetry || (() => window.location.reload())}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No properties found</h3>
        <p className="mt-1 text-sm text-gray-500">
          {properties.length === 0 
            ? "Try adjusting your search filters" 
            : "We couldn't find any properties matching your criteria"}
        </p>
      </div>
    );
  }

  return (
    <section className={`grid gap-6 ${gridClasses[columns]}`}>
      {properties.map((property) => {
        const cardData = normalizePropertyData(property);
        return (
          <PropertyCard 
            key={`${property.id}-${property.title}`}
            property={cardData}
          />
        );
      })}
    </section>
  );
};