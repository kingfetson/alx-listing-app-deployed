// components/property/ReviewSection.tsx
import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: number;
  comment: string;
  author?: string;
  date?: string;
}

interface ReviewSectionProps {
  propertyId: number;
}

export default function ReviewSection({ propertyId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="text-gray-800">{review.comment}</p>
              {review.author && (
                <p className="text-sm text-gray-500 mt-1">— {review.author}</p>
              )}
              {review.date && (
                <p className="text-xs text-gray-400">{review.date}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
