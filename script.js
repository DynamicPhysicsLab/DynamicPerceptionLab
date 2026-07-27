/**
 * Dynamic Perception Lab - Main JavaScript
 * Navigation, section management, and interactive elements
 */

// ============================================
// NAVIGATION & SECTION MANAGEMENT
// ============================================

/**
 * Initialize navigation click handlers
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
            navigateToSection(sectionId);
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
}

/**
 * Navigate to a specific section and update active states
 * @param {string} sectionId - The ID of the section to navigate to
 */
function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Remove active class from all sections and nav links
    document.querySelectorAll('section, nav a').forEach(el => {
        el.classList.remove('active');
    });
    
    // Add active class to current section and nav link
    section.classList.add('active');
    const activeLink = document.querySelector(`nav a[data-section="${sectionId}"], nav a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to section
    section.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (!mobileToggle) return;
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    
    if (!mobileToggle || !nav) return;
    
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileToggle && nav) {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
    }
}

// ============================================
// HEADER STYLING ON SCROLL
// ============================================

/**
 * Update header styling based on active section
 */
function updateHeaderOnScroll() {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    
    if (!header) return;
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update section active state
                sections.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');
                
                // Update nav link active state
                const sectionId = entry.target.id;
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    const linkTarget = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
                    if (linkTarget === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => observer.observe(section));
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// FORM HANDLING (if present)
// ============================================

/**
 * Initialize form submission handlers
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

/**
 * Handle form submission
 * @param {Event} e - The submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Here you can add your form submission logic
    console.log('Form submitted with data:', Object.fromEntries(formData));
    
    // Example: Show success message
    // form.innerHTML = '<p>Thank you for your message!</p>';
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.research-card, .team-member, .alumni-card');
    
    if ('IntersectionObserver' in window) {
        const animator = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                    animator.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => animator.observe(el));
    }
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

/**
 * Enhance keyboard navigation
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        // Skip to main content on Tab
        if (e.key === 'Tab' && e.ctrlKey) {
            const main = document.querySelector('main');
            if (main) {
                main.focus();
            }
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    console.log('Dynamic Perception Lab initialized');
    
    initNavigation();
    initMobileMenu();
    updateHeaderOnScroll();
    initLazyLoading();
    initForms();
    initScrollAnimations();
    initKeyboardNavigation();
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle orientation changes on mobile
window.addEventListener('orientationchange', () => {
    closeMobileMenu();
});
