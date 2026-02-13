'use client';

import { useEffect, useRef } from 'react';

interface CusdisCommentsProps {
  postId: string;
  postTitle: string;
}

export default function CusdisComments({ postId, postTitle }: CusdisCommentsProps) {
  const cusdisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar script do Cusdis
    const script = document.createElement('script');
    script.src = 'https://cusdis.com/js/cusdis.es.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Inicializar Cusdis após carregar
      if (window.CUSDIS) {
        window.CUSDIS.renderTo(cusdisRef.current);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
      
      <div
        ref={cusdisRef}
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="bdb5a8fa-8401-4824-9a22-9d10973f3752"
        data-page-id={postId}
        data-page-url={typeof window !== 'undefined' ? window.location.href : ''}
        data-page-title={postTitle}
        data-theme="light"
      ></div>
    </div>
  );
}

// Adicionar tipos para o Cusdis
declare global {
  interface Window {
    CUSDIS: {
      renderTo: (element: HTMLElement | null) => void;
      setTheme: (theme: string) => void;
    };
  }
}
