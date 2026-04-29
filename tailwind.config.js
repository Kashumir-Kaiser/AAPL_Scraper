/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        aapl: {
          base:       'var(--bg-base)',
          panel:      'var(--bg-panel)',
          border:     'var(--border)',
          primary:    'var(--text-primary)',
          secondary:  'var(--text-secondary)',
          green:      'var(--accent-green)',
          'green-bg': 'var(--accent-green-bg)',
          red:        'var(--accent-red)',
          amber:      'var(--accent-amber)',
          blue:       'var(--accent-blue)',
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 2px 8px rgba(0,0,0,0.06)",
        soft: "0 4px 12px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'delta': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading': ['0.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'badge': ['0.625rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.05em' }],
        'tick': ['0.625rem', { lineHeight: '1', fontWeight: '400' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "flash-green": {
          "0%": { backgroundColor: "rgba(106, 158, 114, 0.2)" },
          "100%": { backgroundColor: "transparent" },
        },
        "flash-red": {
          "0%": { backgroundColor: "rgba(192, 57, 43, 0.2)" },
          "100%": { backgroundColor: "transparent" },
        },
        "pulse-skeleton": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "flash-green": "flash-green 1s ease-out forwards",
        "flash-red": "flash-red 1s ease-out forwards",
        "pulse-skeleton": "pulse-skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
