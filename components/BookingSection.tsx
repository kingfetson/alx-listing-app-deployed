import { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
  id: number;
  user: string;
  date: string;
  nights: number;
}

export default function BookingSection({ propertyId }: { propertyId: number }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings?propertyId=${propertyId}`);
        setBookings(
          response.data.sort(
            (a: Booking, b: Booking) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
      } catch (error: any) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [propertyId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Bookings</h2>
      {error && <p className="text-red-600">{error}</p>}
      {loading ? (
        <div className="animate-pulse text-gray-400">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-2">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-3 rounded">
              <p><strong>User:</strong> {booking.user}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Nights:</strong> {booking.nights}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}