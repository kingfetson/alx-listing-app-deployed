import React from "react";
import { PropertyProps } from "@/interfaces";

const PropertyCard: React.FC<{ property: PropertyProps }> = ({ property }) => {
  const image = property.image ?? property.imgSrc ?? "https://via.placeholder.com/300x200";
  const name = property.name ?? "Unnamed Property";
  const city = property.address?.city ?? "Unknown City";
  const country = property.address?.country ?? "Unknown Country";
  const price = property.price ?? 0;
  const rating = property.rating ?? 4.5; // Default rating if not provided

  return (
    <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
  src={image}
  alt={name}
  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x200")}
  className="w-full h-auto max-h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105 rounded-t"
/>

      <div className="p-4">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-sm text-gray-600">
          {city}, {country}
        </p>
        <div className="mt-2 text-blue-500 font-semibold">
          ${price.toLocaleString()}
        </div>
        <div className="text-sm text-yellow-600 mt-1">⭐ {rating}</div>
      </div>
    </div>
  );
};

export default PropertyCard;
