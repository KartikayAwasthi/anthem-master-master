## Cart Minus Button Fix

### Problem Identified:
The minus (-) button in both `CartButton` and `Cart` components was being disabled when quantity <= 1, preventing users from removing items from the cart when quantity is 1.

### Root Cause:
1. **CartButton Component**: `disabled={quantity <= 1}` prevented clicking when quantity was 1
2. **Cart Component**: Similar logic `disabled={item.quantity <= 1}` with conditional styling

### Solution Applied:

#### 1. CartButton.jsx Fix:
- **Before**: Button was disabled when `quantity <= 1`
- **After**: Button is always enabled, allowing users to click minus when quantity is 1 to remove the item

#### 2. Cart.jsx Fix:
- **Before**: Button was disabled and grayed out when `quantity <= 1`  
- **After**: Button is always enabled with consistent red styling

### Logic Flow (Working Correctly):
1. User clicks minus button when quantity > 1 → Decreases quantity by 1
2. User clicks minus button when quantity = 1 → Removes item from cart completely
3. `handleQuantityChange` and `handleDecreaseQuantity` functions handle both cases correctly

### Test Steps:
1. Go to `/products` page
2. Add any item to cart (quantity becomes 1)
3. Click the minus button in the CartButton → Item should be removed from cart
4. Add item again and open cart sidebar
5. Click the minus button in the cart → Item should be removed from cart

### Expected Behavior:
✅ Minus button is always clickable
✅ When quantity > 1: Decreases quantity by 1
✅ When quantity = 1: Removes item from cart entirely
✅ Proper visual feedback with animations
✅ Console logs show correct operations
