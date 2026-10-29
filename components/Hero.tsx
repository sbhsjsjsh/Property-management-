'use client';

import { motion } from 'motion/react';
import { ArrowRight, Search, MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-white">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-neutral-300" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
                Available Mumbai Properties
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-950 leading-[0.95] max-w-xl">
              Curating <br/>
              <span className="text-neutral-400 italic">Mumbai&apos;s Finest</span> <br/>
              Residences.
            </h1>
            
            <p className="text-lg text-neutral-500 max-w-md leading-relaxed">
              Delicacy Property provides a bespoke gateway to the most prestigious real estate opportunities across Mumbai&apos;s iconic coastline and skyline.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link 
                href="/listings" 
                className="group px-8 py-4 bg-neutral-950 text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all text-xs uppercase tracking-widest shadow-2xl shadow-neutral-900/20"
              >
                Explore Property
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-neutral-100">
              <div>
                <div className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tighter">500+</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Marquee Listings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tighter">₹2.5T+</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Asset Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tighter">12</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Micro-markets</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-900/10">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
                alt="Luxury Estate" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Featured Asset</span>
                  <span className="text-xs font-bold px-2 py-1 bg-white/20 rounded-lg">Mumbai</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-1">The Obsidian Penthouse</h3>
                <p className="text-sm font-medium opacity-70">A legacy residence in the city&apos;s heart.</p>
              </div>
            </div>
            
            {/* Decor Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-neutral-950 rounded-3xl flex items-center justify-center text-white -rotate-12 shadow-2xl z-20">
              <Building2 className="w-12 h-12" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
