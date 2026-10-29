'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  Building2, 
  ArrowLeft,
  LogOut,
  LayoutGrid,
  List,
  Check,
  X as CloseIcon
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useAdminAuth } from '@/components/AdminAuthProvider';
import { Property } from '@/lib/types';

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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

  const handleDeleteClick = (id: string) => {
    setConfirmingDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmingDeleteId(null);
  };

  const executeDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
        setConfirmingDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-50/50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-neutral-500 mb-2">
              <Link href="/" className="hover:text-neutral-900 transition-colors flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em]">
                <ArrowLeft className="w-3 h-3" />
                Back to Site
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-neutral-950 tracking-tighter">
              Asset Management
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold text-neutral-400 hover:text-neutral-950 uppercase tracking-widest transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Terminate Session</span>
            </button>
            <Link 
              href="/admin/add" 
              className="flex items-center gap-2 px-6 py-3.5 bg-neutral-950 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-950/10"
            >
              <Plus className="w-3.5 h-3.5" />
              Onboard Residence
            </Link>
          </div>
        </div>

        {/* Stats / Controls */}
        <div className="bg-white border border-neutral-100 rounded-3xl p-5 mb-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-6 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <div className="flex flex-col shrink-0">
              <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-[0.2em] mb-1">Total Assets</span>
              <span className="text-xl font-bold text-neutral-950 tabular-nums">{properties.length}</span>
            </div>
            <div className="h-8 w-px bg-neutral-100 shrink-0" />
            <div className="flex flex-col shrink-0">
              <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-[0.2em] mb-1">Active Listings</span>
              <span className="text-xl font-bold text-neutral-950 tabular-nums">{properties.length}</span>
            </div>
            
            <div className="h-8 w-px bg-neutral-100 shrink-0" />
            
            <div className="flex items-center p-1 bg-neutral-50 rounded-xl border border-neutral-100 shrink-0">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-300 hover:text-neutral-500'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-300 hover:text-neutral-500'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-300" />
            <input 
              type="text" 
              placeholder="FILTER ASSETS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all placeholder:text-neutral-200"
            />
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 bg-white border border-neutral-100 rounded-3xl">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
            <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Scanning Assets...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'list' ? (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-sm"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-100">
                        <th className="px-6 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Residence</th>
                        <th className="px-6 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Type</th>
                        <th className="px-6 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Location</th>
                        <th className="px-6 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Valuation</th>
                        <th className="px-6 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Specifications</th>
                        <th className="px-6 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      <AnimatePresence>
                        {filteredProperties.length > 0 ? (
                          filteredProperties.map((property) => (
                            <motion.tr 
                              key={property.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="hover:bg-neutral-50/50 transition-colors group"
                            >
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden relative shrink-0">
                                    {property.image ? (
                                      <img 
                                        src={property.image} 
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                                        <Building2 className="w-5 h-5 text-neutral-300" />
                                      </div>
                                    )}
                                  </div>
                                  <span className="font-bold text-neutral-950">{property.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <span className="px-3 py-1 bg-neutral-100 rounded-full text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{property.type}</span>
                              </td>
                              <td className="px-6 py-5">
                                <span className="text-neutral-500 text-sm font-medium">{property.location}</span>
                              </td>
                              <td className="px-6 py-5">
                                <span className="text-neutral-900 font-bold tabular-nums">{property.price}</span>
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3 text-xs text-neutral-400 font-bold tabular-nums">
                                  <span>{property.bedrooms} BR</span>
                                  <span>·</span>
                                  <span>{property.bathrooms} BA</span>
                                  <span>·</span>
                                  <span>{property.area}</span>
                                </div>
                              </td>
                              <td className="px-6 py-5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {confirmingDeleteId === property.id ? (
                                    <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => executeDelete(property.id)}
                                        disabled={deletingId === property.id}
                                        className="px-3 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition-all flex items-center gap-1 uppercase tracking-wider disabled:opacity-50"
                                      >
                                        {deletingId === property.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                        Confirm
                                      </button>
                                      <button 
                                        onClick={cancelDelete}
                                        className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                                      >
                                        <CloseIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <Link 
                                        href={`/admin/edit/${property.id}`}
                                        className="p-2 text-neutral-400 hover:text-neutral-950 hover:bg-white rounded-lg transition-all border border-transparent hover:border-neutral-100 shadow-sm shadow-transparent hover:shadow-neutral-200/20"
                                      >
                                        <Edit2 className="w-4 h-4" />
                                      </Link>
                                      <button 
                                        onClick={() => handleDeleteClick(property.id)}
                                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-neutral-100 shadow-sm shadow-transparent hover:shadow-neutral-200/20"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-24 text-center">
                              <p className="text-neutral-300 text-xs font-bold uppercase tracking-widest italic">No residences onboarded.</p>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <motion.div 
                        key={property.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-500 flex flex-col"
                      >
                        <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
                          {property.image ? (
                            <img 
                              src={property.image} 
                              alt="" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-50 text-neutral-200">
                              <Building2 className="w-12 h-12" />
                            </div>
                          )}
                          
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-neutral-950 shadow-sm">
                            {property.price}
                          </div>
                          
                          {/* Overlay Controls */}
                          <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                            {confirmingDeleteId === property.id ? (
                              <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 shadow-2xl">
                                <span className="text-[10px] font-bold text-neutral-950 uppercase tracking-[0.2em]">Confirm Deletion?</span>
                                <div className="flex gap-2 w-full">
                                  <button 
                                    onClick={() => executeDelete(property.id)}
                                    disabled={deletingId === property.id}
                                    className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-bold text-[10px] flex items-center justify-center gap-1 disabled:opacity-50"
                                  >
                                    {deletingId === property.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                    DELETE
                                  </button>
                                  <button 
                                    onClick={cancelDelete}
                                    className="flex-1 py-3 bg-neutral-50 text-neutral-900 rounded-2xl font-bold text-[10px]"
                                  >
                                    NO
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Link 
                                  href={`/admin/edit/${property.id}`}
                                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-neutral-950 hover:scale-110 transition-transform shadow-lg"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </Link>
                                <button 
                                  onClick={() => handleDeleteClick(property.id)}
                                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 hover:scale-110 transition-transform shadow-lg"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-[0.2em]">{property.location}</span>
                            <span className="text-[9px] font-bold text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{property.type}</span>
                          </div>
                          <h3 className="text-lg font-bold text-neutral-950 mb-4 line-clamp-1">{property.name}</h3>
                          <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center gap-4 text-[10px] text-neutral-400 font-bold tabular-nums">
                            <span>{property.bedrooms} BR</span>
                            <span>·</span>
                            <span>{property.bathrooms} BA</span>
                            <span className="ml-auto">{property.area}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-32 text-center bg-white border border-neutral-100 rounded-[2.5rem]">
                      <p className="text-neutral-300 text-xs font-bold uppercase tracking-widest italic">No matching residences found.</p>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <Footer />
    </main>
  );
}
