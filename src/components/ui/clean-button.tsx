'use client';

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CleanButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const CleanButton = React.forwardRef<HTMLButtonElement, CleanButtonProps>(
  ({ 
    children, 
    variant = "primary", 
    size = "md", 
    icon, 
    className,
    onClick,
    disabled
  }, ref) => {
    const baseClasses = "relative font-semibold transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden";
    
    const variants = {
      primary: "bg-accent hover:bg-accent/90 text-white shadow-md hover:shadow-lg",
      secondary: "bg-primary-dark hover:bg-primary-dark/90 text-white shadow-md hover:shadow-lg",
      outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-sm hover:shadow-md"
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
        onClick={onClick}
        disabled={disabled}
        whileHover={{ 
          scale: 1.02,
          y: -1
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        {/* Subtle shine effect */}
        <motion.div
          className="absolute inset-0 bg-white/10 -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && (
            <motion.span
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              {icon}
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }
);

CleanButton.displayName = "CleanButton";

export { CleanButton };