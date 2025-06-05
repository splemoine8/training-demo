// ProTrainers Academy - Main JavaScript

class ProTrainersApp {
    constructor() {
        this.currentLang = 'en';
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupLanguageToggle();
        this.setupMobileMenu();
        this.setupClientLogin();
        this.loadTranslations();
        this.initCounterAnimation();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.showPage('home');
        });

        window.addEventListener('resize', () => {
            this.handleResize();
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

    showPage(pageId) {
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
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update page title
            this.updatePageTitle(pageId);
            
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
        
        // Update all translatable elements
        this.updateTranslations();
        
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
            this.updateTranslations();
        }
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

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }

    setupClientLogin() {
        const clientLoginBtn = document.getElementById('client-login');
        const mobileClientLoginBtn = document.getElementById('mobile-client-login');
        
        const handleLogin = () => {
            const message = this.currentLang === 'de' 
                ? 'Kunden-Login wird bald verfügbar sein! Für sofortigen Zugang kontaktieren Sie uns bitte unter: info@protrainers-academy.com'
                : 'Client login coming soon! For immediate access, please contact us at: info@protrainers-academy.com';
            
            this.showToast(message, 'info');
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
            this.closeMobileMenu();
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
            this.setupCalendarBooking();
            contactPage.dataset.loaded = 'true';
        }
    }

    setupCalendarBooking() {
        // Initialize the new calendar booking widget
        this.initCalendarWidget();
    }

    openCalendarBooking() {
        // For demo purposes, we'll show a modal with calendar options
        // In production, this would integrate with Calendly, Acuity, or similar
        
        const modal = this.createCalendarModal();
        document.body.appendChild(modal);
        
        // In production, you would replace this with:
        // Option 1: Calendly embed
        // window.open('https://calendly.com/your-username/consultation', '_blank');
        
        // Option 2: Calendly popup
        // Calendly.initPopupWidget({url: 'https://calendly.com/your-username/consultation'});
        
        // Option 3: Acuity Scheduling
        // window.open('https://app.acuityscheduling.com/schedule.php?owner=your-id', '_blank');
    }

    createCalendarModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-lg p-8 max-w-md mx-4';
        modalContent.innerHTML = `
            <div class="text-center">
                <span class="text-4xl mb-4 block">📅</span>
                <h3 class="text-xl font-bold mb-4" data-en="Schedule Your Consultation" data-de="Beratungstermin Vereinbaren">Schedule Your Consultation</h3>
                <p class="text-gray-600 mb-6" data-en="Choose your preferred booking method:" data-de="Wählen Sie Ihre bevorzugte Buchungsmethode:">Choose your preferred booking method:</p>
                <div class="space-y-3">
                    <button class="w-full btn-primary calendar-btn" data-method="calendly" data-en="Book via Calendly" data-de="Über Calendly Buchen">Book via Calendly</button>
                    <button class="w-full btn-secondary calendar-btn" data-method="email" data-en="Request via Email" data-de="Per E-Mail Anfragen">Request via Email</button>
                    <button class="w-full btn-secondary calendar-btn" data-method="phone" data-en="Call to Schedule" data-de="Anrufen zum Vereinbaren">Call to Schedule</button>
                </div>
                <button class="mt-4 text-gray-500 hover:text-gray-700 close-modal" data-en="Close" data-de="Schließen">Close</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        
        // Add event listeners
        modalContent.querySelectorAll('.calendar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const method = btn.getAttribute('data-method');
                this.openExternalCalendar(method);
                modal.remove();
            });
        });
        
        modalContent.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Update translations if in German mode
        if (this.currentLang === 'de') {
            this.updateModalTranslations(modalContent);
        }
        
        return modal;
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

    openExternalCalendar(method) {
        switch (method) {
            case 'calendly':
                // In production, replace with your actual Calendly URL
                window.open('https://calendly.com/protrainers-academy/consultation', '_blank');
                break;
            case 'email':
                window.location.href = 'mailto:info@protrainers-academy.com?subject=Consultation Request&body=Hello, I would like to schedule a free consultation to discuss my training needs.';
                break;
            case 'phone':
                window.location.href = 'tel:+493012345678';
                break;
        }
    }

    // Utility methods
    showLoading(element) {
        if (element) {
            const originalText = element.textContent;
            element.innerHTML = '<div class="booking-spinner"></div>Scheduling...';
            element.disabled = true;
            element.dataset.originalText = originalText;
        }
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

    // Form handling
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
        // In production, replace this with actual form handler (e.g., Netlify Forms, Formspree, or custom backend)
        
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
        
        // Example integration options (uncomment and configure as needed):
        
        // Option 1: Netlify Forms (if hosting on Netlify)
        // return fetch('/', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //     body: new URLSearchParams(formData).toString()
        // });
        
        // Option 2: Formspree
        // return fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     body: formData,
        //     headers: { 'Accept': 'application/json' }
        // });
        
        // Option 3: EmailJS
        // return emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY');
    }

    // Analytics and tracking
    trackPageView(pageId) {
        // Add analytics tracking here
        console.log(`Page view: ${pageId}`);
        
        // Example Google Analytics 4 tracking
        // if (typeof gtag !== 'undefined') {
        //     gtag('config', 'GA_MEASUREMENT_ID', {
        //         page_title: this.getPageTitle(pageId),
        //         page_location: window.location.href
        //     });
        // }
        
        // Example Facebook Pixel tracking
        // if (typeof fbq !== 'undefined') {
        //     fbq('track', 'PageView');
        // }
    }

    trackEvent(action, category, label) {
        // Add event tracking here
        console.log(`Event: ${action} - ${category} - ${label}`);
        
        // Example Google Analytics 4 event tracking
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         event_category: category,
        //         event_label: label
        //     });
        // }
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

    // Calendar Widget Methods
    initCalendarWidget() {
        // Calendar widget state
        this.calendarState = {
            currentDate: new Date(),
            selectedDate: null,
            selectedTime: null,
            step: 'date', // 'date', 'time', 'details', 'success'
            availableDates: [9, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 30],
            timeSlots: [
                '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
                '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
                '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
            ]
        };

        this.setupCalendarEventListeners();
        this.renderCalendarDays();
    }

    setupCalendarEventListeners() {
        // Month navigation
        document.getElementById('prev-month')?.addEventListener('click', () => {
            this.calendarState.currentDate.setMonth(this.calendarState.currentDate.getMonth() - 1);
            this.renderCalendarDays();
            this.updateMonthDisplay();
        });

        document.getElementById('next-month')?.addEventListener('click', () => {
            this.calendarState.currentDate.setMonth(this.calendarState.currentDate.getMonth() + 1);
            this.renderCalendarDays();
            this.updateMonthDisplay();
        });

        // Step navigation
        document.getElementById('back-to-date')?.addEventListener('click', () => {
            this.showStep('date');
        });

        document.getElementById('back-to-time')?.addEventListener('click', () => {
            this.showStep('time');
        });

        // Form submission
        document.getElementById('booking-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmit();
        });

        // Book another button
        document.getElementById('book-another')?.addEventListener('click', () => {
            this.resetBookingWidget();
        });
    }

    renderCalendarDays() {
        const calendarDays = document.getElementById('calendar-days');
        if (!calendarDays) return;

        const year = this.calendarState.currentDate.getFullYear();
        const month = this.calendarState.currentDate.getMonth();
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            calendarDays.appendChild(emptyCell);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'relative py-2';
            
            const dayButton = document.createElement('button');
            dayButton.className = 'mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm transition-all duration-200';
            dayButton.textContent = day;

            const isAvailable = this.calendarState.availableDates.includes(day);
            const isToday = day === 5; // June 5th is today for demo

            if (isAvailable) {
                dayButton.className += ' hover:bg-primary hover:text-white text-primary bg-blue-50 hover:scale-110 hover:shadow-md cursor-pointer';
                dayButton.addEventListener('click', () => this.selectDate(day));
            } else {
                dayButton.className += ' text-gray-400 cursor-not-allowed';
                dayButton.disabled = true;
            }

            if (isToday) {
                dayButton.className += ' ring-2 ring-primary ring-offset-2';
            }

            dayCell.appendChild(dayButton);
            calendarDays.appendChild(dayCell);
        }

        this.updateMonthDisplay();
    }

    updateMonthDisplay() {
        const monthDisplay = document.getElementById('current-month');
        if (monthDisplay) {
            const options = { month: 'long', year: 'numeric' };
            monthDisplay.textContent = this.calendarState.currentDate.toLocaleDateString('en-US', options);
        }
    }

    selectDate(day) {
        this.calendarState.selectedDate = day;
        this.renderTimeSlots();
        this.showStep('time');
        
        // Update selected date display
        const dateDisplay = document.getElementById('selected-date-display');
        if (dateDisplay) {
            const selectedDate = new Date(this.calendarState.currentDate.getFullYear(), this.calendarState.currentDate.getMonth(), day);
            dateDisplay.textContent = selectedDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    }

    renderTimeSlots() {
        const timeSlotsContainer = document.getElementById('time-slots');
        if (!timeSlotsContainer) return;

        timeSlotsContainer.innerHTML = '';

        this.calendarState.timeSlots.forEach(time => {
            const timeButton = document.createElement('button');
            timeButton.className = 'time-slot justify-start py-4 px-4 text-left border border-gray-300 rounded-md hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md';
            timeButton.textContent = time;
            timeButton.addEventListener('click', () => this.selectTime(time));
            timeSlotsContainer.appendChild(timeButton);
        });
    }

    selectTime(time) {
        this.calendarState.selectedTime = time;
        this.updateBookingSummary();
        this.showStep('details');
    }

    updateBookingSummary() {
        const summaryDate = document.getElementById('booking-summary-date');
        const summaryTime = document.getElementById('booking-summary-time');
        
        if (summaryDate && summaryTime) {
            const selectedDate = new Date(this.calendarState.currentDate.getFullYear(), this.calendarState.currentDate.getMonth(), this.calendarState.selectedDate);
            summaryDate.textContent = selectedDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
            summaryTime.textContent = `${this.calendarState.selectedTime} - Central European Time`;
        }
    }

    showStep(step) {
        this.calendarState.step = step;
        
        // Hide all steps
        document.querySelectorAll('.booking-step').forEach(stepEl => {
            stepEl.classList.add('hidden');
        });

        // Show current step
        const currentStep = document.getElementById(`${step}-step`);
        if (currentStep) {
            currentStep.classList.remove('hidden');
        }
    }

    handleBookingSubmit() {
        // Get form data
        const formData = {
            firstName: document.getElementById('booking-first-name').value,
            lastName: document.getElementById('booking-last-name').value,
            email: document.getElementById('booking-email').value,
            company: document.getElementById('booking-company').value,
            message: document.getElementById('booking-message').value,
            date: this.calendarState.selectedDate,
            time: this.calendarState.selectedTime
        };

        // Simulate booking submission
        this.showLoading(document.getElementById('schedule-btn'));
        
        setTimeout(() => {
            this.showBookingSuccess(formData);
        }, 2000);
    }

    showBookingSuccess(formData) {
        // Restore button state
        const submitBtn = document.getElementById('schedule-btn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Schedule Consultation';
        }

        // Update final summary with animation
        const finalSummary = document.getElementById('final-booking-summary');
        if (finalSummary) {
            const selectedDate = new Date(this.calendarState.currentDate.getFullYear(), this.calendarState.currentDate.getMonth(), this.calendarState.selectedDate);
            finalSummary.innerHTML = `
                <div class="mb-2">
                    <strong>Date:</strong> ${selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })}
                </div>
                <div class="mb-2">
                    <strong>Time:</strong> ${this.calendarState.selectedTime} (CET)
                </div>
                <div class="mb-2">
                    <strong>Attendee:</strong> ${formData.firstName} ${formData.lastName}
                </div>
                <div class="mb-2">
                    <strong>Email:</strong> ${formData.email}
                </div>
                ${formData.company ? `<div class="mb-2"><strong>Company:</strong> ${formData.company}</div>` : ''}
            `;
        }

        // Add success animation to check icon
        const checkIcon = document.querySelector('#success-step .fas.fa-check-circle');
        if (checkIcon) {
            checkIcon.classList.add('success-check');
        }

        this.showStep('success');
    }

    resetBookingWidget() {
        // Reset state
        this.calendarState.selectedDate = null;
        this.calendarState.selectedTime = null;
        this.calendarState.step = 'date';
        
        // Clear form
        document.getElementById('booking-form')?.reset();
        
        // Show date step
        this.showStep('date');
    }
}

// Initialize the application
const app = new ProTrainersApp();

// Expose app instance for debugging
window.ProTrainersApp = app;