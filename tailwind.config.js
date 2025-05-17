// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  // darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        border: 'hsl(210, 40%, 85%)',
        input: 'hsl(210, 40%, 90%)', // Input background
        ring: 'hsl(220, 70%, 55%)', // Focus ring color (same as primary)
        danger: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        // Specific component states
        button: {
          primary: {
            DEFAULT: 'var(--color-primary)',
            hover: 'var(--color-primary-light)',
            active: 'var(--color-primary-dark)',
            foreground: 'var(--color-primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            hover: 'hsl(210, 40%, 93%)',
            active: 'hsl(210, 40%, 90%)',
            foreground: 'var(--color-secondary-foreground)',
          },
          ghost: {
            DEFAULT: 'transparent',
            hover: 'hsl(210, 40%, 93%)',
            active: 'hsl(210, 40%, 90%)',
            foreground: 'var(--color-foreground)',
          },
          danger: {
            DEFAULT: 'var(--color-danger)',
            hover: 'hsl(0, 84.2%, 50.2%)',
            active: 'hsl(0, 84.2%, 40.2%)',
            foreground: 'var(--color-danger-foreground)',
          }
        },
        // For Switch component
        switch: {
          track: 'hsl(210, 40%, 80%)',
          trackChecked: 'var(--color-switch-track-checked)',
          thumb: 'hsl(0, 0%, 100%)',
        },
        // For Select component
        select: {
          button: {
            DEFAULT: 'var(--color-background)', // Should be white (hsl(0, 0%, 100%))
            hover: 'var(--color-select-button-hover)',    // Light gray (hsl(210, 40%, 96.1%))
            focus: 'var(--color-ring)',         // Primary color for ring
            // Add foreground colors if they differ significantly from default
            foreground: 'var(--color-foreground)', // Default text color
            hoverForeground: 'var(--color-foreground)', // Text color on hover (should remain visible)
          },
          option: {
            active: 'var(--color-primary)',
            activeForeground: 'var(--color-primary-foreground)',
            inactive: 'var(--color-background)',
            inactiveForeground: 'var(--color-foreground)',
          }
        },
        range: { // New section for range input theme
          track: 'var(--color-range-track)',      // Color of the track background
          progress: 'var(--color-range-progress)',// Color of the track fill (before thumb)
          thumb: 'var(--color-range-thumb)',      // Color of the slider thumb
          hover: 'var(--range-thumb-bg-hover)',
          thumbBorder: 'var(--color-range-thumb-border)', // Optional: border for the thumb
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      spacing: {
        sidebar: '260px', // For left sidebar width
        'right-sidebar': '320px', // For right sidebar width
      },
      boxShadow: {
        'panel': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Or 'base', if you prefer not to use form classes
    }),
    function ({ addComponents, theme }) {
      addComponents({
        '.range-input-base': {
          '@apply w-full h-2 rounded-lg appearance-none cursor-pointer': {},
          '--range-track-bg': theme('colors.range.track'), // Using muted for track bg by default
          '--range-progress-bg': theme('colors.range.progress'), // Using primary for progress
          '--range-thumb-bg': theme('colors.range.thumb'), // Using primary for thumb by default
          '--range-thumb-bg-hover': theme('colors.range.hover'), // Optional thumb border
          '--range-thumb-border-color': theme('colors.range.thumbBorder'), // Optional thumb border

          // Webkit (Chrome, Safari, Edge Chromium)
          '&::-webkit-slider-runnable-track': {
            '@apply w-full h-1.5 rounded-full': {},
            'background-color': 'var(--range-track-bg)', // Track background
          },
          '&::-webkit-slider-thumb': {
            '@apply appearance-none h-4 w-4 rounded-full mt-[-0.375rem] shadow': {}, // Adjust mt for vertical centering
            'background-color': 'var(--range-thumb-bg)',
            // 'border': `2px solid var(--range-thumb-border-color)`, // Example border
            '&:hover': {
              "background-color": 'var(--range-thumb-bg-hover)'
            },
          },
          // Firefox
          '&::-moz-range-track': {
            '@apply w-full h-1.5 rounded-full': {},
            'background-color': 'var(--range-track-bg)',
          },
          '&::-moz-range-thumb': {
            '@apply appearance-none h-4 w-4 rounded-full border-0 shadow': {},
            'background-color': 'var(--range-thumb-bg)',
            // 'border': `2px solid var(--range-thumb-border-color)`,
            '&:hover': {
              "background-color": 'var(--range-thumb-bg-hover)'
              // Add hover effect for thumb if desired
            },
          },
          // MS (IE - less relevant now but for completeness)
          '&::-ms-track': {
            '@apply w-full h-1.5 bg-transparent border-transparent border-0 text-transparent': {},
            'color': 'transparent',
          },
          '&::-ms-fill-lower': { // Progress part
            '@apply rounded-full': {},
            'background-color': 'var(--range-progress-bg)',
          },
          '&::-ms-fill-upper': { // Track part after thumb
            '@apply rounded-full': {},
            'background-color': 'var(--range-track-bg)',
          },
          '&::-ms-thumb': {
            '@apply appearance-none h-4 w-4 rounded-full border-0 shadow mt-0': {},
            'background-color': 'var(--range-thumb-bg)',
            // 'border': `2px solid var(--range-thumb-border-color)`,
          },
          // Modern way for progress fill color
          'accent-color': 'var(--range-progress-bg)',
        }
      })
    }
  ],
}