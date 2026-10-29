'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { Search, Loader2, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

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

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="bg-neutral-50 pt-32 pb-20 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight">
              Available Properties
            </h1>
            <p className="text-neutral-500 text-lg max-w-2xl">
              Browse our complete portfolio of premium residences across India. Use the search and filters to find your perfect match.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by city, area or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex items-center gap-2 px-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:border-neutral-200 transition-all">
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
            </button>
            <div className="ml-auto md:ml-0 text-sm font-medium text-neutral-400 tabular-nums">
              Showing {filteredProperties.length} properties
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
            <span className="text-neutral-400 text-sm font-medium">Loading collection...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-32 text-center"
                >
                  <p className="text-neutral-400 text-lg">No properties found matching your search.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </section>

      <footer className="bg-neutral-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
            <div className="max-w-xs">
              <div className="text-xl font-bold tracking-tight mb-6 uppercase">DELICACY PROPERTY</div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                The pinnacle of high-end real estate, delivering exceptional living experiences through curated design and unparalleled service.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Company</h4>
                <ul className="flex flex-col gap-4 text-neutral-400 text-sm">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Legal</h4>
                <ul className="flex flex-col gap-4 text-neutral-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-xs text-neutral-500 uppercase tracking-widest font-medium">
            <span>© 2026 Delicacy Property. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
