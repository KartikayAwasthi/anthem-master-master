import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Heart, Share2, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [imageLoading, setImageLoading] = useState(new Set());
  const [showItemDetails, setShowItemDetails] = useState(new Set());

  // Handle quantity update with animation feedback
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else if (newQuantity <= 10) { // Max quantity limit
      updateQuantity(itemId, newQuantity);
      // Add feedback animation
      const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
      if (itemElement) {
        itemElement.classList.add('animate-pulse');
        setTimeout(() => itemElement.classList.remove('animate-pulse'), 200);
      }
      // Show toast notification for quantity changes
      if (newQuantity !== 1) {
        console.log(`Quantity updated for item ${itemId}: ${newQuantity}`);
      }
    } else {
      // Show max quantity reached message
      console.warn(`Maximum quantity (10) reached for item ${itemId}`);
    }
  };

  // Wishlist functionality
  const toggleWishlist = (itemId) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Share functionality
  const shareItem = (item) => {
    if (navigator.share) {
      navigator.share({
        title: `Anthem ${item.name}`,
        text: `Check out this amazing fan: Anthem ${item.name} - ${item.price}`,
        url: window.location.origin + `/fan/${item.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Check out this amazing fan: Anthem ${item.name} - ${item.price} at ${window.location.origin}/fan/${item.id}`);
      alert('Product link copied to clipboard!');
    }
  };

  // Toggle item details view
  const toggleItemDetails = (itemId) => {
    setShowItemDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Handle image loading states
  const handleImageLoad = (itemId) => {
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleImageError = (itemId, imgElement) => {
    console.error(`Image failed to load for item ${itemId}:`, imgElement.src);
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
    // Set fallback image - only if not already set to fallback
    if (imgElement && imgElement.src !== '/fallback.jpg' && !imgElement.src.includes('fallback.jpg')) {
      imgElement.src = '/fallback.jpg';
    }
  };

  // Component for rendering cart item image with proper error handling
  const CartItemImage = ({ item, className, isOverview = false }) => {
    const [imageSrc, setImageSrc] = useState(item.image);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
      if (!hasError && imageSrc !== '/fallback.jpg') {
        console.log(`Image failed for ${item.name}, using fallback`);
        setImageSrc('/fallback.jpg');
        setHasError(true);
      }
    };

    const handleLoad = () => {
      console.log(`Image loaded successfully for ${item.name}`);
      if (!isOverview) {
        handleImageLoad(item.id);
      }
    };

    return (
      <img
        src={imageSrc}
        alt={item.name}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    );
  };

  // Format INR price with better formatting
  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to get original price (before discount)
  const getOriginalPrice = (price) => {
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[₹,]/g, '')) || 0 
      : price || 0;
    return numericPrice; // This is the original price
  };

  // Helper function to get discounted price (10% off)
  const getDiscountedPrice = (price) => {
    const originalPrice = getOriginalPrice(price);
    return originalPrice * 0.9; // 10% discount
  };

  // Calculate total with 10% discount applied
  const getDiscountedTotal = () => {
    return items.reduce((sum, item) => {
      const discountedPrice = getDiscountedPrice(item.price);
      return sum + (discountedPrice * item.quantity);
    }, 0);
  };

  // Calculate total savings from 10% discount
  const calculateSavings = () => {
    const originalTotal = items.reduce((sum, item) => {
      const originalPrice = getOriginalPrice(item.price);
      return sum + (originalPrice * item.quantity);
    }, 0);
    const discountedTotal = getDiscountedTotal();
    return originalTotal - discountedTotal;
  };

  // Memoize total with discount applied
  const total = useMemo(() => getDiscountedTotal(), [items]);

  // Debug cart items (temporary)
  useEffect(() => {
    console.log('Cart items:', items);
    items.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      });
      // Set loading state for images initially
      if (item.image && !imageLoading.has(item.id)) {
        setImageLoading(prev => new Set(prev).add(item.id));
      }
    });
  }, [items]);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Disable background scroll when cart is open
  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <div>
                  <h2 id="cart-title" className="text-xl font-bold">
                    Shopping Cart
                  </h2>
                  {items.length > 0 && (
                    <p className="text-sm text-white/80">
                      {items.length} {items.length === 1 ? 'type' : 'types'} • {items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                  )}
                </div>
              </div>
              <button
                aria-label="Close Cart"
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* 10% Discount Banner */}
            {items.length > 0 && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 border-b border-green-400">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">%</span>
                    </div>
                    <span className="font-semibold">🎉 Special Offer: 10% OFF on all items!</span>
                  </div>
                  <div className="text-sm">
                    You save: <span className="font-bold">{formatPrice(calculateSavings())}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 mb-6">Please add something to your cart!</p>
                  <Link to="/products" onClick={onClose}>
                    <button className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                      Browse Products
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="p-6 pb-2">
                  {/* Enhanced Cart Overview */}
                  <div className="mb-6 p-5 bg-gradient-to-br from-[#ba6a5a]/10 via-[#e49385]/10 to-[#efb4a5]/10 rounded-2xl border border-[#ba6a5a]/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <ShoppingBag size={24} className="text-[#ba6a5a]" />
                        Cart Summary
                      </h3>
                      <div className="bg-[#ba6a5a] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {items.length} {items.length === 1 ? 'Type' : 'Types'}
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-white/80 p-3 rounded-xl border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-[#ba6a5a] mb-1">{items.length}</div>
                        <div className="text-xs text-gray-600 font-medium">Fan Types</div>
                      </div>
                      <div className="bg-white/80 p-3 rounded-xl border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-[#ba6a5a] mb-1">{items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                        <div className="text-xs text-gray-600 font-medium">Total Items</div>
                      </div>
                      <div className="bg-white/80 p-3 rounded-xl border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-[#ba6a5a] mb-1">{formatPrice(total)}</div>
                        <div className="text-xs text-gray-600 font-medium">Cart Value</div>
                      </div>
                    </div>

                    {/* Fan Types Overview */}
                    <div className="bg-white/60 p-3 rounded-xl border border-gray-100">
                      <div className="text-sm font-medium text-gray-700 mb-2">Items Added:</div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item, index) => (
                          <div key={item.id} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                            <CartItemImage
                              item={item}
                              className="w-6 h-6 object-contain"
                              isOverview={true}
                            />
                            <span className="text-xs font-medium text-gray-700">{item.name}</span>
                            <span className="bg-[#ba6a5a] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                              {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          data-item-id={item.id}
                          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Product Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#ba6a5a] rounded-full"></div>
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Item #{items.indexOf(item) + 1}
                              </span>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex gap-4">
                            {/* Enhanced Product Image with more features */}
                            <div className="w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 flex-shrink-0 shadow-lg border border-gray-200 relative group">
                              {imageLoading.has(item.id) && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#ba6a5a]"></div>
                                </div>
                              )}
                              <CartItemImage
                                item={item}
                                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                              />
                              
                              {/* Image Overlay Actions */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleWishlist(item.id)}
                                  className={`p-2 rounded-full transition-all duration-200 ${
                                    wishlistItems.has(item.id) 
                                      ? 'bg-red-500 text-white' 
                                      : 'bg-white/20 text-white hover:bg-white/30'
                                  }`}
                                  title="Add to Wishlist"
                                >
                                  <Heart size={14} fill={wishlistItems.has(item.id) ? 'currentColor' : 'none'} />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => shareItem(item)}
                                  className="p-2 bg-white/20 text-white hover:bg-white/30 rounded-full transition-all duration-200"
                                  title="Share Product"
                                >
                                  <Share2 size={14} />
                                </motion.button>
                              </div>
                              
                              {/* Enhanced Badge */}
                              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                                FAN
                              </div>

                              {/* Quantity Badge */}
                              <div className="absolute -bottom-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                                ×{item.quantity}
                              </div>
                            </div>

                            {/* Enhanced Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-800 text-lg">Anthem {item.name}</h3>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => toggleItemDetails(item.id)}
                                  className="p-1 text-gray-400 hover:text-[#ba6a5a] transition-colors rounded-full hover:bg-gray-100"
                                  title="View Details"
                                >
                                  <Eye size={16} />
                                </motion.button>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.desc || 'Premium ceiling fan with advanced features'}</p>
                              
                              {/* Product Rating */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={12}
                                      className={`${
                                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">(4.8)</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                                  Top Rated
                                </span>
                              </div>

                              {/* Expandable Details */}
                              <AnimatePresence>
                                {showItemDetails.has(item.id) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                                  >
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="font-medium text-gray-700">Motor Type:</span>
                                        <div className="text-gray-600">BLDC Motor</div>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-700">Warranty:</span>
                                        <div className="text-gray-600">2 Years</div>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-700">Power:</span>
                                        <div className="text-gray-600">28W</div>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-700">Speed:</span>
                                        <div className="text-gray-600">300 RPM</div>
                                      </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                      <div className="flex items-center gap-2 text-xs">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Energy Star</span>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Eco-Friendly</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              
                              {/* Enhanced Product Info Grid */}
                              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-2 rounded border border-blue-200">
                                  <span className="text-blue-600 block font-medium">Product ID</span>
                                  <span className="font-bold text-blue-800 uppercase">{item.id}</span>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 rounded border border-green-200">
                                  <span className="text-green-600 block font-medium">Unit Price (10% off)</span>
                                  <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 line-through">{formatPrice(getOriginalPrice(item.price))}</span>
                                    <span className="font-bold text-green-800">{formatPrice(getDiscountedPrice(item.price))}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Enhanced Status Badges */}
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  In Stock
                                </span>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                  Premium Quality
                                </span>
                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                                  Free Shipping
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Quantity Section with Advanced Controls */}
                          <div className="mt-4 p-4 bg-gradient-to-r from-[#ba6a5a]/5 to-[#e49385]/5 rounded-xl border border-[#ba6a5a]/10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700 font-semibold">Quantity Control:</span>
                                <div className="bg-white px-2 py-1 rounded-lg border border-gray-200">
                                  <span className="text-xs text-gray-500">Current: {item.quantity}</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-2">
                                <span>Max: 10 per item</span>
                                {item.quantity >= 10 && (
                                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                    Max Reached
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 mb-3">
                              {/* Enhanced Decrease Button */}
                              <motion.button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                                aria-label="Decrease quantity"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Minus size={20} />
                              </motion.button>

                              {/* Enhanced Quantity Display */}
                              <div className="flex items-center gap-3">
                                <div className="px-8 py-4 bg-white border-2 border-[#ba6a5a] rounded-xl shadow-lg">
                                  <span className="font-bold text-gray-800 text-2xl">{item.quantity}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  <div className="font-medium">pieces</div>
                                  <div className="text-xs text-gray-400">
                                    <div className="line-through text-red-400">
                                      ₹{(getOriginalPrice(item.price) * item.quantity).toFixed(0)}
                                    </div>
                                    <div className="text-green-600 font-bold">
                                      {formatPrice(getDiscountedPrice(item.price) * item.quantity)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Enhanced Increase Button */}
                              <motion.button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className={`w-12 h-12 rounded-xl text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl ${
                                  item.quantity >= 10 
                                    ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                    : 'bg-gradient-to-r from-[#ba6a5a] to-[#e49385] hover:from-[#e49385] hover:to-[#ba6a5a]'
                                }`}
                                aria-label="Increase quantity"
                                disabled={item.quantity >= 10}
                                whileHover={{ scale: item.quantity < 10 ? 1.05 : 1 }}
                                whileTap={{ scale: item.quantity < 10 ? 0.95 : 1 }}
                              >
                                <Plus size={20} />
                              </motion.button>
                            </div>

                            {/* Quick Select Buttons with Enhanced Features */}
                            <div className="flex justify-center gap-2 mb-3">
                              {[1, 2, 3, 5, 10].map((qty) => (
                                <motion.button
                                  key={qty}
                                  onClick={() => handleQuantityChange(item.id, qty)}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    item.quantity === qty
                                      ? 'bg-[#ba6a5a] text-white shadow-lg scale-105'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {qty}
                                  {qty === 10 && <span className="ml-1 text-xs">Max</span>}
                                </motion.button>
                              ))}
                            </div>

                            {/* Quantity Benefits Display */}
                            {item.quantity >= 3 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-50 border border-green-200 rounded-lg p-2 text-center"
                              >
                                <div className="text-xs text-green-700 font-medium">
                                  🎉 Bulk Order Benefits: 
                                  {item.quantity >= 5 && <span className="ml-1">Free Installation!</span>}
                                  {item.quantity >= 3 && item.quantity < 5 && <span className="ml-1">Extended Warranty!</span>}
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Price Breakdown */}
                          <div className="mt-4 p-3 bg-gradient-to-r from-[#ba6a5a]/5 to-[#e49385]/5 rounded-lg border border-[#ba6a5a]/10">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">Original Price:</span>
                              <span className="text-sm text-gray-500 line-through">{formatPrice(getOriginalPrice(item.price))}</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">Discounted Price (10% off):</span>
                              <div className="flex flex-col items-end">
                                <span className="font-medium text-green-600">{formatPrice(getDiscountedPrice(item.price))}</span>
                                <span className="text-xs text-green-500">Save ₹{(getOriginalPrice(item.price) - getDiscountedPrice(item.price)).toFixed(0)}</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">Quantity:</span>
                              <span className="font-medium text-gray-800">× {item.quantity}</span>
                            </div>
                            <hr className="my-2 border-gray-200" />
                            <div className="flex justify-between items-center">
                              <span className="text-base font-semibold text-gray-800">Item Total:</span>
                              <div className="text-right">
                                <div className="text-xs text-gray-500 line-through">
                                  ₹{(getOriginalPrice(item.price) * item.quantity).toFixed(0)}
                                </div>
                                <span className="text-xl font-bold text-[#ba6a5a]">
                                  {formatPrice(getDiscountedPrice(item.price) * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Clear Cart */}
                    {items.length > 0 && (
                      <motion.div className="mt-6 pt-4 border-t border-gray-200">
                        <motion.button
                          onClick={clearCart}
                          className="w-full py-3 text-red-600 hover:text-red-700 font-medium transition-colors border border-red-200 hover:border-red-300 rounded-xl hover:bg-red-50 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash2 size={18} />
                          Clear All Items ({items.length} types, {items.reduce((sum, item) => sum + item.quantity, 0)} pieces)
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Always visible at bottom */}
            <div className="border-t border-gray-200 p-6 bg-white shadow-lg mt-auto">
              {items.length > 0 ? (
                <>
                  {/* Detailed Cart Summary */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-[#ba6a5a]/5 to-[#e49385]/5 rounded-xl border border-[#ba6a5a]/10">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <ShoppingBag size={18} className="text-[#ba6a5a]" />
                      Order Summary
                    </h4>
                    
                    {/* Detailed breakdown */}
                    <div className="space-y-2 mb-3">
                      {items.map((item, index) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            {item.name} × {item.quantity}
                          </span>
                          <div className="text-right">
                            <div className="text-xs text-gray-400 line-through">
                              ₹{(getOriginalPrice(item.price) * item.quantity).toFixed(0)}
                            </div>
                            <span className="font-medium text-green-600">
                              {formatPrice(getDiscountedPrice(item.price) * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <hr className="border-gray-200 mb-3" />
                    
                    {/* Summary stats */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Types</p>
                        <p className="font-bold text-[#ba6a5a]">{items.length}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Items</p>
                        <p className="font-bold text-[#ba6a5a]">{items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Savings</p>
                        <p className="font-bold text-green-600">
                          {formatPrice(calculateSavings())}
                        </p>
                      </div>
                    </div>

                    {/* Savings Banner */}
                    {calculateSavings() > 0 && (
                      <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg text-center">
                        <div className="text-xs text-green-700 font-medium">
                          🎉 You're saving {formatPrice(calculateSavings())} on this order!
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div>
                        <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                        {calculateSavings() > 0 && (
                          <div className="text-xs text-gray-500 line-through">
                            {formatPrice(total + calculateSavings())}
                          </div>
                        )}
                      </div>
                      <span className="text-2xl font-bold text-[#ba6a5a]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      className="w-full bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 relative overflow-hidden"
                      onClick={() => alert('Checkout flow coming soon')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <ShoppingBag size={20} />
                      Proceed to Checkout ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                    </motion.button>
                    
                    {/* Additional Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        onClick={() => {
                          const cartSummary = `Cart Summary (10% Discount Applied):\n${items.map(item => `• ${item.name} x${item.quantity}\n  Original: ₹${(getOriginalPrice(item.price) * item.quantity).toFixed(0)}\n  Discounted: ${formatPrice(getDiscountedPrice(item.price) * item.quantity)} (Save ₹${((getOriginalPrice(item.price) - getDiscountedPrice(item.price)) * item.quantity).toFixed(0)})`).join('\n\n')}\n\nTotal Savings: ${formatPrice(calculateSavings())}\nFinal Total: ${formatPrice(total)}`;
                          
                          if (navigator.share) {
                            navigator.share({
                              title: 'My Anthem Cart',
                              text: cartSummary
                            });
                          } else {
                            navigator.clipboard.writeText(cartSummary);
                            alert('Cart summary copied to clipboard!');
                          }
                        }}
                        className="py-2 px-4 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 size={16} />
                        Share Cart
                      </motion.button>
                      
                      <motion.button
                        onClick={() => {
                          items.forEach(item => {
                            toggleWishlist(item.id);
                          });
                          alert(`${items.length} items moved to wishlist!`);
                        }}
                        className="py-2 px-4 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Heart size={16} />
                        Save All
                      </motion.button>
                    </div>
                    
                    <Link to="/products" onClick={onClose}>
                      <motion.button
                        className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-200 hover:border-gray-300 rounded-xl hover:bg-gray-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue Shopping
                      </motion.button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 mb-4">Start adding items to see them here</p>
                  <Link to="/products" onClick={onClose}>
                    <motion.button
                      className="w-full bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Browse Products
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;