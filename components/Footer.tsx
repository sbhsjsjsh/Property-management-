'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-neutral-900 py-16 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <div className="text-xl font-bold tracking-tight uppercase group cursor-default">
              DELICACY <span className="text-neutral-400">PROPERTY</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              The benchmark for excellence in the Mumbai luxury real estate market. We curate legacies for the discerning class.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] mb-6 uppercase tracking-[0.2em] text-neutral-400">Navigation</h4>
            <ul className="flex flex-col gap-3 text-neutral-600 text-xs font-bold uppercase tracking-wider">
              <li><Link href="/listings" className="hover:text-neutral-950 transition-colors">The Portfolio</Link></li>
              <li><Link href="/admin" className="hover:text-neutral-950 transition-colors text-neutral-300">Private Access</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] mb-6 uppercase tracking-[0.2em] text-neutral-400">Legal</h4>
            <ul className="flex flex-col gap-3 text-neutral-600 text-xs font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-neutral-950 transition-colors">Privacy Charter</a></li>
              <li><a href="#" className="hover:text-neutral-950 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neutral-950 transition-colors">RERA Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-neutral-50 flex flex-col md:flex-row justify-between gap-6 text-[10px] text-neutral-300 font-bold uppercase tracking-[0.2em]">
          <span>© 2026 Delicacy Property. Curating Mumbai Legacies.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-neutral-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
