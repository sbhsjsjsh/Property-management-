'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0"
        >
          <Building2 className="w-6 h-6 text-neutral-900" />
          <span>DELICACY PROPERTY</span>
        </Link>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">Home</Link>
          <Link href="/listings" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">Available Properties</Link>
        </nav>

        {/* Zone 3: Action */}
        <div className="flex items-center gap-4 shrink-0">
          <Link 
            href="/listings" 
            className="hidden md:block px-6 py-2.5 text-xs font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0"
          >
            View Collection
          </Link>
          
          <button 
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-neutral-100 px-6 py-8 flex flex-col gap-6"
        >
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-neutral-900">Home</Link>
          <Link href="/listings" onClick={() => setIsOpen(false)} className="text-lg font-medium text-neutral-900">Available Properties</Link>
          <Link 
            href="/listings" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-4 bg-neutral-900 text-white rounded-xl font-semibold"
          >
            View Collection
          </Link>
        </motion.div>
      )}
    </header>
  );
}
