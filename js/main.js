/**
 * AgentLab Website Main JavaScript
 * Handles navigation, forms, news filtering, and interactive features
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeNewsFiltering();
    initializeFormValidation();
    initializeInteractiveFeatures();
});

/**
 * NAVIGATION FUNCTIONALITY
 */
function initializeNavigation() {
    // Create mobile menu toggle button
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert mobile menu button
        nav.insertBefore(mobileMenuBtn, navLinks);
        
        // Add mobile menu functionality
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('nav-open');
            
            if (isOpen) {
                navLinks.classList.remove('nav-open');
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                navLinks.classList.add('nav-open');
                mobileMenuBtn.innerHTML = '✕';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navLinks.classList.contains('nav-open')) {
                navLinks.classList.remove('nav-open');
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('nav-open')) {
                navLinks.classList.remove('nav-open');
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Add mobile styles
    addMobileNavigationStyles();
}

function addMobileNavigationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .mobile-menu-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                flex-direction: column;
                gap: 0;
                padding: 1rem 0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-links.nav-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-links li {
                margin: 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .nav-links li:last-child {
                border-bottom: none;
            }
            
            .nav-links a {
                display: block;
                padding: 1rem 2rem;
                text-align: center;
                transition: background-color 0.3s;
            }
            
            .nav-links a:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * SMOOTH SCROLLING FUNCTIONALITY
 */
function initializeSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#' or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (navLinks && navLinks.classList.contains('nav-open')) {
                    navLinks.classList.remove('nav-open');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '☰';
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Smooth scroll to target
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    createBackToTopButton();
}

function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.display = 'none';
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top:hover {
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * NEWS FILTERING FUNCTIONALITY
 */
function initializeNewsFiltering() {
    const newsGrid = document.getElementById('newsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');
    
    if (!newsGrid || !filterButtons.length) return;
    
    // Enhanced filtering with animation
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const newsCards = document.querySelectorAll('.news-card');
            let visibleCards = 0;
            
            // Fade out all cards first
            newsCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
            
            // Show/hide cards after fade out
            setTimeout(() => {
                newsCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        visibleCards++;
                        
                        // Stagger the fade in animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show/hide no results message
                if (visibleCards === 0) {
                    noResults.style.display = 'block';
                    noResults.style.opacity = '0';
                    setTimeout(() => {
                        noResults.style.opacity = '1';
                    }, 100);
                } else {
                    noResults.style.display = 'none';
                }
            }, 200);
        });
    });
    
    // Add transition styles for news cards
    const style = document.createElement('style');
    style.textContent = `
        .news-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .no-results {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * FORM VALIDATION FUNCTIONALITY
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error state when user starts typing
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
    
    // Required field validation
    if (required && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    // Phone validation
    else if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    // URL validation
    else if (type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            errorMessage = 'Please enter a valid URL';
            isValid = false;
        }
    }
    // Textarea minimum length
    else if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
        errorMessage = 'Please provide at least 10 characters';
        isValid = false;
    }
    
    // Show error message
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

/**
 * INTERACTIVE FEATURES
 */
function initializeInteractiveFeatures() {
    // Lazy loading for images
    initializeLazyLoading();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Copy to clipboard functionality
    initializeCopyToClipboard();
    
    // Loading states for buttons
    initializeLoadingStates();
    
    // Search functionality
    initializeSearch();
    
    // Theme toggle (if needed)
    initializeThemeToggle();
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add default animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error {
            border: 2px solid #e74c3c !important;
            background-color: #fdf2f2 !important;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.25rem;
            display: block;
        }
    `;
    document.head.appendChild(style);
}

function initializeCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('Copied to clipboard!');
                }).catch(() => {
                    fallbackCopyTextToClipboard(textToCopy);
                });
            } else {
                fallbackCopyTextToClipboard(textToCopy);
            }
        });
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!');
    } catch (err) {
        showToast('Copy failed. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
}

function initializeLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"], .btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && !this.form.checkValidity()) {
                return;
            }
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Re-enable button after a delay (adjust as needed)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
        let searchTimeout;
        
        input.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
    });
}

function performSearch(query) {
    // Basic search implementation
    const searchableElements = document.querySelectorAll('[data-searchable]');
    
    if (!query.trim()) {
        searchableElements.forEach(element => {
            element.style.display = '';
        });
        return;
    }
    
    const searchTerm = query.toLowerCase();
    
    searchableElements.forEach(element => {
        const content = element.textContent.toLowerCase();
        if (content.includes(searchTerm)) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Save preference
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

/**
 * UTILITY FUNCTIONS
 */
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        }
        
        .toast.show {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    
    if (!document.querySelector('style[data-toast]')) {
        style.setAttribute('data-toast', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global functions for backward compatibility
window.loadMoreNews = function() {
    // Enhanced load more functionality
    const newsGrid = document.getElementById('newsGrid');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading more content
        setTimeout(() => {
            showToast('No more articles to load');
            loadMoreBtn.textContent = 'Load More Articles';
            loadMoreBtn.disabled = false;
        }, 1000);
    }
};

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Initialize performance optimizations
    if ('serviceWorker' in navigator) {
        // Register service worker for caching (if needed)
        // navigator.serviceWorker.register('/sw.js');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && navLinks.classList.contains('nav-open')) {
            navLinks.classList.remove('nav-open');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.focus();
            }
        }
    }
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeSmoothScrolling,
        initializeNewsFiltering,
        initializeFormValidation,
        initializeInteractiveFeatures,
        showToast,
        debounce
    };
}