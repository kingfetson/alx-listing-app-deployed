import { PropertyProps } from "@/interfaces";

interface PropertyDetailProps {
  property: PropertyProps;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{property.name}</h1>
      <p className="text-gray-500">
        {property.address.city}, {property.address.state}, {property.address.country}
      </p>
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-96 object-cover rounded-lg shadow"
      />
      <div className="text-lg">
        <p className="text-green-600 font-bold">${property.price}/night</p>
        <p className="text-yellow-500">⭐ {property.rating}</p>
        <p className="mt-2 text-sm text-gray-700">Discount: {property.discount}</p>
        <div className="mt-4">
          <p><strong>Bed:</strong> {property.offers.bed}</p>
          <p><strong>Shower:</strong> {property.offers.shower}</p>
          <p><strong>Occupants:</strong> {property.offers.occupants}</p>
        </div>
        <div className="mt-4">
          <strong>Categories:</strong>
          <ul className="list-disc list-inside text-sm mt-1">
            {property.category.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
