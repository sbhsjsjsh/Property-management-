'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { ArrowRight, Award, ShieldCheck, Gem } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Expertise Section - Compacted py-32 -> py-20 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-5 p-8 bg-neutral-50 rounded-[2rem] hover:bg-neutral-950 hover:text-white transition-all duration-500 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-neutral-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Curated Portfolios</h3>
              <p className="text-neutral-500 group-hover:text-neutral-400 text-xs leading-relaxed">
                Hand-picked residences with exceptional architectural merit and investment potential.
              </p>
            </div>
            <div className="flex flex-col gap-5 p-8 bg-neutral-50 rounded-[2rem] hover:bg-neutral-950 hover:text-white transition-all duration-500 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-neutral-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Verified Legacies</h3>
              <p className="text-neutral-500 group-hover:text-neutral-400 text-xs leading-relaxed">
                Rigorous due diligence on every listing, ensuring complete compliance with RERA standards.
              </p>
            </div>
            <div className="flex flex-col gap-5 p-8 bg-neutral-50 rounded-[2rem] hover:bg-neutral-950 hover:text-white transition-all duration-500 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-neutral-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Concierge Service</h3>
              <p className="text-neutral-500 group-hover:text-neutral-400 text-xs leading-relaxed">
                White-glove service handling every detail of your acquisition journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Expanded for better content flow */}
      <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.4em] mb-4 block">Market Leadership</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-8">
                The Mumbai <br/> Luxury Standard.
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-10">
                Delicacy Property operates at the intersection of local heritage and global excellence. Our expertise spans Mumbai&apos;s most sought-after postcodes, from the historic charm of South Mumbai to the burgeoning skylines of the North.
              </p>
              <Link 
                href="/listings" 
                className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest bg-white text-neutral-950 px-8 py-4 rounded-full hover:bg-neutral-200 transition-all"
              >
                Enter Portfolio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
              <div className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Success Rate</div>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">₹500Cr+</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Avg Transaction</div>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Design Awards</div>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Global Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
