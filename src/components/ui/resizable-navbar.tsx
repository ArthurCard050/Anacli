"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { cn } from "@/lib/utils";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

interface NavItem {
  name: string;
  link: string;
}

interface ResizableNavbarProps {
  className?: string;
  navItems?: NavItem[];
}

const ResizableNavbar: React.FC<ResizableNavbarProps> = ({
  className,
  navItems = [
    { name: "Sobre", link: "/sobre" },
    { name: "Exames", link: "#exames" },
    { name: "Convênios", link: "/convenios" },
    { name: "FAQ", link: "/faq" },
    { name: "Certificações", link: "/certificacoes" },
    { name: "Contato", link: "#contato" },
  ],
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldAnimate = useShouldAnimate(); // Desktop = true, Mobile = false

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    // Otimizado com requestAnimationFrame para evitar refluxo forçado
    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounce do resize para evitar múltiplas execuções
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };

    // Initial check
    setIsMobile(window.innerWidth < 768);

    // Usar passive listeners para melhor performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="relative">
      {/* Top Bar - Magenta Background */}
      <div className="hidden md:block bg-accent relative z-50">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center gap-6">
              <a href="https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Vim%20atrav%C3%A9s%20do%20site%20e%20desejo%20agendar%20um%20atendimento." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone className="h-3.5 w-3.5" />
                (75) 3030-0030
              </a>
              <a href="mailto:contato@anacli.com.br" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Mail className="h-3.5 w-3.5" />
                contato@anacli.com.br
              </a>
            </div>
            <div className="text-white/90">
              Feira de Santana – BA
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={cn(
          "fixed left-0 right-0 z-40 w-full",
          className
        )}
        animate={{
          top: isScrolled ? "0px" : isMobile ? "0px" : "40px",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(4px)",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
        style={{
          borderBottom: isScrolled ? "1px solid rgba(219, 219, 219, 0.3)" : "none",
          boxShadow: isScrolled ? "0 1px 0 0 rgba(166, 192, 34, 0.1)" : "none",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <OptimizedImage
                src="/assets/logo.svg"
                alt="Anacli Laboratorial"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority={true}
              />
              <div className="flex flex-col">
                <span className="text-xs tracking-wide text-black/60 hidden sm:block select-none">
                  Excelência em Análises Clínicas
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors duration-300 relative group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
              <HierarchicalButton
                hierarchy="secondary"
                size="sm"
                onClick={() => window.open("http://anacli.ddns.com.br:8090/web_laudos/login.asp")}
              >
                Resultados de Exames
              </HierarchicalButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              className="lg:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-white transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden border-t border-b border-border/100 bg-white/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="mt-2"
                >
                  <HierarchicalButton
                    hierarchy="secondary"
                    size="md"
                    fullWidth={true}
                    className="bg-accent hover:bg-accent/90 text-white focus:ring-accent"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.open("http://anacli.ddns.com.br:8090/web_laudos/login.asp");
                    }}
                  >
                    Resultados de Exames
                  </HierarchicalButton>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

    </div>
  );
};

export default ResizableNavbar;