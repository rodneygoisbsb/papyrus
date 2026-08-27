import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: "#1E60F6",            // Azul Elétrico
        "primary-content": "#FFFFFF",
        secondary: "#00D084",          // Verde Menta
        "secondary-content": "#FFFFFF",
        accent: "#FF7A1A",             // Laranja
        "accent-content": "#FFFFFF",
        neutral: "#CBD5E1",            // Slate 300
        "neutral-content": "#64748B",  // Slate 500
        "base-100": "#FFFFFF",         // Branco Puro dos Cards e Modais
        "base-200": "#EEF2F6",         // Fundo Geral mais forte e elegante (destaca os cards brancos)
        "base-300": "#E2E8F0",         // Fundo de caixas internas, tags e inputs
        "base-content": "#1E293B",     // Texto Escuro
        info: "#0EA5E9",
        warning: "#FF7A1A",
        error: "#F43F5E",
        "small-ball": "#F43F5E",
        "badge-live": "#EF4444",               // Vermelho para fundo do Ao Vivo e tags
        "badge-live-content": "#FFFFFF",       // Texto branco de alto contraste
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        papyrus: {
          "primary": "#1E60F6",
          "primary-content": "#FFFFFF",
          "secondary": "#00D084",
          "secondary-content": "#FFFFFF",
          "accent": "#FF7A1A",
          "accent-content": "#FFFFFF",
          "neutral": "#CBD5E1",
          "neutral-content": "#64748B",
          "base-100": "#FFFFFF",
          "base-200": "#EEF2F6",
          "base-300": "#E2E8F0",
          "base-content": "#0F172A",
          "info": "#0EA5E9",
          "success": "#00D084",
          "warning": "#FF7A1A",
          "error": "#F43F5E",
        },
      },
    ],
    darkTheme: false,
  },
};