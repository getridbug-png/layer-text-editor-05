import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6366F1",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#EC4899",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'abril': ['"Abril Fatface"', 'cursive'],
        'alegreya': ['Alegreya', 'serif'],
        'archivo': ['Archivo', 'sans-serif'],
        'bitter': ['Bitter', 'serif'],
        'cabin': ['Cabin', 'sans-serif'],
        'crimson': ['"Crimson Text"', 'serif'],
        'dancing': ['"Dancing Script"', 'cursive'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'fira': ['"Fira Sans"', 'sans-serif'],
        'ibm': ['"IBM Plex Sans"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'josefin': ['"Josefin Sans"', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'libre': ['"Libre Baskerville"', 'serif'],
        'lora': ['Lora', 'serif'],
        'merriweather': ['Merriweather', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'mulish': ['Mulish', 'sans-serif'],
        'noto': ['"Noto Sans"', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'opensans': ['"Open Sans"', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'pt-sans': ['"PT Sans"', 'sans-serif'],
        'pt-serif': ['"PT Serif"', 'serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
        'roboto-slab': ['"Roboto Slab"', 'serif'],
        'source-sans': ['"Source Sans Pro"', 'sans-serif'],
        'source-serif': ['"Source Serif Pro"', 'serif'],
        'space': ['"Space Grotesk"', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'work': ['"Work Sans"', 'sans-serif'],
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        blob: "blob 7s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
