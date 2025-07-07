
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
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
    <div className="min-h-screen pt-14 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Luxury <span className="text-gradient">Collection</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Discover our curated selection of premium fashion and accessories
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="glass-card p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col space-y-4 lg:flex-row lg:gap-4 lg:items-center lg:justify-between lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-full lg:max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-3 text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="glass-button px-4 py-3 space-x-2 text-sm sm:text-base"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-input px-4 py-3 text-sm sm:text-base"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-black">
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`glass-button p-3 ${viewMode === 'grid' ? 'text-primary' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`glass-button p-3 ${viewMode === 'list' ? 'text-primary' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Category</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                          selectedCategory === category
                            ? 'bg-primary text-black font-medium'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Price Range</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-white/60 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Quick Filters</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-white/60 text-sm sm:text-base">
                      <input type="checkbox" className="accent-primary" />
                      <span>On Sale</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white/60 text-sm sm:text-base">
                      <input type="checkbox" className="accent-primary" />
                      <span>New Arrivals</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white/60 text-sm sm:text-base">
                      <input type="checkbox" className="accent-primary" />
                      <span>Free Shipping</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <p className="text-white/60 text-sm sm:text-base">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-primary hover:text-primary/80 text-sm font-medium self-start sm:self-auto"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Products Grid - Mobile Full Width */}
        <div className={`grid gap-4 sm:gap-6 md:gap-8 ${viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="glass-card p-8 sm:p-12 max-w-md mx-auto">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">No products found</h3>
              <p className="text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">
                Try adjusting your search criteria or browse all products
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange([0, 2000]);
                }}
                className="btn-primary"
              >
                View All Products
              </button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && filteredProducts.length >= 8 && (
          <div className="text-center mt-8 sm:mt-12">
            <button className="btn-secondary px-6 sm:px-8 py-3">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
