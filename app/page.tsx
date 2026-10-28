'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

export default function Home() {
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
      <Hero />
      
      <section id="listings" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
              Featured Collections
            </h2>
            <p className="text-neutral-500 text-lg">
              Explore our curated selection of high-end residences across the most desirable locations.
            </p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            <span className="text-neutral-400 text-sm font-medium">Curating listings...</span>
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
              <div className="text-xl font-bold tracking-tight mb-6">DELICACY PROPERTY</div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                The pinnacle of high-end real estate, delivering exceptional living experiences through curated design and unparalleled service.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Company</h4>
                <ul className="flex flex-col gap-4 text-neutral-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Services</h4>
                <ul className="flex flex-col gap-4 text-neutral-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Property Management</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Investments</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Valuation</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-xs text-neutral-500 uppercase tracking-widest font-medium">
            <span>© 2026 Delicacy Property. All Rights Reserved.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
