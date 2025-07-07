
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import type { Product } from '../components/ProductCard';

// Mock product data - in real app this would come from API
const productData: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Elegance Silk Dress',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop',
    ],
    category: 'Dresses',
    rating: 4.8,
    reviews: 124,
    description: 'This luxurious silk dress embodies elegance and sophistication. Crafted from the finest mulberry silk, it features a flattering A-line silhouette that gracefully flows from the fitted bodice to the knee-length hem. Perfect for cocktail parties, dinner dates, or any special occasion where you want to make a lasting impression.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    isNew: true,
    isSale: true,
  },
  // Add more products as needed
};

const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Premium Leather Handbag',
    price: 459.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop',
    category: 'Accessories',
    rating: 4.9,
    reviews: 89,
    description: 'Handcrafted Italian leather handbag',
    colors: ['Brown', 'Black', 'Tan'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Designer Wool Coat',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=600&fit=crop',
    category: 'Outerwear',
    rating: 4.7,
    reviews: 156,
    description: 'Elegant wool coat with premium craftsmanship',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Camel', 'Black', 'Grey'],
    isSale: true,
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id && productData[id]) {
      const productInfo = productData[id];
      setProduct(productInfo);
      setSelectedSize(productInfo.sizes?.[0] || '');
      setSelectedColor(productInfo.colors?.[0] || '');
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <h2 className="text-white text-xl mb-4">Product not found</h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
      }
    });
    
    for (let i = 1; i < quantity; i++) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: selectedSize,
          color: selectedColor,
        }
      });
    }
    
    dispatch({ type: 'OPEN_CART' });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-white/60 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link 
          to="/products" 
          className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="glass-card p-4 rounded-2xl">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`glass-card p-2 rounded-xl transition-all duration-300 ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex space-x-2">
              {product.isNew && (
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW ARRIVAL
                </span>
              )}
              {product.isSale && discount > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  SAVE {discount}%
                </span>
              )}
            </div>

            {/* Title and Category */}
            <div>
              <p className="text-white/60 text-sm uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-white/60">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-white/50 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Size</h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-black font-medium'
                          : 'border-white/20 text-white hover:border-white/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Color: {selectedColor}</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center glass-card rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white/10 transition-colors rounded-l-xl"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="px-6 py-3 text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white/10 transition-colors rounded-r-xl"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <span className="text-white/60">
                  Total: <span className="text-primary font-bold">${(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`glass-button p-3 transition-all duration-300 ${
                  isFavorite ? 'text-red-400' : 'text-white/60 hover:text-red-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="glass-button p-3 text-white/60 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
