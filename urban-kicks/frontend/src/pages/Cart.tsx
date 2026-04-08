import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { api } from '../lib/api';
import { useState } from 'react';

export default function Cart() {
  const { items, removeItem, updateQty, total, taxAmount, grandTotal } = useCartStore();
  const { accessToken, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    if (!shippingAddress) {
      setError('Please enter a shipping address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.orders.create(
        {
          items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
          shippingAddress,
        },
        accessToken!
      );
      useCartStore.getState().clear();
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.message ?? 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <span className="text-7xl">🛒</span>
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-400">Add some shoes to get started!</p>
        <Link to="/catalog" className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">👟</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold mt-0.5">GH₵ {item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center font-bold text-lg"
                    >−</button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center font-bold text-lg"
                    >+</button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-sm text-red-400 hover:text-red-600 transition-colors"
                    >Remove</button>
                  </div>
                </div>
                <div className="text-right font-bold text-gray-900 shrink-0">
                  GH₵ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">GH₵ {total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>VAT + Levies (20% GRA)</span>
                  <span>GH₵ {taxAmount().toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>GH₵ {grandTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <textarea
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  placeholder="e.g. 14 Liberation Road, Accra, Ghana"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Placing Order…' : isAuthenticated() ? 'Place Order' : 'Login to Checkout'}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Taxes calculated per Ghana Revenue Authority guidelines
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
