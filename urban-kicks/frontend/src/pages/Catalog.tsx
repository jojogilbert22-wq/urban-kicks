import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  stockQuantity: number;
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get('search') ?? '');

  useEffect(() => {
    const q = searchParams.get('search') ?? '';
    setQuery(q);
    setLoading(true);
    api.products.list(q || undefined).then((data: any) => {
      setProducts(data as Product[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { search: query } : {});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Shoe Catalog</h1>
          <p className="text-gray-500">Explore our full collection of premium footwear</p>
          <form onSubmit={handleSearch} className="mt-6 flex gap-3 max-w-lg">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search shoes, brands, categories..."
              className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setSearchParams({}); }}
                className="text-sm text-gray-400 hover:text-gray-600 px-2"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-400">Try a different search term or browse all shoes.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
