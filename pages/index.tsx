import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyProps } from "@/interfaces";
import PropertyCard from "@/components/PropertyCard";
import Pill from "@/components/Pill";

const filters = ["Top Villa", "Self Checkin", "Free Parking", "Beachfront", "Pet Friendly"];

export default function Home() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_RAPIDAPI_URL}/search_polygon`, {
          params: {
            polygon: "34.03959576441558 -118.50636536779786,34.0418716916327 -118.50276047888184,34.042440663894304 -118.49846894445801,34.04201393505594 -118.49417741003418,34.04087598099002 -118.4897142142334,34.03945351693672 -118.48525101843262,34.03788877892429 -118.48095948400879,34.03618175908096 -118.47683961096192,34.034190192514366 -118.47271973791504,34.031629538228394 -118.46962983312989,34.02835747861639 -118.4677415579834,34.02465847668084 -118.46671158972168,34.02081703478521 -118.46636826696778,34.01697541902413 -118.46636826696778,34.01341821237762 -118.4673982352295,34.011283816847104 -118.47100312414551,34.01057233974687 -118.47563798132325,34.01043004361143 -118.47992951574707,34.01071463564384 -118.48439271154786,34.01156840601794 -118.48868424597168,34.01270675316253 -118.49297578039551,34.01398737545716 -118.49709565344239,34.01555255425154 -118.50104386511231,34.01754455825562 -118.50464875402832,34.02039019717532 -118.50756699743653,34.02352028980117 -118.50962693395996,34.02707707311613 -118.51065690222168,34.03063370735633 -118.50997025671387,34.034190192514366 -118.5091119498291,34.03774652858273 -118.50825364294434,34.03959576441558 -118.50636536779786",
            output: "json",
            status: "forSale",
            sortSelection: "priorityscore",
            listing_type: "by_agent",
            doz: "any"
          },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST!
          }
        });

        // You may need to adjust this depending on Zillow's response shape
        setProperties(response.data.results);
      } catch (error) {
        console.error("Failed to fetch properties from Zillow API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) =>
    activeCategories.length === 0 ||
    activeCategories.some((cat) => property.category?.includes(cat))
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
      {loading ? (
        <p className="text-center text-gray-500">Loading properties...</p>
      ) : (
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property: PropertyProps, idx: number) => (
            <PropertyCard key={idx} property={property} />
          ))}
        </section>
      )}
    </div>
  );
}
