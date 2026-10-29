'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import { ArrowRight, Loader2, Award, Users, Map } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

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
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      // Show only top 3 as featured on home page
      setFeaturedProperties(data.slice(0, 3));
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

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Services/Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-900">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 uppercase tracking-tight">Luxury Excellence</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                We provide unparalleled access to the most exclusive real estate opportunities across the Indian subcontinent.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-900">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 uppercase tracking-tight">Expert Advisory</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Our team of dedicated consultants offers bespoke advice tailored to the unique requirements of high-net-worth individuals.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-900">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 uppercase tracking-tight">Prime Locations</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                From Lutyens&apos; Delhi to the coast of Mumbai, we operate in the most prestigious pin codes in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-neutral-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
              Marquee Residences
            </h2>
            <p className="text-neutral-500 text-lg">
              A hand-picked selection of our most prestigious available properties.
            </p>
          </div>
          
          <Link 
            href="/listings" 
            className="group flex items-center gap-2 text-sm font-bold text-neutral-900 uppercase tracking-widest hover:text-neutral-500 transition-colors"
          >
            View All Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
            <span className="text-neutral-400 text-sm font-medium">Curating marquee selection...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Brand Statement Section */}
      <section className="bg-neutral-950 py-32 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight max-w-4xl text-wrap-balance">
              The Finest Luxury Properties, Defined by Excellence.
            </h2>
            <Link 
              href="/listings"
              className="px-10 py-5 bg-white text-neutral-950 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all"
            >
              Explore Available Collection
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white text-neutral-900 py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
            <div className="max-w-xs">
              <div className="text-xl font-bold tracking-tight mb-6 uppercase">DELICACY PROPERTY</div>
              <p className="text-neutral-500 text-sm leading-relaxed">
                The pinnacle of high-end real estate, delivering exceptional living experiences through curated design and unparalleled service.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-neutral-400">Pages</h4>
                <ul className="flex flex-col gap-4 text-neutral-600 text-sm">
                  <li><Link href="/" className="hover:text-neutral-950 transition-colors">Home</Link></li>
                  <li><Link href="/listings" className="hover:text-neutral-950 transition-colors">Available Properties</Link></li>
                  <li><Link href="/admin" className="hover:text-neutral-950 transition-colors">Admin Portal</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-neutral-400">Services</h4>
                <ul className="flex flex-col gap-4 text-neutral-600 text-sm">
                  <li><a href="#" className="hover:text-neutral-950 transition-colors">Portfolio Mgmt</a></li>
                  <li><a href="#" className="hover:text-neutral-950 transition-colors">Global Advisory</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between gap-6 text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
            <span>© 2026 Delicacy Property. Curating Excellence.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
