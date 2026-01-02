'use client';

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface HierarchicalButtonProps {
  children: React.ReactNode;
  hierarchy?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

const  HierarchicalButton = React.forwardRef<HTMLButtonElement, HierarchicalButtonProps>(
  ({
    children,
    hierarchy = "secondary",
    size = "md",
    icon,
    iconPosition = "right",
    className,
    onClick,
    disabled,
    loading,
    fullWidth,
    ...props
  }, ref) => {
    // Detecta se é mobile para desabilitar animações do Framer Motion
    const [isMobile, setIsMobile] = React.useState(false);
    
    React.useEffect(() => {
      setIsMobile(window.innerWidth <= 768);
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation whitespace-nowrap";

    // Hierarquia de importância com cores e estilos específicos da Anacli
    const hierarchies = {
      // Botão mais importante - Ações principais (CTA, Agendar, Contatar)
      primary: "bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/25 focus:ring-primary border-0",

      // Botão secundário - Ações importantes mas não críticas (Ver mais, Localização) - Hover/Active inverte cores
      secondary: "bg-accent hover:bg-white active:!bg-white text-white hover:text-accent active:!text-accent border border-accent hover:border-accent active:!border-accent shadow-md hover:shadow-lg focus:ring-primary transition-colors duration-150",

      // Botão terciário - Ações de apoio (Links, navegação) - Hover/Active com fundo magenta e texto branco
      tertiary: "bg-white hover:bg-accent active:!bg-accent text-accent hover:text-white active:!text-white border border-accent/40 hover:border-accent active:!border-accent focus:ring-accent shadow-sm hover:shadow-md transition-colors duration-150",

      // Botão fantasma - Ações sutis (Ler mais, links internos) - Hover/Active com fundo magenta e texto branco
      ghost: "bg-transparent hover:bg-accent active:!bg-accent text-accent hover:text-white active:!text-white border-0 focus:ring-accent transition-colors duration-150"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg min-h-[36px]",
      md: "px-6 py-3 text-base rounded-xl min-h-[44px]",
      lg: "px-8 py-4 text-base md:text-lg rounded-xl md:rounded-2xl min-h-[48px] md:min-h-[52px]"
    };

    const getHoverAnimation = () => {
      switch (hierarchy) {
        case "primary":
          return { scale: 1.05, y: -2 };
        case "secondary":
          return { scale: 1.03, y: -1 };
        case "tertiary":
          return { scale: 1.02 };
        case "ghost":
          return { x: 4 };
        default:
          return { scale: 1.02 };
      }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      const button = e.currentTarget;
      
      // Força as classes de active
      if (hierarchy === 'tertiary' || hierarchy === 'ghost') {
        button.style.backgroundColor = 'hsl(335 100% 50%)';
        button.style.color = 'white';
        button.style.borderColor = 'hsl(335 100% 50%)';
      } else if (hierarchy === 'secondary') {
        button.style.backgroundColor = 'white';
        button.style.color = 'hsl(335 100% 50%)';
        button.style.borderColor = 'hsl(335 100% 50%)';
      }
    };
    
    const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      const button = e.currentTarget;
      
      // Remove os estilos inline para voltar ao normal
      button.style.backgroundColor = '';
      button.style.color = '';
      button.style.borderColor = '';
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          hierarchies[hierarchy],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        whileHover={!disabled && !loading && !isMobile ? getHoverAnimation() : undefined}
        whileTap={!disabled && !loading && !isMobile ? { scale: 0.95 } : undefined}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={disabled || loading}
        {...props}
      >
        {/* Efeito de brilho para botões primários */}
        {hierarchy === "primary" && (
          <>
            <motion.div
              className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full"
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute inset-0 bg-accent/50 blur-xl opacity-0 group-hover:opacity-30"
              transition={{ duration: 0.3 }}
            />
          </>
        )}

        {/* Efeito sutil para botões secundários */}
        {hierarchy === "secondary" && (
          <motion.div
            className="absolute inset-0 bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-full"
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Conteúdo */}
        <span className="relative z-10 flex items-center gap-2">
          {loading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}

          {!loading && icon && iconPosition === "left" && (
            <motion.span
              className={hierarchy === "ghost" ? "group-hover:-translate-x-1" : ""}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}

          {children}

          {!loading && icon && iconPosition === "right" && (
            <motion.span
              className={hierarchy === "ghost" ? "group-hover:translate-x-1" : ""}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }
);

HierarchicalButton.displayName = "HierarchicalButton";

export { HierarchicalButton };