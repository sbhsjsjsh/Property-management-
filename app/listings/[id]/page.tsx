'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Heart,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Property } from '@/lib/types';

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) throw new Error('Property not found');
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6 text-center px-6">
        <h1 className="text-xl font-bold text-neutral-950 uppercase tracking-widest">Asset Not Found</h1>
        <Link href="/listings" className="text-[10px] font-bold text-neutral-400 hover:text-neutral-950 flex items-center gap-2 uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-3 h-3" />
          Back to Available Property
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <div className="mb-6">
          <Link href="/listings" className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <ArrowLeft className="w-3 h-3" />
            Back to Available Property
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-neutral-100 rounded text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{property.type}</span>
                <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-[0.2em]">{property.location}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-neutral-950 tracking-tighter leading-none">
                {property.name}
              </h1>
            </div>
            
            <div className="flex flex-col md:items-end gap-1 shrink-0">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Market Valuation</span>
              <span className="text-3xl font-bold text-neutral-950 tabular-nums tracking-tighter">
                {property.price}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image Section - Compacted aspect */}
        <div className="relative aspect-[21/8] w-full rounded-2xl overflow-hidden bg-neutral-100 mb-8 shadow-xl">
          {property.image ? (
            <Image 
              src={property.image} 
              alt={property.name} 
              fill 
              className="object-cover" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-200 flex items-center justify-center">
              <span className="text-neutral-300 font-bold uppercase tracking-[0.4em] text-sm">Marquee Asset</span>
            </div>
          )}
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-neutral-950 hover:text-white transition-all">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-neutral-950 hover:text-white transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-neutral-50">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Bedrooms</span>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-neutral-950" />
                  <span className="text-lg font-bold tabular-nums">{property.bedrooms}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Bathrooms</span>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-neutral-950" />
                  <span className="text-lg font-bold tabular-nums">{property.bathrooms}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Area</span>
                <div className="flex items-center gap-2">
                  <Maximize className="w-4 h-4 text-neutral-950" />
                  <span className="text-lg font-bold tabular-nums">{property.area}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-neutral-950 uppercase tracking-[0.2em]">The Narrative</h3>
              <p className="text-md text-neutral-500 leading-relaxed font-medium">
                {property.description}
              </p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-neutral-50">
                <h3 className="text-xs font-bold text-neutral-950 uppercase tracking-[0.2em]">Curated Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl">
                      <div className="w-1 h-1 bg-neutral-900 rounded-full" />
                      <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Lead Form */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-neutral-950 rounded-3xl p-6 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h3 className="text-md font-bold tracking-tight uppercase">Schedule Visit</h3>
                </div>
                
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-md font-bold uppercase tracking-widest">Lead Registered</h4>
                    <p className="text-neutral-400 text-xs font-medium leading-relaxed px-4">
                      A senior advisor will contact you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-2 text-[9px] font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                    >
                      New Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquiry} className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="FULL NAME"
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:border-white/20 transition-colors text-[10px] font-bold uppercase tracking-widest placeholder:text-neutral-600"
                    />
                    <input 
                      type="email" 
                      placeholder="PROFESSIONAL EMAIL"
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:border-white/20 transition-colors text-[10px] font-bold uppercase tracking-widest placeholder:text-neutral-600"
                    />
                    <input 
                      type="tel" 
                      placeholder="CONTACT NUMBER"
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:border-white/20 transition-colors text-[10px] font-bold uppercase tracking-widest placeholder:text-neutral-600"
                    />
                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 bg-white text-neutral-950 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      {formStatus === 'submitting' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        'Request Prospectus'
                      )}
                    </button>
                    <p className="text-[8px] text-neutral-600 uppercase tracking-widest text-center mt-4 italic">
                      Private data is processed under the RERA Privacy Charter.
                    </p>
                  </form>
                )}
              </div>

              <div className="p-6 border border-neutral-100 rounded-3xl space-y-5">
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Advisor Connect</h4>
                <div className="space-y-4">
                  <a href="tel:+919876543210" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-950 group-hover:text-white transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">Direct Line</div>
                      <div className="text-[11px] font-bold text-neutral-950">+91 9876 543 210</div>
                    </div>
                  </a>
                  <a href="mailto:concierge@delicacy.in" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-950 group-hover:text-white transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">Email Concierge</div>
                      <div className="text-[11px] font-bold text-neutral-950 uppercase tracking-tight">concierge@delicacy.in</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
