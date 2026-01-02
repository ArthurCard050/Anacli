import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gradient" | "glow" | "ripple";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    variant = "primary", 
    size = "md", 
    icon, 
    iconPosition = "right", 
    className,
    onClick,
    disabled
  }, ref) => {
    const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 flex items-center justify-center gap-2 group";
    
    const variants = {
      primary: "bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl",
      secondary: "bg-primary-dark hover:bg-primary-dark/90 text-white shadow-lg hover:shadow-xl",
      gradient: "bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl",
      glow: "bg-accent text-white shadow-lg hover:shadow-accent/25 hover:shadow-2xl border border-accent/20",
      ripple: "bg-primary text-white shadow-lg hover:shadow-xl relative"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-2xl"
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          ...(variant === "glow" && {
            boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)"
          })
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        disabled={disabled}
      >
        {/* Ripple effect for ripple variant */}
        {variant === "ripple" && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 4, opacity: [0, 1, 0] }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Gradient overlay animation */}
        {variant === "gradient" && (
          <motion.div
            className="absolute inset-0 bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-full"
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Glow effect */}
        {variant === "glow" && (
          <motion.div
            className="absolute inset-0 bg-accent/50 blur-xl opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {icon && iconPosition === "left" && (
            <motion.span
              className="group-hover:-translate-x-1"
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}
          
          {children}
          
          {icon && iconPosition === "right" && (
            <motion.span
              className="group-hover:translate-x-1"
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}
        </span>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };