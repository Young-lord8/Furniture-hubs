// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product Data
const products = [
    {
        id: 1,
        name: 'Modern Velvet Sofa',
        price: '$1,299',
        image: 'images/sofa1.jpg',
        category: 'sofas',
        description: 'Luxurious velvet sofa with premium cushioning for ultimate comfort. Perfect for modern living rooms.'
    },
    {
        id: 2,
        name: 'Scandinavian Coffee Table',
        price: '$299',
        image: 'images/table1.jpg',
        category: 'tables',
        description: 'Minimalist coffee table with natural oak finish. Perfect centerpiece for any living space.'
    },
    {
        id: 3,
        name: 'Ergonomic Office Chair',
        price: '$599',
        image: 'images/chair1.jpg',
        category: 'chairs',
        description: 'Premium office chair with adjustable lumbar support and breathable mesh backrest.'
    },
    {
        id: 4,
        name: 'Luxury Leather Sectional',
        price: '$2,499',
        image: 'images/sofa2.jpg',
        category: 'sofas',
        description: 'Spacious L-shaped sectional sofa in premium Italian leather. Seats 5 comfortably.'
    },
    {
        id: 5,
        name: 'Dining Table Set',
        price: '$899',
        image: 'images/table1.jpg',
        category: 'tables',
        description: 'Solid wood dining table with 6 chairs. Perfect for family gatherings.'
    },
    {
        id: 6,
        name: 'Accent Armchair',
        price: '$399',
        image: 'images/chair1.jpg',
        category: 'chairs',
        description: 'Stylish accent chair with plush velvet upholstery and gold legs.'
    }
];

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(products);
    setupCategoryFilters();
    setupContactForm();
    setupProductModal();
    updateCartCount();
});

// Load products into grid
function loadProducts(productList) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productList.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOGY4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <div class="product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span>(4.8)</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openProductModal(product));
    return card;
}

// Category filter functionality
function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProductsByCategory(category);
            
            // Visual feedback
            categoryCards.forEach(c => c.style.borderColor = 'transparent');
            this.style.borderColor = '#e74c3c';
        });
    });
}

function filterProductsByCategory(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    loadProducts(filteredProducts);
}

// Product Modal
function setupProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

let currentProduct = null;

function openProductModal(product) {
    currentProduct = product;
    
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOGY4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    };
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalProductDesc').textContent = product.description;
    
    document.getElementById('productModal').style.display = 'block';
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        addToCart(currentProduct);
    }
});

function addToCart(product) {
    const quantitySelect = document.getElementById('quantitySelect');
    const quantity = parseInt(quantitySelect.value);
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Visual feedback
    const button = document.querySelector('.add-to-cart');
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = totalItems;
}

// Contact Form
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .category-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Show "All Products" after 3 seconds
setTimeout(() => {
    const allCategory = document.createElement('div');
    allCategory.className = 'category-card';
    allCategory.dataset.category = 'all';
    allCategory.innerHTML = `
        <i class="fas fa-th-large"></i>
        <h3>All Products</h3>
        <p>Browse entire collection</p>
    `;
    allCategory.addEventListener('click', function() {
        loadProducts(products);
        document.querySelectorAll('.category-card').forEach(c => c.style.borderColor = 'transparent');
        this.style.borderColor = '#e74c3c';
    });
    
    const categoriesGrid = document.querySelector('.categories-grid');
    categoriesGrid.insertBefore(allCategory, categoriesGrid.firstChild);
}, 100);