// Smooth scrolling function
function scrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Join Program buttons - All primary buttons with enrollment text
    const enrollButtons = document.querySelectorAll('.btn-primary');
    enrollButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('join') || 
            buttonText.includes('secure') || 
            buttonText.includes('enroll') ||
            buttonText.includes('start your journey')) {
            button.addEventListener('click', function(e) {
                // Prevent default if it's not already handled
                if (!button.hasAttribute('onclick')) {
                    e.preventDefault();
                    // Replace with actual signup form or contact method
                    const contactInfo = `
                        🎓 Join Our Trading Mentorship Program!
                        
                        📱 WhatsApp: +27 84 941 8774
                        📧 Email: info@tradingmentorship.com
                        
                        Contact us now to secure your spot!
                    `;
                    alert(contactInfo);
                    
                    // Optional: Open WhatsApp directly
                    // window.open('https://wa.me/27849418774?text=Hi, I\'m interested in joining the Trading Mentorship Program', '_blank');
                }
            });
        }
    });

    // "Ask Question" / "Contact Us" buttons
    const contactButtons = document.querySelectorAll('.btn-secondary, .btn-secondary-light');
    contactButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('question') || buttonText.includes('contact')) {
            button.addEventListener('click', function(e) {
                if (!button.hasAttribute('onclick')) {
                    e.preventDefault();
                    // Open WhatsApp
                    window.open('https://wa.me/27849418774?text=Hi, I have a question about the Trading Mentorship Program', '_blank');
                }
            });
        }
    });

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.step, .lesson-card, .benefit-card, .audience-card, .faq-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollTo(targetId);
            }
        });
    });

    // Add hover effect sound (optional - can be removed if not needed)
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-secondary') && !this.classList.contains('btn-secondary-light')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Add loading state to primary buttons on click
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            const hasSpinner = this.querySelector('.spinner');
            
            if (!hasSpinner) {
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 300);
            }
        });
    });
});

// Add CSS class for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
