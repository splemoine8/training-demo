# ProTrainers Academy – Professional SPA Website

*A fully-featured, responsive, bilingual single-page application (SPA) built with nothing but vanilla HTML, CSS, and JavaScript.*

![MIT Licence](https://img.shields.io/badge/License-MIT-blue.svg)
[![pages-build-deployment](https://github.com/splemoine8/training-demo/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/splemoine8/training-demo/actions/workflows/pages/pages-build-deployment)

[**🌐 Live Demo**](https://splemoine8.github.io/training-demo/)

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
   - [Architecture & Technical Excellence](#architecture--technical-excellence)  
   - [Interactive UI / UX](#interactive-ui--ux)  
3. [Technology Stack](#technology-stack)  
4. [Code Highlights](#code-highlights)  
5. [Getting Started](#getting-started)  
6. [Future Enhancements](#future-enhancements)

---

## Project Overview

**ProTrainers Academy** is a fictional corporate-training website that demonstrates how far you can push modern front-end techniques **without** resorting to a heavyweight framework. From client-side routing and stateful widgets to real-time internationalisation, every feature is hand-rolled to showcase clean architecture, performance optimisation, and polished user experience.

---

## Key Features

### Architecture & Technical Excellence

| Feature | Details |
|---------|---------|
| **Single-Page Application** | History API–driven router provides seamless navigation and clean URLs. |
| **Modular ES6 Classes** | Core logic split into `Router`, `I18n`, and `Calendar` for readability and scalability. |
| **SEO Friendly** | Dynamic `<title>` and meta-description updates on route change. |
| **Local State Management** | The calendar widget maintains its own step-based booking flow. |
| **Performance** | Lazy-loaded images, `IntersectionObserver`-powered animations, and purged Tailwind styles keep payloads small. |

### Interactive UI / UX

- **Custom Calendar Booking Widget** – multi-step date/slot picker with form validation and success state.  
- **Contact & Booking Forms** – real-time validation, loading/disabled states, and Toast notifications.  
- **Dynamic Internationalisation (i18n)** – instant English ↔ German toggle; preference is persisted in `localStorage`.  
- **Responsive Design** – mobile-first layout via Tailwind CSS, tested across breakpoints.  
- **Subtle Animations** – hover effects, smooth page transitions, and animated counters for a polished feel.

---

## Technology Stack

| Layer | Tools |
|-------|-------|
| Mark-up | **HTML 5** (semantic & accessible) |
| Styling | **Tailwind CSS** + custom CSS for animations |
| Logic   | **Vanilla JavaScript (ES6+)** |
| Icons   | Font Awesome |
| Notifications | Toastify.js |
| DevOps | Git & GitHub Pages (CI/CD via GitHub Actions) |

---

## Code Highlights

<details>
<summary><strong>Main Application Bootstrap (<code>js/main.js</code>)</strong></summary>

```js
import { Router }  from './router.js';
import { I18n }    from './i18n.js';
import { Calendar } from './calendar.js';

class ProTrainersApp {
  constructor() {
    this.router   = new Router();
    this.i18n     = new I18n();
    this.calendar = new Calendar();
  }

  init() {
    this.i18n.init(this.router);
    this.router.init(this.i18n, this.calendar);
    this.calendar.init(this.i18n);
  }
}

document.addEventListener('DOMContentLoaded', () => new ProTrainersApp().init());
```
</details>

<details>
<summary><strong>Dynamic Internationalisation Pattern</strong></summary>

```html
<h1 data-en="Transform Your Business"
    data-de="Transformieren Sie Ihr Unternehmen">
  Transform Your Business
</h1>
```

```js
// js/i18n.js (excerpt)
toggleLanguage() {
  this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
  document.documentElement.lang = this.currentLang;
  this.updateTranslations();
  localStorage.setItem('preferred-language', this.currentLang);
}
```
</details>

---

## Getting Started

### Prerequisites
- Modern browser (Chrome, Firefox, Edge, Safari)
- Optional: local web server (e.g. VS Code Live Server extension or Python's `http.server`)

### Installation
```bash
# 1. Clone the repo
git clone https://github.com/splemoine8/training-demo.git
cd training-demo

# 2. Start a local dev server (Python example)
python -m http.server

# 3. Browse
open http://localhost:8000       # or your chosen port
```

*(You can also open `index.html` directly, but a local server is recommended to ensure correct routing behaviour.)*

---

## Future Enhancements

- **Centralised Translation File** – pull all strings from `data/translations.json` for easier maintenance.
- **Backend Integration** – connect forms to a serverless function (Netlify / Vercel) or Formspree for live email notifications.
- **Dark Mode** – auto-detect OS preference and allow manual toggle.
- **Headless CMS** – integrate with Strapi or Contentful for dynamic content updates.

---

*Made with ☕ and 💪 by Scott Lemoine.*