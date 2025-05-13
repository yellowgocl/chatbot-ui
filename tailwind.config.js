/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'studio-blue': '#1a73e8', // Main blue for text like "Welcome to AI Studio"
        'studio-primary-text': '#202124', // Dark gray for most text
        'studio-secondary-text': '#5f6368', // Lighter gray for secondary text
        'studio-border': '#dadce0', // Border color
        'studio-bg': '#f8f9fa', // Overall page background (very light gray)
        'studio-panel-bg': '#ffffff', // Background for panels like main content, right sidebar
        'studio-sidebar-bg': '#f1f3f4', // Left sidebar background (slightly darker than page bg)
        'studio-active-item-bg': '#e8f0fe', // Active item background in left sidebar
        'studio-active-item-text': '#1967d2', // Active item text/icon color
        'studio-button-bg': '#e8eaed', // Default button background (e.g., Run button)
        'studio-button-hover-bg': '#dde1e5', // Default button hover
        'studio-avatar-bg': '#673ab7', // Purple for avatar
        'studio-get-api-key-bg': '#e6e0f9', // Light purple for "Get API key" button
        'studio-get-api-key-text': '#5f25c3', // Purple text for "Get API key" button
      },
      boxShadow: {
        'panel': '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Uncomment if you want better default form styling
  ],
}