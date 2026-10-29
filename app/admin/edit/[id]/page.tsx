'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Property } from '@/lib/types';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Estate', 'Farmhouse', 'Plot'];

export default function EditProperty({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    numericPrice: 0,
    type: 'Apartment',
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    image: '',
    amenities: ['']
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) throw new Error('Property not found');
        const data = await res.json();
        setFormData({
          ...data,
          amenities: data.amenities && data.amenities.length > 0 ? data.amenities : [''],
          numericPrice: data.numericPrice || 0
        });
      } catch (err) {
        setError('Failed to load property data');
      } finally {
        setFetching(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'numericPrice' ? Number(value) : value
    }));
  };

  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData(prev => ({ ...prev, amenities: newAmenities }));
  };

  const addAmenity = () => {
    setFormData(prev => ({ ...prev, amenities: [...prev.amenities, ''] }));
  };

  const removeAmenity = (index: number) => {
    const newAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, amenities: newAmenities }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image is too large. Please select an image smaller than 10MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanedAmenities = formData.amenities.filter(a => a.trim() !== '');

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, amenities: cleanedAmenities })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/admin'), 1500);
      } else {
        const data = await res.json();
        setError(data.details ? `Failed to update property: ${data.details}` : (data.error || 'Failed to update property'));
      }
    } catch (err: any) {
      setError(`An unexpected error occurred: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <main className="min-h-screen bg-neutral-50/50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-48 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-neutral-200" />
          <span className="text-neutral-400 text-sm font-bold uppercase tracking-widest">Retrieving Asset...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50/50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/admin" className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors text-xs font-bold uppercase tracking-widest mb-4">
            <ArrowLeft className="w-3 h-3" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Refine Asset</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Primary Info */}
          <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 mb-8 uppercase tracking-tight">1. Architectural Identity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Property Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Skyline Heights Penthouse"
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Property Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-bold text-neutral-700 appearance-none"
                >
                  {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Location</label>
                <input 
                  type="text" 
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Worli, Mumbai"
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Price (Display Text)</label>
                <input 
                  type="text" 
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. ₹45.5 Cr"
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Numeric Price (For Sorting)</label>
                <input 
                  type="number" 
                  name="numericPrice"
                  required
                  value={formData.numericPrice}
                  onChange={handleInputChange}
                  placeholder="e.g. 455000000"
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-bold tabular-nums"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">The Narrative (Description)</label>
                <textarea 
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the property's unique vision and architectural excellence..."
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Details & Amenities */}
          <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 mb-8 uppercase tracking-tight">2. Specifications & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Bedrooms</label>
                <input 
                  type="number" 
                  name="bedrooms"
                  required
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-bold tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Bathrooms</label>
                <input 
                  type="number" 
                  name="bathrooms"
                  required
                  min="0"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-bold tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">Living Area (e.g. 4500 sqft)</label>
                <input 
                  type="text" 
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g. 4,500 sqft"
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-4 uppercase tracking-widest">Curated Amenities</label>
              <div className="space-y-3">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="flex gap-3">
                    <input 
                      type="text"
                      value={amenity}
                      onChange={(e) => handleAmenityChange(index, e.target.value)}
                      placeholder="e.g. Private Infinity Pool"
                      className="flex-1 px-6 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:border-neutral-900 transition-all text-sm font-medium"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeAmenity(index)}
                      className="p-3 text-neutral-300 hover:text-red-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={addAmenity}
                  className="flex items-center gap-2 text-xs font-bold text-neutral-900 uppercase tracking-widest mt-4 hover:text-neutral-500 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Amenity
                </button>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 mb-8 uppercase tracking-tight">3. Visual Asset</h2>
            
            {!formData.image ? (
              <div className="relative border-4 border-dashed border-neutral-50 rounded-[2rem] p-20 flex flex-col items-center justify-center text-center hover:border-neutral-100 transition-colors cursor-pointer group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-20 h-20 bg-neutral-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1 tracking-tight">Upload High-Res Visual</h3>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Max 10MB · Recommended 16:9 or 4:3</p>
              </div>
            ) : (
              <div className="relative rounded-[2rem] overflow-hidden aspect-video bg-neutral-100 shadow-xl">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
                <button 
                  type="button"
                  onClick={removeImage}
                  className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full text-neutral-900 shadow-lg hover:scale-110 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600 text-sm font-bold"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4 text-emerald-600 text-sm font-bold"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              Excellence Updated. Redirecting to Dashboard...
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading || success}
            className="w-full py-6 bg-neutral-950 text-white rounded-[2rem] font-bold text-lg hover:bg-neutral-800 transition-all shadow-2xl shadow-neutral-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Updating Asset...
              </>
            ) : (
              'Update Residence'
            )}
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}
