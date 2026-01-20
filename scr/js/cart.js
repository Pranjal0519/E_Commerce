/**
 * Shopping Cart Management
 * Handles all cart operations including add, remove, update quantity, and calculations
 */

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    updateCartCounter();
    displayCart();
    setupEventListeners();
});

/**
 * Initialize cart from localStorage
 */
function initializeCart() {
    const cart = getCart();
    if (!cart || cart.length === 0) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

/**
 * Get cart from localStorage
 * @returns {Array} Cart items
 */
function getCart() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error('Error reading cart:', e);
        return [];
    }
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items to save
 */
function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}

/**
 * Add product to cart
 * @param {Object} product - Product to add
 * @param {number} quantity - Quantity to add (default: 1)
 */
function addToCart(product, quantity = 1) {
    try {
        const cart = getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            // If product already in cart, increase quantity
            existingItem.quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                category: product.category,
                quantity: quantity
            });
        }

        saveCart(cart);
        showNotification(`${product.name} added to cart!`);
    } catch (e) {
        console.error('Error adding to cart:', e);
        showNotification('Error adding product to cart', 'error');
    }
}

/**
 * Remove product from cart
 * @param {number} productId - ID of product to remove
 */
function removeFromCart(productId) {
    try {
        const cart = getCart();
        const filteredCart = cart.filter(item => item.id !== productId);
        saveCart(filteredCart);
        displayCart();
        showNotification('Product removed from cart');
    } catch (e) {
        console.error('Error removing from cart:', e);
    }
}

/**
 * Update product quantity in cart
 * @param {number} productId - ID of product
 * @param {number} quantity - New quantity
 */
function updateQuantity(productId, quantity) {
    try {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        const cart = getCart();
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity = parseInt(quantity);
            saveCart(cart);
            displayCart();
        }
    } catch (e) {
        console.error('Error updating quantity:', e);
    }
}

/**
 * Get total price of all items (original price, not discounted)
 * @returns {number} Total original price
 */
function getSubtotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

/**
 * Get total discount savings
 * @returns {number} Total discount amount
 */
function getDiscountAmount() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const discount = (item.originalPrice - item.price) * item.quantity;
        return total + discount;
    }, 0);
}

/**
 * Calculate tax (10% of subtotal)
 * @returns {number} Tax amount
 */
function getTax() {
    return getSubtotal() * 0.10;
}

/**
 * Get shipping cost (free for orders > ₹500)
 * @returns {number} Shipping cost
 */
function getShipping() {
    const subtotal = getSubtotal();
    return subtotal > 500 ? 0 : 50;
}

/**
 * Calculate total amount to pay
 * @returns {number} Total amount
 */
function getTotal() {
    return getSubtotal() + getTax() + getShipping();
}

/**
 * Update cart counter in header
 */
function updateCartCounter() {
    const cart = getCart();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(el => el.textContent = cartCount);
}

/**
 * Display all cart items on page
 */
function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const cartContent = document.getElementById('cart-content');
    const cartStatus = document.getElementById('cart-status');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCartMsg) emptyCartMsg.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }

    // Show cart content
    if (emptyCartMsg) emptyCartMsg.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';

    // Update status
    if (cartStatus) {
        cartStatus.textContent = `${cart.length} item(s) in your cart`;
    }

    // Clear container
    cartItemsContainer.innerHTML = '';

    // Create cart item elements
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItem);
    });

    // Update summary
    updateCartSummary();
}

/**
 * Create a single cart item element
 * @param {Object} item - Cart item
 * @returns {HTMLElement} Cart item element
 */
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    const itemTotal = (item.price * item.quantity).toFixed(2);
    const discountPerItem = (item.originalPrice - item.price).toFixed(0);

    div.innerHTML = `
        <div class="cart-product-info">
            <div class="cart-product-image">
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
            </div>
            <div class="cart-product-details">
                <h3>${escapeHtml(item.name)}</h3>
                <p class="text-muted">${escapeHtml(item.category)}</p>
                <p class="cart-product-price">
                    ₹${item.price} 
                    <span class="original-price">₹${item.originalPrice}</span>
                    <span style="color: #48bb78; margin-left: 5px;">Save ₹${discountPerItem}</span>
                </p>
            </div>
        </div>
        
        <div class="cart-quantity">
            <button class="qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
            <input type="number" class="qty-input" value="${item.quantity}" 
                   onchange="updateQuantity(${item.id}, this.value)" min="1">
            <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
        </div>
        
        <div class="cart-item-price">₹${itemTotal}</div>
        
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
    `;

    return div;
}

/**
 * Increase quantity helper
 * @param {number} productId - Product ID
 */
function increaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        updateQuantity(productId, item.quantity + 1);
    }
}

/**
 * Decrease quantity helper
 * @param {number} productId - Product ID
 */
function decreaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
    }
}

/**
 * Update cart summary with totals
 */
function updateCartSummary() {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const shipping = getShipping();
    const tax = getTax();
    const total = getTotal();

    // Update elements
    const elements = {
        'subtotal': subtotal.toFixed(2),
        'discount-amount': discount.toFixed(2),
        'shipping': shipping.toFixed(2),
        'tax-amount': tax.toFixed(2),
        'total-amount': total.toFixed(2),
        'saving-amount': discount.toFixed(0)
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    // Show/hide discount banner
    const discountBanner = document.getElementById('discount-banner');
    if (discountBanner) {
        if (discount > 0) {
            discountBanner.style.display = 'block';
        } else {
            discountBanner.style.display = 'none';
        }
    }

    // Show free shipping message
    if (shipping === 0) {
        const shippingEl = document.querySelector('[id="shipping"]');
        if (shippingEl) {
            const parent = shippingEl.closest('.summary-row');
            if (parent) {
                parent.innerHTML = `
                    <span>Shipping:</span>
                    <span class="summary-value" style="color: #48bb78;">FREE 🎉</span>
                `;
            }
        }
    }
}

/**
 * Proceed to checkout
 */
function proceedToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    // Store order data
    const orderData = {
        items: cart,
        subtotal: getSubtotal(),
        discount: getDiscountAmount(),
        shipping: getShipping(),
        tax: getTax(),
        total: getTotal(),
        date: new Date().toISOString()
    };

    localStorage.setItem('order', JSON.stringify(orderData));
    showNotification('Redirecting to checkout...', 'success');
    
    // Redirect to checkout page
    setTimeout(() => {
        window.location.href = '/scr/tamplets/checkout.html';
    }, 1000);
}

/**
 * Clear entire cart
 */
function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        saveCart([]);
        displayCart();
        showNotification('Cart cleared');
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add to cart buttons (from product page)
    const addToCartButtons = document.querySelectorAll('.add-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get parent product item
            const productItem = this.closest('.product-item');
            if (!productItem) return;

            // Extract product details from DOM
            const name = productItem.querySelector('h3').textContent;
            const image = productItem.querySelector('img').src;
            const priceText = productItem.querySelector('.price').textContent;
            const originalPriceText = productItem.querySelector('.original-price').textContent;
            const category = productItem.closest('.category-section')?.querySelector('h2').textContent || 'Products';

            // Clean currency symbols
            const price = parseFloat(priceText.replace(/[₹$,]/g, ''));
            const originalPrice = parseFloat(originalPriceText.replace(/[₹$,]/g, ''));

            const product = {
                id: Math.random(), // Generate simple ID
                name: name,
                price: price,
                originalPrice: originalPrice,
                image: image,
                category: category.trim()
            };

            addToCart(product);
        });
    });
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info'
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#f56565' : type === 'success' ? '#48bb78' : '#4299e1'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Add animation styles to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
