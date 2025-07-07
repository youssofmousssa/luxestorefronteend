
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Shield, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Package
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Form States
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'card',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Order Summary Calculation
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0
  });

  // Shipping Options
  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 0 },
    { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 15.99 },
    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 29.99 }
  ];

  // Calculate order summary
  useEffect(() => {
    const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = shippingOptions.find(option => option.id === selectedShipping)?.price || 0;
    const tax = subtotal * 0.08; // 8% tax rate
    const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
    const total = subtotal + shippingCost + tax - discount;
    
    setOrderSummary({
      subtotal,
      shipping: shippingCost,
      tax,
      discount,
      total
    });
  }, [state.items, selectedShipping, promoApplied]);

  // Validation Functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s+/g, '');
    return cleaned.length >= 15 && cleaned.length <= 19;
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!shippingAddress.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(shippingAddress.email)) newErrors.email = 'Invalid email format';
    if (!shippingAddress.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!validatePhone(shippingAddress.phone)) newErrors.phone = 'Invalid phone format';
    if (!shippingAddress.address1.trim()) newErrors.address1 = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.state.trim()) newErrors.state = 'State is required';
    if (!shippingAddress.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (paymentMethod.type === 'card') {
      if (!paymentMethod.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!validateCardNumber(paymentMethod.cardNumber)) newErrors.cardNumber = 'Invalid card number';
      if (!paymentMethod.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
      if (!paymentMethod.expiryYear) newErrors.expiryYear = 'Expiry year is required';
      if (!paymentMethod.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!paymentMethod.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event Handlers
  const handleShippingChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentChange = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePromoCode = () => {
    // Simulate promo code validation
    if (promoCode.toLowerCase() === 'luxury10') {
      setPromoApplied(true);
      setErrors(prev => ({ ...prev, promo: '' }));
    } else {
      setErrors(prev => ({ ...prev, promo: 'Invalid promo code' }));
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Simulate API call for order placement
    try {
      // This is where you would integrate with your backend
      const orderData = {
        items: state.items,
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        paymentMethod,
        shipping: selectedShipping,
        orderSummary,
        promoCode: promoApplied ? promoCode : null
      };
      
      console.log('Order data to be sent to backend:', orderData);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page
      navigate('/order-success');
      
    } catch (error) {
      console.error('Order placement failed:', error);
      setErrors(prev => ({ ...prev, general: 'Order placement failed. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <Package className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-white/60 mb-6">Add some items to your cart to proceed with checkout</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary px-6 py-3"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-white/60">Complete your luxury purchase</p>
        </div>

        {/* Progress Steps */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Shipping', icon: Truck },
              { step: 2, title: 'Payment', icon: CreditCard },
              { step: 3, title: 'Review', icon: CheckCircle }
            ].map(({ step, title, icon: Icon }, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center space-x-3 ${step <= currentStep ? 'text-primary' : 'text-white/40'}`}>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    step < currentStep 
                      ? 'bg-primary border-primary text-black' 
                      : step === currentStep 
                        ? 'border-primary text-primary' 
                        : 'border-white/20 text-white/40'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className="font-medium hidden sm:block">{title}</span>
                </div>
                {index < 2 && (
                  <div className={`w-12 lg:w-24 h-0.5 mx-4 transition-all duration-300 ${
                    step < currentStep ? 'bg-primary' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="glass-card p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-primary" />
                  <span>Shipping Information</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-white/80 font-medium mb-2">Address Line 1 *</label>
                    <input
                      type="text"
                      value={shippingAddress.address1}
                      onChange={(e) => handleShippingChange('address1', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.address1 ? 'border-red-500' : ''}`}
                      placeholder="Enter street address"
                    />
                    {errors.address1 && <p className="text-red-400 text-sm mt-1">{errors.address1}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-white/80 font-medium mb-2">Address Line 2</label>
                    <input
                      type="text"
                      value={shippingAddress.address2}
                      onChange={(e) => handleShippingChange('address2', e.target.value)}
                      className="glass-input-enhanced w-full p-4 rounded-xl"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2">City *</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2">State *</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.state ? 'border-red-500' : ''}`}
                      placeholder="Enter state"
                    />
                    {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                      className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.zipCode ? 'border-red-500' : ''}`}
                      placeholder="Enter ZIP code"
                    />
                    {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-white/80 font-medium mb-2">Country *</label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) => handleShippingChange('country', e.target.value)}
                      className="glass-input-enhanced w-full p-4 rounded-xl"
                    >
                      <option value="US" className="bg-gray-900">United States</option>
                      <option value="CA" className="bg-gray-900">Canada</option>
                      <option value="UK" className="bg-gray-900">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 p-4 glass-card cursor-pointer hover:bg-white/5 transition-all duration-300">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="accent-primary w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-white font-medium">{option.name}</p>
                              <p className="text-white/60 text-sm">{option.time}</p>
                            </div>
                            <p className="text-white font-bold">
                              {option.price === 0 ? 'Free' : `$${option.price}`}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="glass-card p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <span>Payment Information</span>
                </h2>

                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { type: 'card', name: 'Credit Card', icon: CreditCard },
                      { type: 'paypal', name: 'PayPal', icon: Shield },
                      { type: 'apple_pay', name: 'Apple Pay', icon: Phone },
                      { type: 'google_pay', name: 'Google Pay', icon: Shield }
                    ].map(({ type, name, icon: Icon }) => (
                      <button
                        key={type}
                        onClick={() => setPaymentMethod(prev => ({ ...prev, type: type as any }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                          paymentMethod.type === type 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Credit Card Form */}
                {paymentMethod.type === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/80 font-medium mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        value={paymentMethod.cardholderName}
                        onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                        className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.cardholderName ? 'border-red-500' : ''}`}
                        placeholder="Enter cardholder name"
                      />
                      {errors.cardholderName && <p className="text-red-400 text-sm mt-1">{errors.cardholderName}</p>}
                    </div>

                    <div>
                      <label className="block text-white/80 font-medium mb-2">Card Number *</label>
                      <input
                        type="text"
                        value={paymentMethod.cardNumber}
                        onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                        className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.cardNumber ? 'border-red-500' : ''}`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 font-medium mb-2">Expiry Month *</label>
                        <select
                          value={paymentMethod.expiryMonth}
                          onChange={(e) => handlePaymentChange('expiryMonth', e.target.value)}
                          className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.expiryMonth ? 'border-red-500' : ''}`}
                        >
                          <option value="" className="bg-gray-900">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')} className="bg-gray-900">
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        {errors.expiryMonth && <p className="text-red-400 text-sm mt-1">{errors.expiryMonth}</p>}
                      </div>

                      <div>
                        <label className="block text-white/80 font-medium mb-2">Expiry Year *</label>
                        <select
                          value={paymentMethod.expiryYear}
                          onChange={(e) => handlePaymentChange('expiryYear', e.target.value)}
                          className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.expiryYear ? 'border-red-500' : ''}`}
                        >
                          <option value="" className="bg-gray-900">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year} className="bg-gray-900">
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expiryYear && <p className="text-red-400 text-sm mt-1">{errors.expiryYear}</p>}
                      </div>
                    </div>

                    <div className="w-full md:w-1/2">
                      <label className="block text-white/80 font-medium mb-2">CVV *</label>
                      <input
                        type="text"
                        value={paymentMethod.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        className={`glass-input-enhanced w-full p-4 rounded-xl ${errors.cvv ? 'border-red-500' : ''}`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                )}

                {/* Billing Address */}
                <div className="mt-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="accent-primary w-4 h-4"
                    />
                    <label htmlFor="sameAsShipping" className="text-white font-medium">
                      Billing address same as shipping
                    </label>
                  </div>

                  {!sameAsShipping && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* Billing address fields would go here - similar to shipping */}
                      <p className="text-white/60 md:col-span-2">Billing address form would be implemented here</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="glass-card p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span>Review Your Order</span>
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-8">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Shipping Address</h3>
                    <div className="bg-white/5 p-4 rounded-xl text-white/80">
                      <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                      <p>{shippingAddress.address1}</p>
                      {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
                      <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                      <p>{shippingAddress.email}</p>
                      <p>{shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Payment Method</h3>
                    <div className="bg-white/5 p-4 rounded-xl text-white/80">
                      {paymentMethod.type === 'card' ? (
                        <>
                          <p>Credit Card</p>
                          <p>**** **** **** {paymentMethod.cardNumber.slice(-4)}</p>
                          <p>{paymentMethod.cardholderName}</p>
                        </>
                      ) : (
                        <p className="capitalize">{paymentMethod.type.replace('_', ' ')}</p>
                      )}
                    </div>
                  </div>
                </div>

                {errors.general && (
                  <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                    <div className="flex items-center space-x-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <p>{errors.general}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="btn-secondary px-6 py-3"
                >
                  Previous Step
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="btn-primary px-6 py-3 ml-auto"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-primary px-8 py-3 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Place Order - $${orderSummary.total.toFixed(2)}`}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Shipping</span>
                  <span>{orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Tax</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${orderSummary.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Promo Code</h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="glass-input-enhanced w-full p-3 rounded-lg text-sm"
                    disabled={promoApplied}
                  />
                  {!promoApplied ? (
                    <button
                      onClick={handlePromoCode}
                      className="w-full btn-secondary py-2 text-sm"
                    >
                      Apply Code
                    </button>
                  ) : (
                    <p className="text-green-400 text-sm flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Promo code applied!</span>
                    </p>
                  )}
                  {errors.promo && <p className="text-red-400 text-sm">{errors.promo}</p>}
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-white/60">
                  <Shield className="w-4 h-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is protected</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Truck className="w-4 h-4" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
