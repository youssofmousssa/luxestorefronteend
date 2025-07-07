import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal, Star, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../components/ProductCard';

// Mock product data
const allProducts: Product[] = [
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
  {
    id: '5',
    name: 'Classic Blazer',
    price: 389.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
    category: 'Blazers',
    rating: 4.5,
    reviews: 92,
    description: 'Timeless blazer for professional and casual wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey', 'White'],
  },
  {
    id: '6',
    name: 'Diamond Earrings',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop',
    category: 'Jewelry',
    rating: 4.9,
    reviews: 45,
    description: 'Stunning diamond stud earrings',
    colors: ['Silver', 'Gold'],
    isNew: true,
  },
  {
    id: '7',
    name: 'Luxury Watch',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=600&fit=crop',
    category: 'Accessories',
    rating: 4.8,
    reviews: 67,
    description: 'Swiss-made luxury timepiece',
    colors: ['Silver', 'Gold', 'Rose Gold'],
    isSale: true,
  },
  {
    id: '8',
    name: 'Evening Gown',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1566479179817-c7e8c2e9a8df?w=400&h=600&fit=crop',
    category: 'Dresses',
    rating: 4.7,
    reviews: 134,
    description: 'Glamorous evening gown for special events',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Emerald', 'Burgundy'],
  },
];

const categories = ['All', 'Dresses', 'Accessories', 'Outerwear', 'Blazers', 'Jewelry'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Keep original order for featured
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="min-h-screen pt-14 sm:pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Enhanced Hero Section */}
        <div className="py-8 sm:py-12 md:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              Luxury <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Discover our curated selection of premium fashion and accessories
            </p>
            <div className="flex items-center justify-center space-x-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-white/60 ml-2">4.8 • 10,000+ Reviews</span>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="glass-card p-4 sm:p-6 lg:p-8 mb-8 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-full lg:max-w-lg">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for luxury items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input-enhanced w-full pl-12 pr-4 py-4 text-base rounded-2xl border-2 border-transparent focus:border-primary/30 transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-primary transition-colors w-5 h-5" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-yellow-300/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`glass-button-enhanced px-6 py-4 space-x-2 text-base font-medium transition-all duration-300 ${showFilters ? 'bg-primary/20 text-primary' : ''}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-input-enhanced px-6 py-4 text-base rounded-xl font-medium"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`glass-button-enhanced p-4 transition-all duration-300 ${viewMode === 'grid' ? 'text-primary bg-primary/20' : ''}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`glass-button-enhanced p-4 transition-all duration-300 ${viewMode === 'list' ? 'text-primary bg-primary/20' : ''}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Filters Panel */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Categories */}
                <div>
                  <h3 className="text-white font-bold mb-4 text-lg">Category</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-primary to-yellow-400 text-black shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-white font-bold mb-4 text-lg">Price Range</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary h-2 bg-white/10 rounded-lg"
                    />
                    <div className="flex justify-between text-white/70 font-medium">
                      <span className="bg-white/10 px-3 py-1 rounded-lg">${priceRange[0]}</span>
                      <span className="bg-white/10 px-3 py-1 rounded-lg">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h3 className="text-white font-bold mb-4 text-lg">Quick Filters</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 text-white/70 font-medium cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" className="accent-primary w-4 h-4" />
                      <span>On Sale</span>
                    </label>
                    <label className="flex items-center space-x-3 text-white/70 font-medium cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" className="accent-primary w-4 h-4" />
                      <span>New Arrivals</span>
                    </label>
                    <label className="flex items-center space-x-3 text-white/70 font-medium cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" className="accent-primary w-4 h-4" />
                      <span>Free Shipping</span>
                    </label>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-white font-bold mb-4 text-lg">Rating</h3>
                  <div className="space-y-3">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center space-x-3 text-white/70 font-medium cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" className="accent-primary w-4 h-4" />
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                          ))}
                          <span>& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-white/80 font-medium text-lg">
              <span className="text-white font-bold">{filteredProducts.length}</span> of {allProducts.length} products
            </p>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-primary hover:text-primary/80 font-medium text-sm bg-primary/10 px-3 py-1 rounded-full transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Products Grid */}
        <div className={`grid gap-6 md:gap-8 mb-12 ${viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-card p-12 max-w-lg mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-yellow-400/20 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-white/50" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">No products found</h3>
              <p className="text-white/60 mb-6 text-lg">
                Try adjusting your search criteria or browse all products
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange([0, 2000]);
                }}
                className="btn-primary px-8 py-4 text-lg font-semibold"
              >
                View All Products
              </button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && filteredProducts.length >= 8 && (
          <div className="text-center pb-16">
            <button className="btn-secondary px-8 py-4 text-lg font-medium">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
