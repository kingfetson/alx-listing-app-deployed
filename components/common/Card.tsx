import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  imageUrl: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, imageUrl, description }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image
          src={imageUrl || "https://via.placeholder.com/400x225"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
