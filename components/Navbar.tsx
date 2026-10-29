'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Building2, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-500">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-b border-neutral-100" />
      
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-3 text-xl font-bold tracking-tighter text-neutral-950 whitespace-nowrap shrink-0 group"
        >
          <div className="w-10 h-10 bg-neutral-950 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span>DELICACY</span>
            <span className="text-[10px] font-bold text-neutral-400 tracking-[0.3em] mt-1">PROPERTY</span>
          </div>
        </Link>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/listings" className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-950 transition-colors">Available Property</Link>
          <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-950 transition-colors">Contact</a>
        </nav>

        {/* Zone 3: Action */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-neutral-400">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Global Access</span>
          </div>
          
          <Link 
            href="/listings" 
            className="hidden md:block px-8 py-3.5 text-[10px] font-bold text-white bg-neutral-950 rounded-full hover:bg-neutral-800 transition-all uppercase tracking-widest shadow-xl shadow-neutral-950/10"
          >
            Explore Property
          </Link>
          
          <button 
            className="md:hidden p-2 text-neutral-950 hover:bg-neutral-50 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 px-6 py-12 flex flex-col gap-10 shadow-2xl"
        >
          <Link href="/listings" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-neutral-950 tracking-tighter">Available Property</Link>
          <a href="#" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-neutral-950 tracking-tighter">Contact</a>
          
          <Link 
            href="/listings" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-5 bg-neutral-950 text-white rounded-2xl font-bold uppercase tracking-widest text-xs"
          >
            Explore Property
          </Link>
        </motion.div>
      )}
    </header>
  );
}
