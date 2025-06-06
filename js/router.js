// Router module for ProTrainers Academy
// Handles page navigation, URL management, and browser history

export class Router {
    constructor() {
        this.currentPage = 'home';
        this.metaDescriptions = {
            home: {
                en: 'ProTrainers Academy - Professional business training and development solutions for corporate success and leadership excellence.',
                de: 'ProTrainers Academy - Professionelle Unternehmensschulungen und Entwicklungslösungen für unternehmerischen Erfolg und Führungsexzellenz.'
            },
            trainers: {
                en: 'Meet our expert business trainers with decades of experience in corporate training and professional development.',
                de: 'Lernen Sie unsere erfahrenen Unternehmenstrainer mit jahrzehntelanger Erfahrung in Unternehmensschulungen und beruflicher Entwicklung kennen.'
            },
            method: {
                en: 'Discover our proven training methodology combining theory with practical application for lasting business transformation.',
                de: 'Entdecken Sie unsere bewährte Trainingsmethodik, die Theorie mit praktischer Anwendung für nachhaltige Unternehmenstransformation verbindet.'
            },
            resources: {
                en: 'Access comprehensive training resources, tools, and materials to support your professional development journey.',
                de: 'Zugang zu umfassenden Trainingsressourcen, Tools und Materialien zur Unterstützung Ihrer beruflichen Entwicklungsreise.'
            },
            contact: {
                en: 'Get in touch with ProTrainers Academy to discuss your training needs and schedule a consultation.',
                de: 'Kontaktieren Sie die ProTrainers Academy, um Ihre Schulungsbedürfnisse zu besprechen und eine Beratung zu vereinbaren.'
            }
        };
    }

    init(i18n, calendar) {
        this.i18n = i18n;
        this.calendar = calendar;
        this.setupEventListeners();
        this.setupNavigation();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeFromURL();
        });

        // Handle browser back/forward navigation
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.showPage(event.state.page, false); // false = don't update history
            } else {
                // Handle direct URL access or no state
                this.initializeFromURL();
            }
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) {
                    this.showPage(page);
                    this.setActiveNavLink(link);
                    this.closeMobileMenu();
                }
            });
        });
    }

    showPage(pageId, updateHistory = true) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Update browser history and URL
            if (updateHistory) {
                const url = pageId === 'home' ? '/' : `#${pageId}`;
                history.pushState({page: pageId}, '', url);
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update page title
            this.updatePageTitle(pageId);
            
            // Update meta description
            this.updateMetaDescription();
            
            // Track page view
            this.trackPageView(pageId);
            
            // Load page-specific content if needed
            this.loadPageContent(pageId);
        }
    }

    setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Set active class on all nav links with the same data-page
        const page = activeLink.getAttribute('data-page');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    updatePageTitle(pageId) {
        const pageTitles = {
            home: 'ProTrainers Academy - Professional Business Training',
            trainers: 'Our Expert Trainers - ProTrainers Academy',
            method: 'Our Proven Method - ProTrainers Academy',
            resources: 'Training Resources - ProTrainers Academy',
            contact: 'Contact Us - ProTrainers Academy'
        };
        
        document.title = pageTitles[pageId] || 'ProTrainers Academy';
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }

    loadPageContent(pageId) {
        switch (pageId) {
            case 'trainers':
                this.loadTrainersContent();
                break;
            case 'method':
                this.loadMethodContent();
                break;
            case 'resources':
                this.loadResourcesContent();
                break;
            case 'contact':
                this.loadContactContent();
                break;
        }
    }

    loadTrainersContent() {
        const trainersPage = document.getElementById('trainers-page');
        if (trainersPage && !trainersPage.dataset.loaded) {
            // Add trainers content here
            trainersPage.dataset.loaded = 'true';
        }
    }

    loadMethodContent() {
        const methodPage = document.getElementById('method-page');
        if (methodPage && !methodPage.dataset.loaded) {
            // Add method content here
            methodPage.dataset.loaded = 'true';
        }
    }

    loadResourcesContent() {
        const resourcesPage = document.getElementById('resources-page');
        if (resourcesPage && !resourcesPage.dataset.loaded) {
            // Add resources content here
            resourcesPage.dataset.loaded = 'true';
        }
    }

    loadContactContent() {
        const contactPage = document.getElementById('contact-page');
        if (contactPage && !contactPage.dataset.loaded) {
            // Set up contact form
            this.setupContactForm();
            // Set up calendar booking
            if (this.calendar) {
                this.calendar.initCalendarWidget();
            }
            contactPage.dataset.loaded = 'true';
        }
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmit(e.target);
            });
        }
    }

    async handleContactFormSubmit(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="spinner mr-2"></div>Sending...';
        
        try {
            // Simulate form submission (replace with actual form handler)
            await this.submitForm(formData);
            this.showSuccess(form.parentNode, 'Thank you! Your message has been sent successfully.');
            form.reset();
        } catch (error) {
            this.showError(form.parentNode, 'Sorry, there was an error sending your message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    async submitForm(formData) {
        // For demo purposes, we'll simulate form submission
        const formObject = {};
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Log form data for demo
        console.log('Form submission data:', formObject);
        
        // Simulate API call with better success rate for demo
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Higher success rate for demo purposes
                Math.random() > 0.05 ? resolve(formObject) : reject(new Error('Network error occurred'));
            }, 1500);
        });
    }

    showSuccess(element, message) {
        if (element) {
            element.innerHTML = `<div class="alert alert-success">${message}</div>`;
        }
    }

    showError(element, message) {
        if (element) {
            element.innerHTML = `<div class="alert alert-error">${message}</div>`;
        }
    }

    trackPageView(pageId) {
        // Add analytics tracking here
        console.log(`Page view: ${pageId}`);
    }

    trackEvent(action, category, label) {
        // Add event tracking here
        console.log(`Event: ${action} - ${category} - ${label}`);
    }

    initializeFromURL() {
        // Get page from URL hash or default to home
        const hash = window.location.hash.slice(1); // Remove # symbol
        const validPages = ['home', 'trainers', 'method', 'resources', 'contact'];
        const pageId = validPages.includes(hash) ? hash : 'home';
        
        this.showPage(pageId, false); // Don't update history on initial load
    }

    updateMetaDescription() {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && this.metaDescriptions[this.currentPage] && this.i18n) {
            const description = this.metaDescriptions[this.currentPage][this.i18n.currentLang];
            metaDescription.setAttribute('content', description);
        }
    }

    getPageTitle(pageId) {
        const pageTitles = {
            home: 'Home - ProTrainers Academy',
            trainers: 'Our Expert Trainers - ProTrainers Academy',
            method: 'Our Proven Method - ProTrainers Academy',
            resources: 'Training Resources - ProTrainers Academy',
            contact: 'Contact Us - ProTrainers Academy'
        };
        return pageTitles[pageId] || 'ProTrainers Academy';
    }
}