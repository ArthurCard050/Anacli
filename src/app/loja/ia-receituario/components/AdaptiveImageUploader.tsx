'use client';

import { useState, useEffect } from 'react';
import DesktopImageUploader from './DesktopImageUploader';
import MobileImageUploader from './MobileImageUploader';

interface AdaptiveImageUploaderProps {
  onClose: () => void;
  onFileSelected: (file: File) => void;
}

export default function AdaptiveImageUploader({ onClose, onFileSelected }: AdaptiveImageUploaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // Detectar se é mobile baseado em múltiplos fatores
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      // Considerar mobile se pelo menos 2 dos 3 critérios forem verdadeiros
      const mobileIndicators = [isMobileUserAgent, isTouchDevice, isSmallScreen];
      const mobileCount = mobileIndicators.filter(Boolean).length;
      
      setIsMobile(mobileCount >= 2);
      setIsLoading(false);
    };

    checkDevice();
    
    // Recheck on resize
    const handleResize = () => {
      checkDevice();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-3 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-clean-medium text-slate-700">Loading... </span>
          </div>
        </div>
      </div>
    );
  }

  // Render appropriate component based on device
  return isMobile ? (
    <MobileImageUploader onClose={onClose} onFileSelected={onFileSelected} />
  ) : (
    <DesktopImageUploader onClose={onClose} onFileSelected={onFileSelected} />
  );
}