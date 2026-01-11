# Patrick Ryan - Marketing Website

## Overview

This is a marketing website for Patrick Ryan, offering web design services for small Irish businesses. The project has a dual architecture:

1. **Static HTML Site** (`/client` folder) - Production-ready static files (HTML, CSS, vanilla JS) designed for deployment to simple shared hosting (like LetsHost)
2. **Development Server** - Express + Vite stack used for local development and preview

The static site is the primary deliverable - it can be deployed by simply uploading the `/client` folder contents to any web server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML pages**: `index.html`, `privacy.html`, `terms.html`, `thanks.html`, and demo pages
- **Vanilla CSS**: Single stylesheet at `assets/css/styles.css` using CSS custom properties (variables) for theming
- **Vanilla JavaScript**: Single script at `assets/js/main.js` for interactions (mobile menu, dark mode, form validation)
- **Google Fonts**: Inter font family loaded via Google Fonts CDN
- **No build step required**: Files work directly when opened in a browser

### Backend Architecture (Development Only)
- **Express.js server**: Handles routing and serves static files during development
- **Vite**: Used for hot module reloading during development
- **Static serving**: In production, only the built static files are served

### Data Storage
- **No persistent data storage needed**: This is a static marketing site
- **Contact form**: Uses Formspree (external service) to handle form submissions without a backend
- **Drizzle/PostgreSQL schema exists**: But is placeholder/unused - the site doesn't require a database

### Design Patterns
- **Mobile-first responsive design**: CSS handles all screen sizes
- **CSS custom properties**: Colors and spacing defined as variables for easy customization
- **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` for accessibility
- **Progressive enhancement**: Core content works without JavaScript

## External Dependencies

### Third-Party Services
- **Formspree**: Handles contact form submissions (form action URL needs configuration in `index.html`)
- **Google Fonts**: Loads the Inter font family

### Development Dependencies
- **Vite**: Build tool and dev server
- **Express**: Node.js server framework
- **TypeScript**: Type checking (development only)
- **Tailwind CSS**: Configured but primarily used for the React development environment, not the static site

### Hosting Requirements
- **Production**: Any static file hosting (shared hosting, Netlify, Vercel, etc.)
- **No server-side processing required**: Pure HTML/CSS/JS
- **UTF-8 encoding**: Required for proper character rendering (€, special quotes)