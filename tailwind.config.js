/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        maxfiit: {
          yellow: '#ddca24',        // Official Maxfiit electric cyber-yellow
          yellowHover: '#c8b51d',
          dark: '#131313',          // Heavy charcoal black
          bgLight: '#f7f8f6',       // Clean light background
          cardWhite: '#ffffff',     // Card surfaces
          borderLight: '#e4e7eb',   // Subtle dividers
          darkBg: '#050a00',        // Dark accents
          secondaryBg: '#181f20',
          textMuted: '#667085',
        }
      },
      fontFamily: {
        heading: ['"Roboto Condensed"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      }
    },
  },
  plugins: [],
}
