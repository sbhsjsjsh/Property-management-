'use client';

import { motion } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-48 flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
            Exquisite Living Redefined
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-4xl text-wrap-balance leading-[1.1]">
            Own Your Dream Piece of India.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl text-wrap-balance">
            Delicacy Property curates premium residences across India&apos;s most iconic skylines, from luxury farmhouses in Delhi to sea-facing penthouses in Mumbai.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
            <Link 
              href="/listings" 
              className="group px-8 py-4 bg-white text-neutral-950 rounded-full font-semibold flex items-center gap-2 hover:bg-neutral-200 transition-all duration-300"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
