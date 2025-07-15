import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingSection from '@/components/BookingSection';
import ReviewSection from '@/components/ReviewSection';
// Define Property type locally if not exported from @/interfaces
type Property = {
  id: number | string;
  title: string;
  location: string;
  description: string;
  price: number | string;
  image: string;
  rating: number;
  category: string;
};

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const propertyId = typeof id === 'string' ? parseInt(id, 10) : NaN;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNaN(propertyId)) return;

    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products?count=10`,
          {
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
              'X-RapidAPI-Host': process.env.RAPIDAPI_HOST!,
            },
          }
        );

        const allProducts = response.data;

        const matched = allProducts.find(
          (item: any) => parseInt(item.id) === propertyId
        );

        if (!matched) {
          setError('Property not found.');
        } else {
          const adapted: Property = {
            id: matched.id,
            title: matched.name,
            location: matched.category || 'Unknown location',
            description: matched.description || 'No description available',
            price: matched.price || 'N/A',
            image: matched.image || '/default.jpg',
            rating: matched.rating || 4.5,
            category: ''
          };

          setProperty(adapted);
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to load property.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading property...</p>;
  if (error || !property) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-96 object-cover rounded-lg"
      />
      <p className="text-lg">{property.description}</p>
      <p className="text-green-600 font-bold">${property.price}/night</p>
      <p className="text-yellow-500">⭐ {property.rating}</p>

      <BookingSection propertyId={propertyId} />
      <ReviewSection propertyId={propertyId} />
    </div>
  );
}