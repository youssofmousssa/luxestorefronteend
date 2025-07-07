
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Sparkles, ChevronDown, Home, ShoppingBag, Layers, Info, Phone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import './ResponsiveNav.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { state, dispatch } = useCart();

  const navItems = [
    { 
      name: 'Home', 
      path: '/',
      hasDropdown: false,
      icon: Home
    },
    { 
      name: 'Shop', 
      path: '/products',
      hasDropdown: true,
      icon: ShoppingBag,
      dropdownItems: [
        { name: 'All Products', path: '/products' },
        { name: 'New Arrivals', path: '/products?filter=new' },
        { name: 'Sale Items', path: '/products?filter=sale' }
      ]
    },
    { 
      name: 'Collections', 
      path: '/collections',
      hasDropdown: true,
      icon: Layers,
      dropdownItems: [
        { name: 'Evening Wear', path: '/collections/evening-wear' },
        { name: 'Casual Luxury', path: '/collections/casual-luxury' },
        { name: 'Accessories', path: '/collections/accessories' }
      ]
    },
    { name: 'About', path: '/about', hasDropdown: false, icon: Info },
    { name: 'Contact', path: '/contact', hasDropdown: false, icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-card border-b border-white/12 backdrop-blur-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={handleLinkClick}>
            <div className="relative">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary animate-pulse" />
              <div className="absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-colors duration-300" />
            </div>
            <div className="text-base sm:text-lg lg:text-2xl font-bold text-gradient relative">
              LuxeStore
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-yellow-300 group-hover:w-full transition-all duration-500" />
            </div>
          </Link>

          {/* Desktop Navigation - Icons with Text */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`nav-link-desktop ${isActive(item.path) ? 'text-primary' : ''} flex items-center space-x-2`}
                    onClick={handleLinkClick}
                  >
                    <IconComponent className="w-4 h-4 xl:w-5 xl:h-5" />
                    <span className="text-sm xl:text-base font-medium">{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>
                  
                  {/* Enhanced Dropdown Menu */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className={`absolute top-full left-0 mt-2 w-56 glass-card border border-white/15 rounded-xl shadow-2xl transition-all duration-300 transform origin-top z-50 bg-gray-900/95 backdrop-blur-xl ${
                      activeDropdown === item.name 
                        ? 'opacity-100 scale-y-100 translate-y-0' 
                        : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                    }`}>
                      <div className="py-2">
                        {item.dropdownItems.map((dropdownItem, index) => (
                          <Link
                            key={index}
                            to={dropdownItem.path}
                            className="block px-4 py-3 text-white/80 hover:text-primary hover:bg-white/5 transition-all duration-200 text-sm font-medium"
                            onClick={handleLinkClick}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tablet Navigation - Icons Only */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link-tablet ${isActive(item.path) ? 'text-primary' : ''}`}
                  onClick={handleLinkClick}
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              );
            })}
          </div>

          {/* Search Bar for Desktop */}
          <div className={`hidden xl:block transition-all duration-300 ${isSearchOpen ? 'w-80' : 'w-64'}`}>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search luxury collections..."
                className="glass-input-enhanced w-full pl-12 pr-4 py-3 text-sm rounded-full border-2 border-transparent focus:border-primary/30"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-primary transition-colors w-4 h-4" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-yellow-300/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Search (Mobile/Tablet) */}
            <button className="xl:hidden glass-button-responsive p-2">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* User Account */}
            <Link to="/login" className="glass-button-responsive p-2 group hover:text-primary transition-colors" onClick={handleLinkClick}>
              <User className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="glass-button-responsive p-2 relative group hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              {state.itemCount > 0 && (
                <span className="cart-badge-responsive">
                  {state.itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass-button-responsive p-2"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/8">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`mobile-nav-item flex items-center space-x-3 ${isActive(item.path) ? 'text-primary' : 'text-white/70 hover:text-white'}`}
                    onClick={handleLinkClick}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-2 border-t border-white/8 mt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search luxury items..."
                    className="glass-input w-full pl-8 pr-3 py-2 text-sm"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-white/40 w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
