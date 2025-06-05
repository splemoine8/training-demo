# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page application (SPA) for ProTrainers Academy - a business training company website. The site features:
- Bilingual support (English/German) with dynamic language switching
- Client-side routing between different pages (home, trainers, method, resources, contact)
- Responsive design using Tailwind CSS
- Vanilla JavaScript with ES6 classes

## Architecture

### File Structure
- `index.html` - Main HTML file containing all page content
- `js/main.js` - Core application logic using ProTrainersApp class
- `css/styles.css` - Custom CSS styles and Tailwind utility classes
- `data/translations.json` - Translation data (currently unused, translations are inline in HTML)
- `images/` - Image assets directory

### Key Components

**ProTrainersApp Class** (`js/main.js`):
- Manages page navigation via `showPage()` method
- Handles language switching with `toggleLanguage()` 
- Controls mobile menu functionality
- Provides utility methods for loading states and form handling

**Translation System**:
- Dual approach: inline `data-en`/`data-de` attributes in HTML and separate JSON file
- Language preference stored in localStorage
- Body class `german` toggles German content visibility

**Navigation**:
- All navigation links use `data-page` attributes to trigger page switching
- Pages are hidden/shown using CSS classes rather than true routing
- Mobile-responsive hamburger menu

## Development Notes

### Adding New Pages
1. Add page content div with id pattern: `{page-name}-page`
2. Include `page hidden` classes initially
3. Add navigation links with `data-page="{page-name}"` attribute
4. Implement page-specific content loading in `loadPageContent()` method

### Language Support
- Add `data-en` and `data-de` attributes to translatable elements
- Update `data/translations.json` for structured translations (if migrating from inline)
- Test both languages using the language toggle button

### Styling
- Uses Tailwind CSS via CDN with custom color configuration
- Custom styles in `css/styles.css` follow Tailwind utility patterns
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

### Form Handling
- Contact form submission simulated in `handleContactFormSubmit()`
- Includes loading states and success/error messaging
- Form validation and actual submission endpoint need implementation

## Testing
This is a static HTML/CSS/JS project with no build process. Test by:
- Opening `index.html` directly in browser
- Using a local server (e.g., `python -m http.server` or Live Server extension)
- Testing all navigation links and language toggle functionality
- Verifying responsive design across different screen sizes