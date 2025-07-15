// components/HeroSection.tsx
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export const HeroSection = ({ title, subtitle, imageUrl }: HeroSectionProps) => (
  <div className="relative h-96 w-full rounded-lg mt-6 overflow-hidden">
    <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover"
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      }}
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{subtitle}</p>
    </div>
  </div>
);