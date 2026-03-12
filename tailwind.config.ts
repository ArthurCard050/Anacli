import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Excluir node_modules e outras pastas desnecessárias
    "!./node_modules/**/*",
    "!./.next/**/*",
    "!./dist/**/*"
  ],
  prefix: "",
  // Otimizações de performance
  future: {
    hoverOnlyWhenSupported: true, // Hover apenas em dispositivos que suportam
  },
  corePlugins: {
    // Desabilitar plugins não utilizados para reduzir CSS
    preflight: true, // Manter reset CSS
  },
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
        // === DESIGN SYSTEM CLEAN CARD === //
        'page': 'hsl(var(--page-background))',
        'card-clean': 'hsl(var(--card-background))',
        'text-primary-clean': 'hsl(var(--text-primary))',
        'text-secondary-clean': 'hsl(var(--text-secondary))',
        'brand-accent': 'hsl(var(--brand-accent))',
        'border-clean': 'hsl(var(--border-color))',
        
        // === MAGENTA COLORS === //
        magenta: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        
        // === SHADCN/UI COMPATIBILITY === //
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'clean-normal': 'var(--font-weight-normal)',
        'clean-medium': 'var(--font-weight-medium)',
        'clean-semibold': 'var(--font-weight-semibold)',
        'clean-bold': 'var(--font-weight-bold)',
      },
      spacing: {
        'card-padding': 'var(--spacing-card-padding)',
        'card-padding-sm': 'var(--spacing-card-padding-sm)',
        'card-gap': 'var(--spacing-card-gap)',
        'section-clean': 'var(--spacing-section)',
      },
      borderRadius: {
        'card-clean': 'var(--radius-card)',
        'button-clean': 'var(--radius-button)',
        'small-clean': 'var(--radius-small)',
        // Mantendo compatibilidade shadcn/ui
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'micro': 'var(--shadow-micro)',
        'none-clean': 'var(--shadow-none)',
        // Removendo sombras pesadas
        'elegant': 'none',
        'soft': 'none',
      },
      transitionDuration: {
        'fast': 'var(--animation-fast)',
        'normal': 'var(--animation-normal)',
        'slow': 'var(--animation-slow)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;