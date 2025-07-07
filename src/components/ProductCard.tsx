
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  sizes?: string[];
  colors?: string[];
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { dispatch } = useCart();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.sizes?.[0],
        color: product.colors?.[0],
      }
    });
    
    dispatch({ type: 'OPEN_CART' });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="product-card enhanced-card relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Compact Badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              NEW
            </span>
          )}
          {product.isSale && discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Compact Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 z-20 glass-button p-1.5 sm:p-2 transition-all duration-200 mobile-touch-target ${
            isFavorite ? 'text-red-400 bg-white/15' : 'text-white/50 hover:text-red-400 hover:bg-white/10'
          }`}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Optimized Product Image */}
        <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Refined Quick Actions Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center space-x-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
          }`}>
            <button
              onClick={addToCart}
              className="glass-button p-2 sm:p-2.5 hover:bg-primary hover:text-black transition-all duration-200 transform hover:scale-105 mobile-touch-target"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <Link
              to={`/products/${product.id}`}
              className="glass-button p-2 sm:p-2.5 hover:bg-white hover:text-black transition-all duration-200 transform hover:scale-105 mobile-touch-target"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={addToCart}
            className="sm:hidden absolute bottom-2 right-2 bg-primary text-black p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mobile-touch-target"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact Product Info */}
        <div className="space-y-1.5 sm:space-y-2 px-0.5">
          <p className="text-white/50 text-xs uppercase tracking-wide font-medium">{product.category}</p>
          <h3 className="text-white font-semibold text-sm sm:text-base group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {/* Compact Rating and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs sm:text-sm ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-white/20'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-white/50 text-xs">({product.reviews})</span>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1.5">
                <span className="text-primary font-bold text-base sm:text-lg">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-white/30 line-through text-xs">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Compact Colors and Sizes */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center justify-between pt-1.5">
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-white/50 text-xs font-medium">+{product.colors.length - 3}</span>
                )}
              </div>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="text-white/50 text-xs">
                  {product.sizes.length} size{product.sizes.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
