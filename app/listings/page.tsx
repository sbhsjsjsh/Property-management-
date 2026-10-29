'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Search, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '@/lib/types';

const CATEGORIES = ['All', 'Penthouse', 'Estate', 'Villa', 'Apartment', 'Farmhouse'];
const SORT_OPTIONS = [
  { label: 'Recently Added', value: 'newest' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
];

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
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

  const filteredProperties = properties
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.type === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
      if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
      return 0; // Default: list order
    });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Compressed Header */}
      <section className="bg-neutral-950 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white blur-[120px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.3em]">Available Residences</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter max-w-2xl leading-none">
              Marquee Residences.
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {/* Compact Filters Bar */}
        <div className="bg-white border border-neutral-100 rounded-3xl p-3 md:p-4 shadow-xl shadow-neutral-200/50 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by micro-market, area, or landmark..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all placeholder:text-neutral-300"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group shrink-0 w-full lg:w-48">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none pl-6 pr-12 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-[10px] font-bold text-neutral-700 uppercase tracking-widest focus:outline-none hover:bg-neutral-100 transition-all cursor-pointer"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-50">
            {CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === category ? 'bg-neutral-900 text-white shadow-lg' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
              <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Scanning Residences...</span>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.3em]">
                  {filteredProperties.length} Records Found
                </h2>
              </div>

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
                      <p className="text-neutral-300 text-xl font-bold italic tracking-tight uppercase">No Matches Found.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
