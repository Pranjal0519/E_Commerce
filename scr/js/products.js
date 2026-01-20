// Product Data - All Products with Categories
const products = [
    // Personal Care
    {
        id: 1,
        name: "Organic Handmade Soap",
        category: "Personal Care",
        price: 299,
        originalPrice: 429,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=250&h=250&fit=crop",
        discount: 30,
        description: "Natural ingredients, eco-friendly"
    },
    {
        id: 2,
        name: "Luxury Bath Bombs",
        category: "Personal Care",
        price: 399,
        originalPrice: 533,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=250&h=250&fit=crop",
        discount: 25,
        description: "Aromatherapy spa experience"
    },
    {
        id: 3,
        name: "Essential Oil Set",
        category: "Personal Care",
        price: 599,
        originalPrice: 749,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=250&h=250&fit=crop",
        discount: 20,
        description: "Pure, natural aromatherapy oils"
    },
    {
        id: 4,
        name: "Scented Candles",
        category: "Personal Care",
        price: 349,
        originalPrice: 539,
        image: "https://images.unsplash.com/photo-1600356776898-70f2b7ab8ad0?w=250&h=250&fit=crop",
        discount: 35,
        description: "Hand-poured soy candles"
    },
    // Home Decor
    {
        id: 5,
        name: "Handmade Pottery Vase",
        category: "Home Decor",
        price: 899,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=250&h=250&fit=crop",
        discount: 40,
        description: "Artisan ceramic craftsmanship"
    },
    {
        id: 6,
        name: "Macrame Wall Hanging",
        category: "Home Decor",
        price: 699,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=250&h=250&fit=crop",
        discount: 30,
        description: "Bohemian style wall decor"
    },
    {
        id: 7,
        name: "Wooden Decorative Art",
        category: "Home Decor",
        price: 799,
        originalPrice: 1066,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=250&h=250&fit=crop",
        discount: 25,
        description: "Rustic handcrafted wooden piece"
    },
    {
        id: 8,
        name: "Embroidered Cushions",
        category: "Home Decor",
        price: 499,
        originalPrice: 625,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=250&h=250&fit=crop",
        discount: 20,
        description: "Handwoven textile perfection"
    },
    // Fashion & Accessories
    {
        id: 9,
        name: "Handmade Beaded Jewelry",
        category: "Fashion & Accessories",
        price: 549,
        originalPrice: 849,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=250&h=250&fit=crop",
        discount: 35,
        description: "Unique artisan design"
    },
    {
        id: 10,
        name: "Custom Printed T-Shirt",
        category: "Fashion & Accessories",
        price: 349,
        originalPrice: 583,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=250&h=250&fit=crop",
        discount: 40,
        description: "100% organic cotton"
    },
    {
        id: 11,
        name: "Canvas Tote Bag",
        category: "Fashion & Accessories",
        price: 449,
        originalPrice: 643,
        image: "https://images.unsplash.com/photo-1595777712802-61b45d80019d?w=250&h=250&fit=crop",
        discount: 30,
        description: "Eco-friendly & spacious"
    },
    {
        id: 12,
        name: "Leather Accessory Set",
        category: "Fashion & Accessories",
        price: 999,
        originalPrice: 1819,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=250&h=250&fit=crop",
        discount: 45,
        description: "Premium handcrafted leather"
    },
    // Edibles
    {
        id: 13,
        name: "Artisan Baked Cookies",
        category: "Edibles",
        price: 299,
        originalPrice: 375,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=250&h=250&fit=crop",
        discount: 20,
        description: "Fresh homemade treats"
    },
    {
        id: 14,
        name: "Homemade Fruit Jam",
        category: "Edibles",
        price: 249,
        originalPrice: 333,
        image: "https://images.unsplash.com/photo-1589985391892-8fb5e565efaf?w=250&h=250&fit=crop",
        discount: 25,
        description: "No preservatives added"
    },
    {
        id: 15,
        name: "Pure Raw Honey",
        category: "Edibles",
        price: 399,
        originalPrice: 571,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=250&h=250&fit=crop",
        discount: 30,
        description: "Organic farm-fresh honey"
    },
    {
        id: 16,
        name: "Gourmet Gift Basket",
        category: "Edibles",
        price: 1499,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=250&h=250&fit=crop",
        discount: 50,
        description: "Curated specialty foods"
    },
    // Digital Products
    {
        id: 17,
        name: "Digital Art Print Collection",
        category: "Digital Products",
        price: 199,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=250&h=250&fit=crop",
        discount: 50,
        description: "Instant download, printable"
    },
    {
        id: 18,
        name: "Custom Digital Illustrations",
        category: "Digital Products",
        price: 399,
        originalPrice: 665,
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=250&h=250&fit=crop",
        discount: 40,
        description: "Professional design files"
    },
    {
        id: 19,
        name: "DIY Video Tutorial Course",
        category: "Digital Products",
        price: 499,
        originalPrice: 768,
        image: "https://images.unsplash.com/photo-1516321318423-f06f70504ab0?w=250&h=250&fit=crop",
        discount: 35,
        description: "Step-by-step guidance"
    },
    {
        id: 20,
        name: "Online Creative Masterclass",
        category: "Digital Products",
        price: 799,
        originalPrice: 1777,
        image: "https://images.unsplash.com/photo-1533519227268-461353132943?w=250&h=250&fit=crop",
        discount: 55,
        description: "Lifetime access, certificates"
    }
];

// Category Configuration
const categoryConfig = {
    'Personal Care': {
        emoji: '🧴',
        description: 'Soaps, bath bombs, essential oils, natural cosmetics, scented candles, spa kits'
    },
    'Home Decor': {
        emoji: '🏠',
        description: 'Pottery, macrame, wooden items, textiles, unique lamps, wall art, planters, organizers'
    },
    'Fashion & Accessories': {
        emoji: '👗',
        description: 'Handmade jewelry, custom t-shirts, tote bags, embroidered items, leather goods, keychains'
    },
    'Edibles': {
        emoji: '🍰',
        description: 'Baked goods, jams, sauces, honey, and custom gift baskets'
    },
    'Digital Products': {
        emoji: '🎨',
        description: 'Art prints, digital illustrations, DIY tutorials, and online courses'
    }
};

/**
 * Create product card HTML
 * @param {Object} product - Product data object
 * @returns {String} HTML string for product card
 */
function createProductHTML(product) {
    return `
        <div class="product-item">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge">-${product.discount}%</span>
            </div>
            <h3>${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="price-section">
                <span class="price">₹${product.price}</span>
                <span class="original-price">₹${product.originalPrice}</span>
            </div>
            <button class="add-btn" onclick="addToCart(${product.id})" title="Add to cart">Add to Cart</button>
        </div>
    `;
}

/**
 * Search and filter products
 * @param {String} query - Search query string
 */
function searchProducts(query) {
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery === '') {
        displayAllProducts();
        return;
    }

    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
    );

    displayFilteredProducts(filtered, normalizedQuery);
}

/**
 * Display all products organized by category
 */
function displayAllProducts() {
    const container = document.querySelector('.products-container');
    
    if (!container) {
        console.error('Products container not found');
        return;
    }

    // Group products by category
    const categories = {
        'Personal Care': [],
        'Home Decor': [],
        'Fashion & Accessories': [],
        'Edibles': [],
        'Digital Products': []
    };

    products.forEach(product => {
        if (categories[product.category]) {
            categories[product.category].push(product);
        }
    });

    let html = '';

    Object.entries(categories).forEach(([categoryName, categoryProducts]) => {
        const config = categoryConfig[categoryName];
        if (config && categoryProducts.length > 0) {
            html += `
                <section class="category-section">
                    <div class="category-header">
                        <h2>${config.emoji} ${categoryName}</h2>
                        <p>${config.description}</p>
                    </div>
                    <div class="products-row">
                        ${categoryProducts.map(product => createProductHTML(product)).join('')}
                    </div>
                </section>
            `;
        }
    });

    container.innerHTML = html;
}

/**
 * Display filtered search results
 * @param {Array} filtered - Filtered products array
 * @param {String} query - Search query string
 */
function displayFilteredProducts(filtered, query) {
    const container = document.querySelector('.products-container');
    
    if (!container) {
        console.error('Products container not found');
        return;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <section class="category-section">
                <div class="no-results">
                    <h2>No products found for "<strong>${escapeHtml(query)}</strong>"</h2>
                    <p>Try searching with different keywords or browse all products</p>
                    <button class="reset-btn" onclick="resetSearch()">View All Products</button>
                </div>
            </section>
        `;
        return;
    }

    const html = `
        <section class="category-section">
            <div class="category-header">
                <h2>Search Results</h2>
                <p>Found ${filtered.length} product${filtered.length !== 1 ? 's' : ''} for "<strong>${escapeHtml(query)}</strong>"</p>
            </div>
            <div class="products-row">
                ${filtered.map(product => createProductHTML(product)).join('')}
            </div>
        </section>
    `;

    container.innerHTML = html;
}

/**
 * Escape HTML special characters
 * @param {String} text - Text to escape
 * @returns {String} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Add product to cart
 * @param {Number} productId - Product ID
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`✓ Added "${product.name}" to cart!`);
        // Store in localStorage if needed
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

/**
 * Reset search and display all products
 */
function resetSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    displayAllProducts();
}

/**
 * Update cart count in header
 */
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }

    // Real-time search on input
    searchInput.addEventListener('input', function(e) {
        searchProducts(e.target.value);
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchProducts(e.target.value);
        }
    });
}

/**
 * Initialize page on DOM ready
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        displayAllProducts();
        initializeSearch();
        updateCartCount();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});

