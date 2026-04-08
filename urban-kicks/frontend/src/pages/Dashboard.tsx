import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuthStore } from '../store/authStore';

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  product: { name: string; imageUrl?: string };
}

interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalAmount: number;
  taxAmount: number;
  shippingAddress?: string;
  orderItems: OrderItem[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  const { accessToken, email, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    api.orders.list(accessToken!).then((data: any) => {
      setOrders(data as Order[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl font-black">
              {email?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-black">My Dashboard</h1>
              <p className="text-blue-100 mt-0.5">{email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/catalog" className="bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm font-semibold px-5 py-2 rounded-full transition">
              Shop More
            </Link>
            <button onClick={handleLogout} className="bg-white text-blue-600 text-sm font-semibold px-5 py-2 rounded-full hover:bg-blue-50 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length },
            { label: 'Items Purchased', value: orders.reduce((s, o) => s + o.orderItems.reduce((ss, i) => ss + i.quantity, 0), 0) },
            { label: 'Total Spent', value: `GH₵ ${orders.reduce((s, o) => s + o.totalAmount, 0).toFixed(2)}` },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-sm">
              <p className="text-2xl font-black text-blue-600">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order History</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-28 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-5xl mb-4">📦</p>
            <h3 className="text-lg font-bold text-gray-700">No orders yet</h3>
            <p className="text-gray-400 mt-1">Start shopping to see your orders here.</p>
            <Link to="/catalog" className="inline-block mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition">
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">Order #{order.id}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {new Date(order.orderDate).toLocaleDateString('en-GH', { dateStyle: 'medium' })}
                      {order.shippingAddress && ` · ${order.shippingAddress}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900">GH₵ {order.totalAmount.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">incl. GH₵ {order.taxAmount.toFixed(2)} tax</p>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {order.orderItems.map(item => (
                    <div key={item.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 text-sm">
                      <span>{item.product.name}</span>
                      <span className="text-gray-400">×{item.quantity}</span>
                      <span className="text-blue-600 font-semibold">GH₵ {(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
