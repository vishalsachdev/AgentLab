# AgentLab Website JavaScript Features

This document explains the interactive features implemented in the AgentLab website's main JavaScript file.

## Features Overview

### 1. Mobile Navigation Toggle
- **Functionality**: Creates a responsive hamburger menu for mobile devices
- **Auto-initialization**: Automatically detects navigation elements and adds mobile functionality
- **Accessibility**: Includes proper ARIA attributes and keyboard support
- **Features**:
  - Smooth animations
  - Click outside to close
  - ESC key to close
  - Responsive design (appears on screens < 768px)

### 2. Smooth Scrolling
- **Functionality**: Provides smooth scrolling for all anchor links
- **Features**:
  - Accounts for fixed header height
  - Works with any `href="#target"` links
  - Back-to-top button (appears after scrolling 300px)
  - Closes mobile menu when navigating

### 3. News Filtering
- **Functionality**: Enhanced filtering with animations for the news page
- **Features**:
  - Smooth fade-in/fade-out animations
  - Staggered reveal for better UX
  - "No results" message handling
  - Filter by categories: all, research, milestone, partnership, announcement

### 4. Form Validation
- **Functionality**: Comprehensive client-side form validation
- **Supported Field Types**:
  - Required fields
  - Email validation
  - Phone number validation
  - URL validation
  - Textarea minimum length
- **Features**:
  - Real-time validation on field blur
  - Visual error indicators
  - Error message display
  - Prevents form submission if invalid

### 5. Interactive Features
- **Copy to Clipboard**: For elements with `data-copy` attribute
- **Lazy Loading**: For images with `data-src` attribute
- **Scroll Animations**: For elements with `animate-on-scroll` class
- **Loading States**: For submit buttons
- **Search Functionality**: For elements with `data-searchable` attribute
- **Theme Toggle**: Dark/light theme switching with localStorage

## Usage Guide

### Including the Script
Add the script tag to your HTML pages:
```html
<script src="js/main.js"></script>
```

### Using Individual Features

#### Mobile Navigation
No setup required - automatically detects and enhances existing navigation.

#### Smooth Scrolling
Add anchor links to your HTML:
```html
<a href="#section1">Go to Section 1</a>
<section id="section1">...</section>
```

#### News Filtering
Add filter buttons and news cards:
```html
<button class="filter-btn active" data-filter="all">All</button>
<button class="filter-btn" data-filter="research">Research</button>

<article class="news-card" data-category="research">
  <!-- News content -->
</article>
```

#### Form Validation
Create forms with validation attributes:
```html
<form>
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Submit</button>
</form>
```

#### Copy to Clipboard
Add the `data-copy` attribute:
```html
<button data-copy="Text to copy">Copy</button>
```

#### Lazy Loading
Add `data-src` instead of `src` for images:
```html
<img data-src="image.jpg" alt="Description" class="lazy">
```

#### Scroll Animations
Add the `animate-on-scroll` class:
```html
<div class="animate-on-scroll">
  <!-- Content that will animate when in view -->
</div>
```

#### Search Functionality
Add search input and searchable content:
```html
<input type="search" placeholder="Search...">
<div data-searchable>
  <div class="item">Content 1</div>
  <div class="item">Content 2</div>
</div>
```

#### Theme Toggle
Add a theme toggle button:
```html
<button class="theme-toggle">Toggle Theme</button>
```

## CSS Classes Added by JavaScript

The JavaScript automatically adds these CSS classes:

### Mobile Navigation
```css
.mobile-menu-btn { /* Mobile menu button styles */ }
.nav-links.nav-open { /* Mobile menu when open */ }
```

### Back to Top
```css
.back-to-top { /* Back to top button styles */ }
```

### Form Validation
```css
.error { /* Error state for form fields */ }
.error-message { /* Error message styles */ }
```

### Animations
```css
.animate-on-scroll { /* Initial state */ }
.animate-on-scroll.animated { /* Animated state */ }
```

### Toast Notifications
```css
.toast { /* Toast notification styles */ }
.toast.show { /* Visible toast state */ }
```

## Browser Compatibility

- **Modern Browsers**: Full feature support
- **Internet Explorer**: Basic functionality (no IntersectionObserver)
- **Mobile Browsers**: Optimized for touch interactions
- **Accessibility**: Screen reader compatible with ARIA attributes

## Performance Optimizations

- **Debounced Events**: Search functionality uses debouncing
- **Intersection Observer**: Used for lazy loading and scroll animations
- **Event Delegation**: Efficient event handling
- **Minimal DOM Manipulation**: Optimized for performance

## Error Handling

- **Graceful Degradation**: Features work independently
- **Console Logging**: Errors logged for debugging
- **Fallbacks**: Provided for unsupported features

## Customization

### Toast Messages
```javascript
showToast('Custom message', 5000); // 5 second duration
```

### Debounced Functions
```javascript
const debouncedFunction = debounce(yourFunction, 300);
```

### Form Validation
Validation can be customized by modifying the `validateField` function.

## Testing

Use the `test-features.html` file to test all interactive features:
- Mobile navigation
- Smooth scrolling
- Form validation
- Copy to clipboard
- Search functionality
- Theme toggle
- Loading states
- Scroll animations

## Dependencies

- **None**: Pure vanilla JavaScript
- **CSS**: Uses existing CSS classes and adds minimal styles
- **HTML**: Works with semantic HTML structure

## File Structure

```
js/
├── main.js           # Main JavaScript file
├── README.md         # This documentation
```

## Contributing

When adding new features:
1. Follow the existing code structure
2. Add proper error handling
3. Include accessibility features
4. Test on multiple browsers
5. Update this documentation

## License

This JavaScript code is part of the AgentLab website and follows the same licensing terms as the project.