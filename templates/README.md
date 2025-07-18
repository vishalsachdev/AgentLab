# Navigation Template System

This directory contains navigation templates to ensure consistency across all pages of the AgentLab website.

## Files

### `navigation.html`
- **Use for**: Main directory pages (`index.html`, `projects.html`, `team.html`, `news.html`)
- **Links**: Use relative paths without `../`

### `navigation-subdirectory.html`
- **Use for**: Pages in subdirectories (`news-posts/*.html`, etc.)
- **Links**: Use relative paths with `../` to go up one directory

## Usage Instructions

### When Adding New Pages:
1. Copy the appropriate navigation template
2. Paste it into your new page's `<header>` section
3. Ensure the navigation is placed consistently across all pages

### When Updating Navigation:
1. **First**: Update the template files in this directory
2. **Then**: Copy the updated navigation to all existing pages
3. Use find/replace in your editor to update multiple files efficiently

### Find/Replace Strategy:
- **Find**: `<nav class="container">` (to start of navigation)
- **Replace**: Copy entire navigation block from template
- **Scope**: All HTML files in the project

## Current Navigation Structure:
- Projects
- Team  
- News

## Maintenance Checklist:
- [ ] All main pages use `navigation.html` template
- [ ] All subdirectory pages use `navigation-subdirectory.html` template
- [ ] Navigation order is consistent: Projects → Team → News
- [ ] All links are tested and working
- [ ] Template files are updated before copying to pages

## Quick Verification:
Run this command to check navigation consistency:
```bash
grep -r "nav-links" *.html news-posts/*.html
```

This should show identical navigation structure across all pages (accounting for relative path differences).
