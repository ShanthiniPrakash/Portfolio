/**
 * Shanthini Portfolio - Main JavaScript
 * Handles navigation, form submission, and smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileNav();
    initContactForm();
    initScrollAnimations();
});

/**
 * Navbar scroll effect - add/remove shadow on scroll
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Contact form handling - UI only (no backend)
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const message = form.querySelector('#message').value;

        // Simple validation (HTML5 handles most)
        if (!name.trim() || !email.trim() || !message.trim()) {
            showFormFeedback(form, 'Please fill in all fields.', 'error');
            return;
        }

        // Simulate form submission (no backend)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showFormFeedback(form, 'Thank you! Your message has been received. I will get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

/**
 * Display form feedback message
 */
function showFormFeedback(form, message, type) {
    // Remove existing feedback
    const existingFeedback = form.querySelector('.form-feedback');
    if (existingFeedback) existingFeedback.remove();

    const feedback = document.createElement('p');
    feedback.className = `form-feedback form-feedback--${type}`;
    feedback.textContent = message;
    form.appendChild(feedback);

    // Remove after 4 seconds
    setTimeout(() => feedback.remove(), 4000);
}

/**
 * Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-content, .skill-category, .project-card, .education-item, .achievements-block, .contact-wrapper'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    animatedElements.forEach(el => observer.observe(el));
}
