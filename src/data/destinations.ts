import type { Category, CountryId, Destination } from "@/types/trip";

export const destinations: Destination[] = [
  {
    id: "china",
    country: "China",
    featuredCity: "Shanghai",
    tagline: "Old lanes, new skylines, and dumplings at dawn.",
    image: "/images/dest-china.jpg",
    imageAlt: "Illuminated Shanghai Bund waterfront buildings at night",
  },
  {
    id: "japan",
    country: "Japan",
    featuredCity: "Kyoto",
    tagline: "Quiet temple lanes and standing bars after dark.",
    image: "/images/dest-japan.jpg",
    imageAlt: "Red torii gates lining a hillside path at Fushimi Inari in Kyoto",
  },
  {
    id: "india",
    country: "India",
    featuredCity: "Jaipur",
    tagline: "Pink sandstone bazaars and craft workshops.",
    image: "/images/dest-india.jpg",
    imageAlt: "Lake Pichola and historic lakeside buildings in Udaipur, India",
  },
  {
    id: "malaysia",
    country: "Malaysia",
    featuredCity: "Penang",
    tagline: "Murals, hawker stalls and mangrove channels.",
    image: "/images/dest-malaysia.jpg",
    imageAlt: "Colourful dessert stall with shaved ice in George Town, Penang",
  },
  {
    id: "indonesia",
    country: "Indonesia",
    featuredCity: "Ubud",
    tagline: "Terraced rice fields and volcano sunrises.",
    image: "/images/dest-indonesia.jpg",
    imageAlt: "Green rice terraces in Ubud",
  },
  {
    id: "thailand",
    country: "Thailand",
    featuredCity: "Chiang Mai",
    tagline: "Canal boats, market kitchens and island water.",
    image: "/images/dest-thailand.jpg",
    imageAlt: "Vendor boats crowded along a canal floating market in Thailand",
  },
];

export const countryIds: CountryId[] = destinations.map((d) => d.id);

export const categories: Category[] = [
  { id: "food-drink", label: "Food & drink" },
  { id: "culture", label: "Culture & craft" },
  { id: "adventure", label: "Adventure" },
  { id: "nature", label: "Nature" },
  { id: "nightlife", label: "Nightlife" },
];
