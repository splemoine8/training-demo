// Calendar booking module for ProTrainers Academy
// Handles the interactive calendar widget and booking functionality

export class Calendar {
    constructor() {
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
    }

    init(i18n) {
        this.i18n = i18n;
        this.initCalendarWidget();
    }

    initCalendarWidget() {
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
            
            // Add unique ID and ARIA label for accessibility
            const dateObj = new Date(year, month, day);
            const dateString = dateObj.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
            dayButton.id = `calendar-day-${year}-${month}-${day}`;
            dayButton.setAttribute('aria-label', `Select ${dateString}`);

            const isAvailable = this.calendarState.availableDates.includes(day);
            const isToday = day === 5; // June 5th is today for demo

            if (isAvailable) {
                dayButton.className += ' hover:bg-primary hover:text-white text-primary bg-blue-50 hover:scale-110 hover:shadow-md cursor-pointer';
                dayButton.setAttribute('aria-describedby', 'available-date-help');
                dayButton.addEventListener('click', () => this.selectDate(day));
            } else {
                dayButton.className += ' text-gray-400 cursor-not-allowed';
                dayButton.disabled = true;
                dayButton.setAttribute('aria-label', `${dateString} - Not available`);
            }

            if (isToday) {
                dayButton.className += ' ring-2 ring-primary ring-offset-2';
                dayButton.setAttribute('aria-label', `${dateString} - Today`);
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
            
            // Add ARIA attributes for screen readers
            if (!currentStep.getAttribute('role')) {
                currentStep.setAttribute('role', 'region');
            }
            if (!currentStep.getAttribute('aria-labelledby')) {
                // Set aria-labelledby to the step's heading
                const heading = currentStep.querySelector('h2, h3');
                if (heading && !heading.id) {
                    heading.id = `${step}-step-heading`;
                }
                if (heading) {
                    currentStep.setAttribute('aria-labelledby', heading.id);
                }
            }
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

    showLoading(element) {
        if (element) {
            const originalText = element.textContent;
            element.innerHTML = '<div class="booking-spinner"></div>Scheduling...';
            element.disabled = true;
            element.dataset.originalText = originalText;
        }
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

    openCalendarBooking() {
        // For demo purposes, we'll show a modal with calendar options
        const modal = this.createCalendarModal();
        document.body.appendChild(modal);
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
        if (this.i18n && this.i18n.currentLang === 'de') {
            this.i18n.updateModalTranslations(modalContent);
        }
        
        return modal;
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
}