export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  numericPrice: number;
  type: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  amenities?: string[];
}
