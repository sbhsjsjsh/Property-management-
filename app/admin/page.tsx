'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  Building2, 
  ArrowLeft,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useAdminAuth } from '@/components/AdminAuthProvider';

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

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const deleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
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
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-neutral-500 mb-2">
              <Link href="/" className="hover:text-neutral-900 transition-colors flex items-center gap-1 text-xs font-medium uppercase tracking-wider">
                <ArrowLeft className="w-3 h-3" />
                Back to Site
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Property Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-4 py-3 text-neutral-500 hover:text-neutral-900 font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <Link 
              href="/admin/add" 
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10"
            >
              <Plus className="w-4 h-4" />
              Add New Property
            </Link>
          </div>
        </div>

        {/* Stats / Controls */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8 w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1">Total Listings</span>
              <span className="text-2xl font-bold text-neutral-900 tabular-nums">{properties.length}</span>
            </div>
            <div className="h-10 w-px bg-neutral-100" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1">Active</span>
              <span className="text-2xl font-bold text-neutral-900 tabular-nums">{properties.length}</span>
            </div>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Filter by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
              <span className="text-neutral-400 text-sm font-medium">Loading inventory...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="px-6 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Property</th>
                    <th className="px-6 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Location</th>
                    <th className="px-6 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest">Details</th>
                    <th className="px-6 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest text-right">Actions</th>
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
                          className="hover:bg-neutral-50/50 transition-colors"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden relative shrink-0">
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
                              <span className="font-semibold text-neutral-900">{property.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-neutral-500 text-sm">{property.location}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-neutral-900 font-medium tabular-nums">{property.price}</span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3 text-xs text-neutral-400 tabular-nums">
                              <span>{property.bedrooms} BR</span>
                              <span>·</span>
                              <span>{property.bathrooms} BA</span>
                              <span>·</span>
                              <span>{property.area}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link 
                                href={`/admin/edit/${property.id}`}
                                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-neutral-100 shadow-sm shadow-transparent hover:shadow-neutral-200/20"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Link>
                              <button 
                                onClick={() => deleteProperty(property.id)}
                                disabled={deletingId === property.id}
                                className="p-2 text-neutral-400 hover:text-red-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-neutral-100 shadow-sm shadow-transparent hover:shadow-neutral-200/20 disabled:opacity-50"
                              >
                                {deletingId === property.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-24 text-center">
                          <p className="text-neutral-400 text-sm">No properties found.</p>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
