
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const shippingCost = state.total > 200 ? 0 : 19.99;
  const tax = state.total * 0.08; // 8% tax
  const finalTotal = state.total + shippingCost + tax;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="glass-card p-12 max-w-md mx-auto">
              <ShoppingBag className="w-20 h-20 text-white/30 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-white/60 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products" className="btn-primary inline-flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-white/60">
              {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link 
            to="/products" 
            className="glass-button px-4 py-2 flex items-center space-x-2 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Items</h2>
                <button
                  onClick={clearCart}
                  className="text-white/60 hover:text-red-400 flex items-center space-x-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Cart</span>
                </button>
              </div>

              <div className="space-y-6">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-start space-x-4 p-4 glass-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg mb-1">{item.name}</h3>
                      <div className="text-white/60 text-sm space-y-1">
                        {item.size && <p>Size: {item.size}</p>}
                        {item.color && <p>Color: {item.color}</p>}
                      </div>
                      <p className="text-primary font-bold text-lg mt-2">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end space-y-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center glass-card rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white/10 transition-colors rounded-l-xl"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="px-4 py-2 text-white font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white/10 transition-colors rounded-r-xl"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="text-white font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/40 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Subtotal ({state.itemCount} items)</span>
                  <span className="text-white font-medium">${state.total.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {/* Free Shipping Notice */}
                {state.total < 200 && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <p className="text-primary text-sm">
                      Add ${(200 - state.total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Tax */}
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Tax</span>
                  <span className="text-white font-medium">${tax.toFixed(2)}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="btn-primary w-full text-center block py-4 text-lg font-semibold"
                >
                  Proceed to Checkout
                </Link>

                {/* Security Notice */}
                <div className="text-center">
                  <p className="text-white/40 text-xs">
                    🔒 Secure checkout with SSL encryption
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-3">We accept:</p>
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/10 rounded px-2 py-1">
                      <span className="text-xs text-white/80">VISA</span>
                    </div>
                    <div className="bg-white/10 rounded px-2 py-1">
                      <span className="text-xs text-white/80">MC</span>
                    </div>
                    <div className="bg-white/10 rounded px-2 py-1">
                      <span className="text-xs text-white/80">AMEX</span>
                    </div>
                    <div className="bg-white/10 rounded px-2 py-1">
                      <span className="text-xs text-white/80">PayPal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
