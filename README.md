# Greenlet

Greenlet is a extremely fast and highly customizable WordPress theme.

It gives you 100/100 in Lighthouse tool if followed the following: (Things a theme cant control)

- Your server is fast!
- Your sever user https and http/2

Use Greenlet as base theme and as a starting point to create a child theme according to your need.

## Features:
- Scores 100/100 Google's Lighthouse Page Speed Tool
- Extremely Lightweight (~25KB)
- Schema Markup Added
- Does not need jQuery
- Select Greenlet CSS Framework or Bootstrap
- 12 Column Design System
- Customize Column Sequence
- 8 Global Predefined Layouts (extendable)
- Unlimited Individual Post Layout
- Unlimited Header and Footer layout
- Optional Topbar and Semi-Footer
- Pagination - Default (Newer and Older Posts)
- Pagination - Numbered
- Pagination - Numbered Ajax
- Pagination - Load More Ajax
- Pagination - Infinite Scroll
- ML Support
- RTL Support
- Change Theme design via customizer
- Change Theme behaviour via tons of hooks
- Tons of Color options
- Tons of Google Fonts
- Mobile Ready
- Page Builders Ready
- Change Logo and Menu Position
- Header and Footer Contents from Widgets or Template File
- 2 to 12 Sidebars Customizable
- Enable or Disable Breadcrumb
- Custom Breadcrumb Separator
- Toggle Featured Image in Post List
- Toggle Comments on Posts and Pages
- Toggle Post Author Info
- Toggle WP Emoji, WP Embed and Block editor scripts and styles
- WooCommerce Support

## Requirements
- PHP 5.4 or above
- WordPress 4.6 or above

## Coding Standards
PHP CS: WordPress

## Development
```
# Clone this repo inside WordPress' wp-content/themes
git clone --depth=1 git@github.com:codefoxes/greenlet.git

# Install node packages
npm install

# Build CSS and JS
npm run build

# Watch CSS and JS (Optional: To update assets on change)
npm start

# Package (Optional: To bundle for WordPress)
# rsync is needed. Will bundle to ~/Desktop
npm run bundle
```
