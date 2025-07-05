// Language Toggle Functionality
class LanguageManager {
    constructor() {
        this.currentLang = 'ar';
        this.init();
    }

    init() {
        this.langToggle = document.getElementById('lang-toggle');
        this.langToggle.addEventListener('click', () => this.toggleLanguage());
        this.updateContent();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.updateContent();
        this.updateDirection();
        this.updateToggleButton();
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-ar][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    updateDirection() {
        const html = document.documentElement;
        const body = document.body;
        
        // Always keep RTL direction for Arabic layout
        html.setAttribute('lang', this.currentLang);
        html.setAttribute('dir', 'rtl');
        
        if (this.currentLang === 'en') {
            body.classList.add('en');
        } else {
            body.classList.remove('en');
        }
    }

    updateToggleButton() {
        const langText = this.langToggle.querySelector('.lang-text');
        langText.textContent = this.currentLang === 'ar' ? 'EN' : 'AR';
    }
}

// Navigation Menu Toggle
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.navToggle.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        const icon = this.navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        const icon = this.navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll to Top Button
class ScrollToTop {
    constructor() {
        this.init();
    }

    init() {
        this.scrollTopBtn = document.getElementById('scroll-top');
        
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.scrollTopBtn.classList.add('show');
        } else {
            this.scrollTopBtn.classList.remove('show');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Active Navigation Link
class ActiveNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        const scrollPosition = window.pageYOffset + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        this.form = document.getElementById('contact-form');
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            this.showMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
        this.form.reset();
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message
        this.form.insertBefore(messageDiv, this.form.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, options);

        // Observe elements
        const elementsToAnimate = document.querySelectorAll('.service-card, .contact-item, .vision, .mission');
        elementsToAnimate.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    constructor() {
        this.init();
    }

    init() {
        this.header = document.querySelector('.header');
        window.addEventListener('scroll', () => this.updateHeader());
    }

    updateHeader() {
        if (window.pageYOffset > 100) {
            this.header.style.background = 'rgba(255, 255, 255, 0.98)';
            this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.header.style.background = 'rgba(255, 255, 255, 0.95)';
            this.header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
}

// Service Cards Hover Effect
class ServiceCardsEffect {
    constructor() {
        this.init();
    }

    init() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new NavigationManager();
    new SmoothScroll();
    new ScrollToTop();
    new ActiveNavigation();
    new ContactForm();
    new AnimationObserver();
    new HeaderScrollEffect();
    new ServiceCardsEffect();
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) {
            const navManager = new NavigationManager();
            navManager.closeMenu();
        }
    }
});

// Touch Support for Mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);


// Gallery functionality
function changeMainImage(thumbnail) {
    const mainImage = document.querySelector('.gallery-main-image');
    const allThumbs = document.querySelectorAll('.gallery-thumb');
    
    // Update main image
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;
    
    // Update active thumbnail
    allThumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
    
    // Add animation effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 150);
}



// WhatsApp Contact Function
function contactWhatsApp(serviceName) {
    const phoneNumber = '905360668950';
    const messages = {
        'تنظيم الرحلات': 'مرحباً، أرغب في الاستفسار عن خدمة تنظيم الرحلات السياحية.',
        'حجز الفنادق': 'مرحباً، أرغب في الاستفسار عن خدمة حجز الفنادق.',
        'تذاكر الطيران': 'مرحباً، أرغب في الاستفسار عن خدمة حجز تذاكر الطيران.',
        'تأجير السيارات': 'مرحباً، أرغب في الاستفسار عن خدمة تأجير السيارات.',
        'استشارات أكاديمية': 'مرحباً، أرغب في الاستفسار عن خدمة الاستشارات الأكاديمية.',
        'قبولات جامعية': 'مرحباً، أرغب في الاستفسار عن خدمة القبولات الجامعية.',
        'دورات اللغة': 'مرحباً، أرغب في الاستفسار عن دورات اللغة الإنجليزية.',
        'الاستثمار العقاري': 'مرحباً، أرغب في الاستفسار عن خدمات الاستثمار العقاري.',
        'الاستثمار في الأسهم': 'مرحباً، أرغب في الاستفسار عن خدمات الاستثمار في الأسهم.',
        'الشراكات التجارية': 'مرحباً، أرغب في الاستفسار عن فرص الشراكات التجارية.',
        'الاستثمار الذهبي': 'مرحباً، أرغب في الاستفسار عن خدمات الاستثمار في الذهب.',
        'تأمين السفر': 'مرحباً، أرغب في الاستفسار عن خدمة تأمين السفر.',
        'التأمين الصحي': 'مرحباً، أرغب في الاستفسار عن خدمة التأمين الصحي.',
        'تأمين السيارات': 'مرحباً، أرغب في الاستفسار عن خدمة تأمين السيارات.',
        'تأمين الممتلكات': 'مرحباً، أرغب في الاستفسار عن خدمة تأمين الممتلكات.',
        'تأمين الحياة': 'مرحباً، أرغب في الاستفسار عن خدمة تأمين الحياة.',
        'التأمين التجاري': 'مرحباً، أرغب في الاستفسار عن خدمات التأمين التجاري.',
        'تجهيز ملفات الإقامة': 'مرحباً، أرغب في الاستفسار عن خدمة تجهيز ملفات الإقامة.'
    };
    
    const message = messages[serviceName] || `مرحباً، أرغب في الاستفسار عن خدمة ${serviceName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Enhanced Footer Links Functionality
class FooterLinksManager {
    constructor() {
        this.init();
    }

    init() {
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleFooterLinkClick(e));
        });
    }

    handleFooterLinkClick(e) {
        const link = e.target;
        const href = link.getAttribute('href');
        
        // If it's an internal anchor link
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // If it's a link to index.html with anchor
        else if (href.includes('index.html#')) {
            e.preventDefault();
            const [page, anchor] = href.split('#');
            
            // If we're already on the index page
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                const targetElement = document.getElementById(anchor);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Navigate to index page with anchor
                window.location.href = href;
            }
        }
        // For other links, let them work normally
    }
}

// Service Cards Click Enhancement
class ServiceCardsClickManager {
    constructor() {
        this.init();
    }

    init() {
        const serviceCards = document.querySelectorAll('.feature-card');
        serviceCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            });
        });
    }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new NavigationManager();
    new SmoothScroll();
    new ScrollToTop();
    new ActiveNavigation();
    new ContactForm();
    new AnimationObserver();
    new HeaderScrollEffect();
    new ServiceCardsEffect();
    new FooterLinksManager();
    new ServiceCardsClickManager();
});

