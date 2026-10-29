'use client';

import { motion } from 'motion/react';
import { Bed, Bath, Maximize, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/types';

export default function PropertyCard({ property }: { property: Property }) {
  const hasImage = property.image && property.image !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500"
    >
      <Link href={`/listings/${property.id}`} className="block">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-200">
              <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Premium Estate</span>
              <div className="mt-2 w-12 h-0.5 bg-neutral-300 rounded-full" />
            </div>
          )}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-neutral-900 uppercase tracking-wider">
            {property.type}
          </div>
          <div className="absolute top-4 right-4 bg-neutral-950 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
            {property.price}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 mb-1.5 font-bold uppercase tracking-[0.2em]">
            <MapPin className="w-2.5 h-2.5" />
            <span>{property.location}</span>
          </div>
          
          <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors leading-tight">
            {property.name}
          </h3>
          
          <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed font-medium">
            {property.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.25 text-neutral-600">
                <Bed className="w-3 h-3" />
                <span className="text-[10px] font-bold tabular-nums">{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1.25 text-neutral-600">
                <Bath className="w-3 h-3" />
                <span className="text-[10px] font-bold tabular-nums">{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1.25 text-neutral-600">
                <Maximize className="w-3 h-3" />
                <span className="text-[10px] font-bold tabular-nums">{property.area}</span>
              </div>
            </div>
            
            <div className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
