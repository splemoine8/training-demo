// ProTrainers Academy - Main JavaScript
// Modular architecture with ES6 imports

import { Router } from './router.js';
import { I18n } from './i18n.js';
import { Calendar } from './calendar.js';

class ProTrainersApp {
    constructor() {
        this.router = new Router();
        this.i18n = new I18n();
        this.calendar = new Calendar();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupClientLogin();
        this.initCounterAnimation();
        
        // Initialize modules
        this.i18n.init(this.router);
        this.router.init(this.i18n, this.calendar);
        this.calendar.init(this.i18n);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    setupClientLogin() {
        const clientLoginBtn = document.getElementById('client-login');
        const mobileClientLoginBtn = document.getElementById('mobile-client-login');
        
        const handleLogin = () => {
            const message = this.i18n.currentLang === 'de' 
                ? 'Kunden-Login wird bald verfügbar sein! Für sofortigen Zugang kontaktieren Sie uns bitte unter: info@protrainers-academy.com'
                : 'Client login coming soon! For immediate access, please contact us at: info@protrainers-academy.com';
            
            this.i18n.showToast(message, 'info');
        };
        
        if (clientLoginBtn) {
            clientLoginBtn.addEventListener('click', handleLogin);
        }
        
        if (mobileClientLoginBtn) {
            mobileClientLoginBtn.addEventListener('click', handleLogin);
        }
    }

    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    }

    initCounterAnimation() {
        // Set up intersection observer for counter animation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    this.animateCounters();
                    entry.target.dataset.animated = 'true';
                }
            });
        }, observerOptions);

        const outcomesSection = document.getElementById('outcomes-section');
        if (outcomesSection) {
            observer.observe(outcomesSection);
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(easeOutQuart * target);
                
                counter.textContent = currentValue + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '%';
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
    }
}

// Initialize the application
const app = new ProTrainersApp();

// Expose app instance for debugging
window.ProTrainersApp = app;