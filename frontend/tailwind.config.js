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
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        papyrus: {
          "primary": "#2563EB",          // Royal Blue (Botões ativos e destaques)
          "primary-content": "#FFFFFF",
          "secondary": "#10B981",        // Verde Menta (Revisões e acertos)
          "secondary-content": "#FFFFFF",
          "accent": "#EA580C",           // Laranja (Variações e alertas)
          "accent-content": "#FFFFFF",
          "neutral": "#0F223D",          // Deep Navy (Fundo estrutural da Sidebar)
          "neutral-content": "#94A3B8",  // Slate 400 (Textos e ícones inativos da sidebar e metadados)
          "base-100": "#FFFFFF",         // Superfície de Cards e Modais
          "base-200": "#F8FAFC",         // Fundo Canvas geral da aplicação (Slate 50)
          "base-300": "#E2E8F0",         // Divisores e bordas de 1px
          "base-content": "#0F172A",     // Tipografia principal escura (Slate 900)
          "info": "#38BDF8",             // Sky Blue (Subtítulo ESTUDOS PRO)
          "success": "#16A34A",          // Status de sincronização
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
    darkTheme: "papyrusTheme",
  },
}