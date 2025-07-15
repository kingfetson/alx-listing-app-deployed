import { useEffect, useState } from 'react';
import axios from 'axios';

interface Review {
  id: number;
  reviewer: string;
  comment: string;
  rating: number;
  propertyId: number;
}

export default function ReviewSection({ propertyId }: { propertyId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewer, setReviewer] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews?propertyId=${propertyId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newReview = { reviewer, comment, rating, propertyId };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, newReview);
      setReviews((prev) => [...prev, response.data]);
      setReviewer('');
      setComment('');
      setRating(5);
      setSubmitError('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitError('Failed to submit review.');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-3 rounded">
              <p><strong>{review.reviewer}</strong> rated ⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleReviewSubmit} className="space-y-4 border-t pt-4">
        <h3 className="text-lg font-medium">Leave a Review</h3>

        <input
          type="text"
          placeholder="Your Name"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 rounded"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? 's' : ''}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>

        {submitError && <p className="text-red-500">{submitError}</p>}
      </form>
    </div>
  );
}