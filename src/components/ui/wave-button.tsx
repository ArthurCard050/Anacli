'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaveButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const WaveButton = React.forwardRef<HTMLButtonElement, WaveButtonProps>(
  ({ children, icon, variant = "primary", className, onClick, disabled }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 600);
      onClick?.(e);
    };

    const variants = {
      primary: "bg-accent hover:bg-accent/90 text-white",
      secondary: "bg-primary-dark hover:bg-primary-dark/90 text-white"
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group",
          variants[variant],
          className
        )}
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        disabled={disabled}
      >
        {/* Wave layers */}
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            scale: isClicked ? [1, 2.5] : 1,
            opacity: isClicked ? [0.3, 0] : 0.3,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            scale: isClicked ? [1, 2] : 1,
            opacity: isClicked ? [0.4, 0] : 0.4,
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        />

        <motion.div
          className="absolute inset-0 bg-white/30"
          animate={{
            scale: isClicked ? [1, 1.5] : 1,
            opacity: isClicked ? [0.5, 0] : 0.5,
          }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        />

        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${40 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [-5, -15, -5],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
          {icon && (
            <motion.span
              className="group-hover:translate-x-1"
              animate={{
                rotate: isClicked ? [0, 360] : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              {icon}
            </motion.span>
          )}
        </span>

        {/* Border animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30"
          animate={{
            borderColor: isClicked 
              ? ["rgba(255,255,255,0)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0)"]
              : "rgba(255,255,255,0)"
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>
    );
  }
);

WaveButton.displayName = "WaveButton";

export { WaveButton };