'use client';

import { motion } from 'motion/react';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import Image from 'next/image';

interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

export default function PropertyCard({ property }: { property: Property }) {
  const hasImage = property.image && property.image !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        {hasImage ? (
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300">
            <span className="text-neutral-400 text-sm font-medium">Property Preview</span>
            <div className="mt-2 w-12 h-1 bg-neutral-400/20 rounded-full" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-neutral-900 shadow-sm">
          {property.price}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wider">
          <MapPin className="w-3 h-3 text-neutral-400" />
          <span>{property.location}</span>
        </div>
        
        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">
          {property.name}
        </h3>
        
        <p className="text-sm text-neutral-500 line-clamp-2 mb-6 leading-relaxed">
          {property.description}
        </p>

        <div className="flex items-center gap-6 pt-6 border-t border-neutral-50">
          <div className="flex items-center gap-2 text-neutral-600">
            <Bed className="w-4 h-4" />
            <span className="text-xs font-semibold tabular-nums">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <Bath className="w-4 h-4" />
            <span className="text-xs font-semibold tabular-nums">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 ml-auto">
            <Maximize className="w-4 h-4" />
            <span className="text-xs font-semibold tabular-nums">{property.area}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
