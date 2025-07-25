import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartButton = ({ product, className = "" }) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  
  // Find if the product is already in cart
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    console.log(`Added ${product.name} to cart:`, product);
  };

  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity < 10) { // Max quantity limit
      updateQuantity(product.id, quantity + 1);
      console.log(`Increased quantity for ${product.name} to ${quantity + 1}`);
    }
  };

  const handleDecreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
      console.log(`Decreased quantity for ${product.name} to ${quantity - 1}`);
    } else if (quantity === 1) {
      removeFromCart(product.id);
      console.log(`Removed ${product.name} from cart`);
    }
  };

  // If item is not in cart, show "Add to Cart" button
  if (quantity === 0) {
    return (
      <motion.button
        onClick={handleAddToCart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full bg-gradient-to-r from-[#ba6a5a] to-[#e49385] hover:from-[#e49385] hover:to-[#ba6a5a] text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02] ${className}`}
      >
        <ShoppingCart size={18} />
        Add to Cart
      </motion.button>
    );
  }

  // If item is in cart, show quantity controls
  return (
    <div className={`w-full flex items-center justify-between bg-gradient-to-r from-[#ba6a5a] to-[#e49385] rounded-xl p-1 ${className}`}>
      <motion.button
        onClick={handleDecreaseQuantity}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={quantity <= 1}
        className={`rounded-lg p-2 flex items-center justify-center transition-all duration-200 ${
          quantity <= 1 
            ? 'bg-gray-400/50 text-gray-300 cursor-not-allowed' 
            : 'bg-white/20 hover:bg-white/30 text-white'
        }`}
      >
        <Minus size={16} />
      </motion.button>
      
      <div className="flex-1 text-center text-white font-semibold">
        <span className="text-sm opacity-80">Qty: </span>
        <span className="text-lg">{quantity}</span>
      </div>
      
      <motion.button
        onClick={handleIncreaseQuantity}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={quantity >= 10}
        className={`rounded-lg p-2 flex items-center justify-center transition-all duration-200 ${
          quantity >= 10 
            ? 'bg-gray-400/50 text-gray-300 cursor-not-allowed opacity-50' 
            : 'bg-white/20 hover:bg-white/30 text-white'
        }`}
      >
        <Plus size={16} />
      </motion.button>
    </div>
  );
};

export default CartButton;
