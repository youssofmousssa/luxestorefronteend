
import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />
      
      {/* Compact Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm glass-card border-l border-white/15 z-50 transform animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Compact Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/8">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Cart ({state.itemCount})
            </h2>
            <button
              onClick={() => dispatch({ type: 'CLOSE_CART' })}
              className="glass-button p-1.5 hover:bg-white/15 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Compact Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-white/25 mx-auto mb-3" />
                <p className="text-white/50 text-base mb-4">Your cart is empty</p>
                <Link
                  to="/products"
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="btn-primary inline-block px-4 py-2 text-sm"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="glass-card p-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm truncate">{item.name}</h3>
                        <p className="text-white/50 text-xs">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' • '}
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <p className="text-primary font-semibold text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    {/* Compact Quantity Controls */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="glass-button p-1 hover:bg-white/15 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-medium px-2.5 py-1 glass-card text-sm min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="glass-button p-1 hover:bg-white/15 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-white font-semibold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Compact Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-white/8 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-semibold text-white">Total:</span>
                <span className="text-xl font-bold text-primary">${state.total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <Link
                  to="/cart"
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="btn-secondary w-full text-center block py-2.5 text-sm"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="btn-primary w-full text-center block py-2.5 text-sm"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
