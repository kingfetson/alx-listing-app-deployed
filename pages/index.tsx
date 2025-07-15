import { useState } from "react";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";
import PropertyCard from "@/components/PropertyCard";
import Pill from "@/components/Pill";

const filters = ["Top Villa", "Self Checkin", "Free Parking", "Beachfront", "Pet Friendly"];

export default function Home() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredProperties = PROPERTYLISTINGSAMPLE.filter((property) =>
    activeCategories.length === 0 ||
    activeCategories.some((cat) => property.category.includes(cat))
  );

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Hero */}
      <section
        className="bg-cover bg-center py-32 text-white text-center rounded-lg mt-6"
        style={{ backgroundImage: `url('https://example.com/hero.jpg')` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Find your favorite place here!</h1>
        <p className="text-xl mt-4">The best prices for over 2 million properties worldwide.</p>
      </section>

      {/* Filter Pills */}
      <section className="my-8 flex flex-wrap gap-3 justify-center">
        {filters.map((label: string) => (
          <Pill
            key={label}
            label={label}
            active={activeCategories.includes(label)}
            onClick={() => toggleCategory(label)}
          />
        ))}
      </section>

      {/* Listings */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProperties.map((property: PropertyProps, idx: number) => (
          <PropertyCard key={idx} property={property} />
        ))}
      </section>
    </div>
  );
}