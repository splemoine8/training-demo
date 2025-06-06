// Internationalization module for ProTrainers Academy
// Handles language switching and translation management

export class I18n {
    constructor() {
        this.currentLang = 'en';
    }

    init(router) {
        this.router = router;
        this.setupLanguageToggle();
        this.loadTranslations();
    }

    setupLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        const mobileLangToggle = document.getElementById('mobile-lang-toggle');
        
        const handleLanguageToggle = () => {
            this.toggleLanguage();
        };
        
        if (langToggle) {
            langToggle.addEventListener('click', handleLanguageToggle);
        }
        
        if (mobileLangToggle) {
            mobileLangToggle.addEventListener('click', handleLanguageToggle);
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
        document.body.classList.toggle('german', this.currentLang === 'de');
        
        // Update document language for screen readers
        document.documentElement.lang = this.currentLang;
        
        // Update all translatable elements
        this.updateTranslations();
        
        // Update meta description for current page
        if (this.router) {
            this.router.updateMetaDescription();
        }
        
        // Store language preference
        localStorage.setItem('preferred-language', this.currentLang);
    }

    updateTranslations() {
        const elements = document.querySelectorAll('[data-en][data-de]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    loadTranslations() {
        // Load saved language preference
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && savedLang !== this.currentLang) {
            this.currentLang = savedLang;
            document.body.classList.toggle('german', this.currentLang === 'de');
            document.documentElement.lang = this.currentLang;
            this.updateTranslations();
        }
    }

    updateModalTranslations(container) {
        const elements = container.querySelectorAll('[data-en][data-de]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    showToast(message, type = 'info') {
        Toastify({
            text: message,
            duration: 5000,
            gravity: "top",
            position: "right",
            className: `toast-${type}`,
            stopOnFocus: true,
            offset: {
                y: 80  // Push down below sticky nav
            }
        }).showToast();
    }
}