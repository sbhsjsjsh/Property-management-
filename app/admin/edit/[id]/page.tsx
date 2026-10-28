'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

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
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    image: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) throw new Error('Property not found');
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        setError('Failed to load property data');
      } finally {
        setFetching(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'bedrooms' || name === 'bathrooms' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
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

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
          <span className="text-neutral-400 text-sm font-medium">Fetching details...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50/50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/admin" className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors text-xs font-medium uppercase tracking-wider mb-4">
            <ArrowLeft className="w-3 h-3" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Edit Property</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Property Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Skyline Heights Penthouse"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Location</label>
                <input 
                  type="text" 
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Worli, Mumbai"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Price</label>
                <input 
                  type="text" 
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. ₹45.5 Cr or ₹8.5 L"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Description</label>
                <textarea 
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the property's unique features..."
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Bedrooms</label>
                <input 
                  type="number" 
                  name="bedrooms"
                  required
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Bathrooms</label>
                <input 
                  type="number" 
                  name="bathrooms"
                  required
                  min="0"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Area (e.g. 4,500 sqft)</label>
                <input 
                  type="text" 
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g. 4,500 sqft"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-100 rounded-2xl p-8 shadow-sm">
            <label className="block text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wide">Property Media</label>
            
            {!formData.image ? (
              <div className="relative border-2 border-dashed border-neutral-100 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-neutral-200 transition-colors cursor-pointer group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-6 h-6 text-neutral-400" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1">Click to upload image</h3>
                <p className="text-xs text-neutral-400">PNG, JPG or WEBP (Max 5MB recommended)</p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-neutral-100">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
                <button 
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-neutral-900 shadow-lg hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600 text-sm font-medium"
            >
              <CheckCircle2 className="w-4 h-4" />
              Property updated successfully! Redirecting...
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading || success}
            className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/10 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating Property...
              </>
            ) : (
              'Update Property'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
