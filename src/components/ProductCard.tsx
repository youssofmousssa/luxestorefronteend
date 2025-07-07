import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star, Sparkles } from 'lucide-react';
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
      className="product-card-enhanced group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col space-y-2">
          {product.isNew && (
            <span className="badge-enhanced bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>NEW</span>
            </span>
          )}
          {product.isSale && discount > 0 && (
            <span className="badge-enhanced bg-gradient-to-r from-rose-500 to-rose-600">
              -{discount}%
            </span>
          )}
        </div>

        {/* Enhanced Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 z-20 favorite-button-enhanced ${
            isFavorite ? 'text-rose-400 bg-white/20 scale-110' : 'text-white/60'
          }`}
        >
          <Heart className={`w-4 h-4 lg:w-5 lg:h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Enhanced Product Image Container */}
        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl mb-4 lg:mb-6 aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Enhanced Quick Actions Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
          }`}>
            <div className="flex items-center space-x-4">
              <button
                onClick={addToCart}
                className="action-button-enhanced bg-primary text-black hover:scale-110"
              >
                <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
              <Link
                to={`/products/${product.id}`}
                className="action-button-enhanced bg-white text-black hover:scale-110"
              >
                <Eye className="w-5 h-5 lg:w-6 lg:h-6" />
              </Link>
            </div>
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={addToCart}
            className="lg:hidden absolute bottom-3 right-3 bg-primary text-black p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mobile-touch-target"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Enhanced Product Info */}
        <div className="space-y-3 lg:space-y-4 px-1">
          <div className="flex items-center justify-between">
            <p className="text-primary/80 text-xs lg:text-sm uppercase tracking-wider font-bold">{product.category}</p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 lg:w-4 lg:h-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-white/20'
                  }`}
                />
              ))}
              <span className="text-white/50 text-xs lg:text-sm ml-2">({product.reviews})</span>
            </div>
          </div>
          
          <h3 className="text-white font-bold text-base lg:text-lg xl:text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {/* Enhanced Price Display */}
          <div className="flex items-end justify-between">
            <div className="price-container-enhanced">
              <span className="text-primary font-bold text-lg lg:text-xl xl:text-2xl">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-white/40 line-through text-sm lg:text-base ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Enhanced Colors and Sizes */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex space-x-2">
                {product.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="color-swatch-enhanced"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-white/60 text-sm font-medium">+{product.colors.length - 4}</span>
                )}
              </div>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="text-white/60 text-sm lg:text-base font-medium">
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
