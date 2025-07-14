import React from "react";
import { PropertyProps } from "@/interfaces";

const PropertyCard: React.FC<{ property: PropertyProps }> = ({ property }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={property.image} alt={property.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{property.name}</h2>
        <p className="text-sm text-gray-600">
          {property.address.city}, {property.address.country}
        </p>
        <div className="mt-2 text-blue-500 font-semibold">
          ${property.price.toLocaleString()}
        </div>
        <div className="text-sm text-yellow-600 mt-1">⭐ {property.rating}</div>
      </div>
    </div>
  );
};

export default PropertyCard;