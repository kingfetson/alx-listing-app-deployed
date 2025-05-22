// pages/index.tsx

import React from 'react';
import { CardProps } from '../interfaces';

export default function Card({ title, description, imageSrc }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
