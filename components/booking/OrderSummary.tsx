import React from "react";
import Image from "next/image";

interface BookingDetails {
  propertyName: string;
  startDate: string;
  totalNights: number;
  bookingFee: number;
  price: number;
  imageUrl?: string;
}

const OrderSummary: React.FC<{ bookingDetails: BookingDetails }> = ({ bookingDetails }) => {
  const {
    propertyName,
    startDate,
    totalNights,
    bookingFee,
    price,
    imageUrl = "https://via.placeholder.com/400x300", // fallback image
  } = bookingDetails;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Review Order Details</h2>

      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt={propertyName}
            fill
            className="object-cover rounded-md"
            sizes="128px"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold">{propertyName}</h3>
          <p className="text-sm text-gray-500">4.76 (345 reviews)</p>
          <p className="text-sm text-gray-500">
            {startDate} • {totalNights} Nights
          </p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <p>Booking Fee</p>
          <p>${bookingFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Subtotal</p>
          <p>${price.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-semibold text-base">
          <p>Grand Total</p>
          <p>${(bookingFee + price).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
