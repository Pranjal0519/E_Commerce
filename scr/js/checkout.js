/**
 * Checkout Process Management
 * Handles order review and payment processing
 */

document.addEventListener('DOMContentLoaded', function() {
    loadOrderData();
    setupCheckoutListeners();
});

/**
 * Load order data from localStorage and display it
 */
function loadOrderData() {
    try {
        const orderData = localStorage.getItem('order');
        if (!orderData) {
            redirectToCart();
            return;
        }

        const order = JSON.parse(orderData);
        displayOrderItems(order.items);
        displayOrderSummary(order);
    } catch (e) {
        console.error('Error loading order data:', e);
        redirectToCart();
    }
}

/**
 * Display order items in checkout
 * @param {Array} items - Order items
 */
function displayOrderItems(items) {
    const container = document.getElementById('order-items');
    if (!container) return;

    container.innerHTML = '';

    items.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        const div = document.createElement('div');
        div.className = 'cart-item';
        
        div.innerHTML = `
            <div class="cart-product-info">
                <div class="cart-product-image">
                    <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
                </div>
                <div class="cart-product-details">
                    <h3>${escapeHtml(item.name)}</h3>
                    <p class="text-muted">${escapeHtml(item.category)}</p>
                    <p class="cart-product-price">₹${item.price}</p>
                </div>
            </div>
            
            <div style="text-align: center; font-weight: 600;">×${item.quantity}</div>
            <div class="cart-item-price">₹${item.price}</div>
            <div class="cart-item-price">₹${itemTotal}</div>
            <div></div>
        `;

        container.appendChild(div);
    });
}

/**
 * Display order summary
 * @param {Object} order - Order data
 */
function displayOrderSummary(order) {
    const elements = {
        'order-subtotal': order.subtotal.toFixed(2),
        'order-discount': order.discount.toFixed(2),
        'order-shipping': order.shipping.toFixed(2),
        'order-tax': order.tax.toFixed(2),
        'order-total': order.total.toFixed(2),
        'payment-amount': order.total.toFixed(2)
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    // Handle free shipping display
    if (order.shipping === 0) {
        const shippingDisplay = document.getElementById('order-shipping-display');
        if (shippingDisplay) {
            shippingDisplay.innerHTML = '<span style="color: #48bb78; font-weight: 600;">FREE 🎉</span>';
        }
    }
}

/**
 * Setup checkout form listeners
 */
function setupCheckoutListeners() {
    const form = document.getElementById('shipping-form');
    if (form) {
        form.addEventListener('submit', submitOrder);
    }
}

/**
 * Submit order and process payment
 * @param {Event} event - Form submit event
 */
function submitOrder(event) {
    event.preventDefault();

    // Get form data
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const pincode = document.getElementById('pincode').value.trim();

    // Validate inputs
    if (!fullname || !email || !phone || !address || !city || !pincode) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    if (!/^\d{6}$/.test(pincode)) {
        showNotification('Please enter a valid 6-digit pincode', 'error');
        return;
    }

    // Get order data
    const orderData = JSON.parse(localStorage.getItem('order'));
    if (!orderData) {
        showNotification('Order data not found', 'error');
        return;
    }

    // Create final order
    const finalOrder = {
        ...orderData,
        customer: {
            name: fullname,
            email: email,
            phone: phone,
            address: address,
            city: city,
            pincode: pincode
        },
        orderNumber: generateOrderNumber(),
        orderDate: new Date().toLocaleDateString('en-IN'),
        orderTime: new Date().toLocaleTimeString('en-IN'),
        status: 'Processing',
        paymentMethod: 'Online Payment',
        paymentStatus: 'Pending'
    };

    // Save order to history
    saveOrderHistory(finalOrder);

    // Clear cart and order data
    localStorage.removeItem('order');
    localStorage.setItem('cart', JSON.stringify([]));

    showNotification('Processing payment...', 'success');

    // Simulate payment processing
    setTimeout(() => {
        completeOrder(finalOrder);
    }, 2000);
}

/**
 * Save order to history
 * @param {Object} order - Order to save
 */
function saveOrderHistory(order) {
    try {
        let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistory.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    } catch (e) {
        console.error('Error saving order history:', e);
    }
}

/**
 * Complete order and show success
 * @param {Object} order - Completed order
 */
function completeOrder(order) {
    // Show success message
    showNotification('Order placed successfully! 🎉', 'success');

    // Store order confirmation
    localStorage.setItem('lastOrder', JSON.stringify(order));

    // Redirect to order confirmation page
    setTimeout(() => {
        // For now, show alert with order details
        const message = `
Order Confirmed! 🎉

Order Number: ${order.orderNumber}
Date: ${order.orderDate}
Time: ${order.orderTime}

Delivery Address:
${order.customer.name}
${order.customer.address}
${order.customer.city} - ${order.customer.pincode}

Phone: ${order.customer.phone}
Email: ${order.customer.email}

Total Amount: ₹${order.total.toFixed(2)}
Payment Status: Success ✓

Your order will be delivered within 5-7 business days.
A confirmation email has been sent to ${order.customer.email}

Thank you for shopping with My CartJoy!
        `;

        alert(message);

        // Redirect to home
        window.location.href = '/index.html';
    }, 1500);
}

/**
 * Generate unique order number
 * @returns {string} Order number
 */
function generateOrderNumber() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `MCJ${timestamp.substr(-6)}${random}`;
}

/**
 * Redirect to cart if no order data
 */
function redirectToCart() {
    showNotification('No order found. Redirecting to cart...', 'info');
    setTimeout(() => {
        window.location.href = '/scr/tamplets/cart.html';
    }, 2000);
}

/**
 * Show notification
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info'
 */
function showNotification(message, type = 'success') {
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
