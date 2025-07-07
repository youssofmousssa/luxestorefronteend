
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useCart();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Compact Logo */}
          <Link to="/" className="flex items-center space-x-1.5" onClick={handleLinkClick}>
            <div className="text-lg sm:text-xl font-bold text-gradient">LuxeStore</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'text-primary' : ''}`}
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Compact Search Bar */}
          <div className={`hidden xl:block transition-all duration-200 ${isSearchOpen ? 'w-56' : 'w-40'}`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="glass-input w-full pl-8 pr-3 py-1.5 text-sm"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-white/40 w-3.5 h-3.5" />
            </div>
          </div>

          {/* Compact Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search (Mobile/Tablet) */}
            <button className="xl:hidden glass-button p-1.5 sm:p-2">
              <Search className="w-4 h-4 text-white" />
            </button>

            {/* User Account */}
            <Link to="/login" className="glass-button p-1.5 sm:p-2 hover:text-primary transition-colors" onClick={handleLinkClick}>
              <User className="w-4 h-4" />
            </Link>

            {/* Compact Shopping Cart */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="glass-button p-1.5 sm:p-2 relative hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              {state.itemCount > 0 && (
                <span className="cart-badge">
                  {state.itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden glass-button p-1.5 sm:p-2"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Compact Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t border-white/8">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`mobile-nav-item ${isActive(item.path) ? 'text-primary' : 'text-white/70 hover:text-white'}`}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Compact Mobile Search */}
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
