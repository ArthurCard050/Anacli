'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphingButtonProps {
  children: React.ReactNode;
  hoverText?: string;
  icon?: React.ReactNode;
  hoverIcon?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const MorphingButton = React.forwardRef<HTMLButtonElement, MorphingButtonProps>(
  ({ children, hoverText, icon, hoverIcon, className, onClick, disabled }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative bg-accent text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group min-w-[200px]",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        layout
        onClick={onClick}
        disabled={disabled}
      >
        {/* Background morphing effect */}
        <motion.div
          className="absolute inset-0 bg-primary"
          initial={{ scale: 0, borderRadius: "100%" }}
          animate={{ 
            scale: isHovered ? 1 : 0,
            borderRadius: isHovered ? "1rem" : "100%"
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Liquid morphing background */}
        <motion.div
          className="absolute inset-0 bg-accent/80"
          animate={{
            borderRadius: isHovered 
              ? ["1rem", "2rem 0.5rem", "0.5rem 2rem", "1rem"]
              : "1rem"
          }}
          transition={{ 
            duration: 2, 
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Content container */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="default"
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span>{children}</span>
                {icon && (
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {icon}
                  </motion.span>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="hover"
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span>{hoverText || children}</span>
                {(hoverIcon || icon) && (
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {hoverIcon || icon}
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [-20, -40],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-white/20"
          animate={{
            borderColor: isHovered 
              ? ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.2)"]
              : "rgba(255,255,255,0.2)"
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.button>
    );
  }
);

MorphingButton.displayName = "MorphingButton";

export { MorphingButton };