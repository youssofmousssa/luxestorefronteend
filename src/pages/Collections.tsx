
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Filter, Grid, List, Star, Heart, ShoppingBag } from 'lucide-react';

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const collections = [
    {
      id: 1,
      name: 'Evening Elegance',
      category: 'evening-wear',
      description: 'Sophisticated pieces for special occasions',
      image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop',
      itemCount: 24,
      priceRange: '$200 - $800',
      featured: true
    },
    {
      id: 2,
      name: 'Casual Luxury',
      category: 'casual-luxury',
      description: 'Elevated everyday essentials',
      image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=300&fit=crop',
      itemCount: 18,
      priceRange: '$120 - $450',
      featured: false
    },
    {
      id: 3,
      name: 'Premium Accessories',
      category: 'accessories',
      description: 'Curated luxury accessories and jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      itemCount: 32,
      priceRange: '$50 - $600',
      featured: true
    },
    {
      id: 4,
      name: 'Business Professional',
      category: 'professional',
      description: 'Polished looks for the modern professional',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      itemCount: 15,
      priceRange: '$180 - $520',
      featured: false
    },
    {
      id: 5,
      name: 'Weekend Comfort',
      category: 'casual',
      description: 'Relaxed luxury for leisure moments',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      itemCount: 21,
      priceRange: '$80 - $280',
      featured: false
    },
    {
      id: 6,
      name: 'Statement Pieces',
      category: 'statement',
      description: 'Bold designs that make an impression',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
      itemCount: 12,
      priceRange: '$300 - $1200',
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Collections', count: collections.length },
    { id: 'evening-wear', name: 'Evening Wear', count: 1 },
    { id: 'casual-luxury', name: 'Casual Luxury', count: 1 },
    { id: 'accessories', name: 'Accessories', count: 1 },
    { id: 'professional', name: 'Professional', count: 1 },
    { id: 'casual', name: 'Casual', count: 1 },
    { id: 'statement', name: 'Statement', count: 1 }
  ];

  const filteredCollections = selectedCategory === 'all' 
    ? collections 
    : collections.filter(collection => collection.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Collections
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover carefully curated collections that define luxury and style. 
              Each piece tells a story of craftsmanship and elegance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and View Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Collections Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "space-y-6"
        }>
          {filteredCollections.map((collection) => (
            <Card key={collection.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {collection.featured && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{collection.name}</CardTitle>
                  <Badge variant="outline">{collection.itemCount} items</Badge>
                </div>
                <CardDescription className="text-gray-600">
                  {collection.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    {collection.priceRange}
                  </span>
                  <Button className="group-hover:bg-primary/90 transition-colors">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Collections?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each collection is thoughtfully curated to represent the pinnacle of style, 
              quality, and craftsmanship in luxury fashion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Excellence</h3>
              <p className="text-gray-600">
                Every piece is hand-selected by our style experts for uncompromising quality and design.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
              <p className="text-gray-600">
                We source only the finest materials and work with renowned craftspeople worldwide.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timeless Appeal</h3>
              <p className="text-gray-600">
                Our collections transcend trends, offering pieces you'll treasure for years to come.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
