import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

const HERO_TAGS = ['Sneakers', 'Formal', 'Athletic', 'Sandals'];

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  stockQuantity: number;
}

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.products.list().then((data: any) => {
      setFeatured((data as Product[]).slice(0, 4));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, #6366f1 0%, transparent 40%)`
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              🇬🇭 Premium Footwear in Ghana
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
              Step Into<br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Style
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-md mb-8 leading-relaxed">
              Discover Ghana's premier online shoe destination. Sneakers, formals, and athletic footwear delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/catalog"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                Shop Now →
              </Link>
              <Link
                to="/register"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full transition-all backdrop-blur-sm"
              >
                Create Account
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-8 justify-center md:justify-start">
              {HERO_TAGS.map(tag => (
                <Link
                  key={tag}
                  to={`/catalog?search=${tag.toLowerCase()}`}
                  className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          {/* Decorative Shoe Graphic */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full blur-3xl" />
              <div className="absolute inset-8 bg-gradient-to-br from-white/10 to-white/5 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-9xl" role="img" aria-label="shoe">👟</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Products', value: '500+' },
            { label: 'Brands', value: '30+' },
            { label: 'Customers', value: '10k+' },
            { label: 'Delivery Cities', value: '20+' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-black text-blue-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Featured Picks</h2>
            <p className="text-gray-500 mt-1">Curated styles just for you</p>
          </div>
          <Link to="/catalog" className="text-blue-600 font-semibold hover:underline text-sm">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">👟</p>
            <p className="font-medium">Products coming soon. Check back later!</p>
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to find your perfect pair?</h2>
          <p className="text-blue-100 mb-8 text-lg">Explore hundreds of styles from top brands, with fast delivery across Ghana.</p>
          <Link
            to="/catalog"
            className="inline-block bg-white text-blue-600 font-bold px-10 py-3.5 rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            Browse Catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
