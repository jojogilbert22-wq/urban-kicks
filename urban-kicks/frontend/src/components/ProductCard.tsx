import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    stockQuantity: number;
  };
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = product.stockQuantity > 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-square bg-gray-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-grow">{product.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            GH₵ {product.price.toFixed(2)}
          </span>
          {!inStock && (
            <span className="text-xs text-red-500 font-medium">Out of stock</span>
          )}
        </div>
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl ?? '',
            })
          }
          disabled={!inStock}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
