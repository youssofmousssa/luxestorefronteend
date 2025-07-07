
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../components/ProductCard';

// Mock data for featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Elegance Silk Dress',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    category: 'Dresses',
    rating: 4.8,
    reviews: 124,
    description: 'Luxurious silk dress perfect for special occasions',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    isNew: true,
    isSale: true,
  },
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
  {
    id: '4',
    name: 'Luxury Cashmere Scarf',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1601762761893-c7d5e5e8c8c1?w=400&h=600&fit=crop',
    category: 'Accessories',
    rating: 4.6,
    reviews: 73,
    description: '100% pure cashmere scarf',
    colors: ['Cream', 'Grey', 'Black', 'Rose'],
  },
];

const collections = [
  {
    name: 'Evening Wear',
    image: 'https://images.unsplash.com/photo-1566479179817-c7e8c2e9a8df?w=600&h=800&fit=crop',
    description: 'Sophisticated pieces for special occasions',
  },
  {
    name: 'Casual Luxury',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
    description: 'Elevated everyday essentials',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop',
    description: 'Complete your look with premium accessories',
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop',
      title: 'Luxury Fashion Redefined',
      subtitle: 'Discover our exclusive collection of premium clothing and accessories',
    },
    {
      image: 'https://images.unsplash.com/photo-1445384763658-0400939829cd?w=1920&h=1080&fit=crop',
      title: 'Timeless Elegance',
      subtitle: 'Curated pieces that transcend seasons and trends',
    },
    {
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&h=1080&fit=crop',
      title: 'Crafted to Perfection',
      subtitle: 'Every piece tells a story of exceptional craftsmanship',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in hero-title">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 sm:mb-8 animate-fade-in hero-subtitle">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in">
                <Link to="/products" className="btn-primary inline-flex items-center justify-center group" onClick={scrollToTop}>
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/collections" className="btn-secondary inline-flex items-center justify-center" onClick={scrollToTop}>
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Authentic Luxury',
                description: 'Only genuine designer pieces from verified sources',
              },
              {
                icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Free Shipping',
                description: 'Complimentary shipping on all orders over $200',
              },
              {
                icon: <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Easy Returns',
                description: '30-day hassle-free return policy',
              },
              {
                icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: 'Premium Service',
                description: 'Dedicated customer support for all your needs',
              },
            ].map((feature, index) => (
              <div key={index} className="glass-card p-4 sm:p-6 text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-primary mb-3 sm:mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Featured <span className="text-gradient">Collections</span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Discover our most coveted pieces, carefully selected for their exceptional quality and timeless appeal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center group" onClick={scrollToTop}>
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Explore our curated collections designed for every occasion and style preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {collections.map((collection, index) => (
              <Link
                key={index}
                to={`/collections/${collection.name.toLowerCase().replace(' ', '-')}`}
                className="group block relative overflow-hidden rounded-xl sm:rounded-2xl"
                onClick={scrollToTop}
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-72 sm:h-96 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">{collection.name}</h3>
                  <p className="text-white/80 text-sm">{collection.description}</p>
                  <div className="mt-3 sm:mt-4 inline-flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
                    Explore Collection
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Stay in the Loop
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Be the first to know about new arrivals, exclusive offers, and fashion insights from our luxury collection.
            </p>
            <div className="flex flex-col space-y-3 sm:space-y-4 md:flex-row md:space-y-0 md:space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="glass-input flex-1 py-3 px-4 sm:px-6 text-center md:text-left"
              />
              <button className="btn-primary px-6 sm:px-8 py-3">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
