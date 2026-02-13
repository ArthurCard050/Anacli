'use client';

import { useEffect, useRef } from 'react';

interface CusdisCommentsProps {
  postId: string;
  postTitle: string;
}

export default function CusdisComments({ postId, postTitle }: CusdisCommentsProps) {
  const cusdisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuração de tradução do Cusdis
    (window as any).CUSDIS_LOCALE = {
      powered_by: '',
      post_comment: 'Enviar',
      loading: 'Carregando comentários...',
      email: 'Email (opcional)',
      nickname: 'Nome',
      reply_placeholder: 'Escreva seu comentário...',
      reply_btn: 'Responder',
      sending: 'Enviando...',
      be_the_first: 'Seja o primeiro a comentar!',
    };

    // Carregar script do Cusdis
    const script = document.createElement('script');
    script.src = 'https://cusdis.com/js/cusdis.es.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.CUSDIS) {
        window.CUSDIS.renderTo(cusdisRef.current);
      }
    };

    document.body.appendChild(script);

    // Adicionar estilos customizados
    const style = document.createElement('style');
    style.textContent = `
      /* Ocultar branding */
      iframe[src*="cusdis"] {
        border: none !important;
      }
      
      /* Customização via CSS global */
      .cusdis-root {
        font-family: inherit !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
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

      <style jsx global>{`
        /* Customização do Cusdis */
        #cusdis_thread {
          min-height: 200px;
        }

        #cusdis_thread iframe {
          width: 100% !important;
          border: none !important;
          min-height: 400px !important;
        }

        /* Tentar ocultar o powered by via CSS */
        #cusdis_thread [class*="powered"] {
          display: none !important;
        }

        #cusdis_thread a[href*="cusdis.com"] {
          display: none !important;
        }
      `}</style>
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
    CUSDIS_LOCALE: {
      powered_by: string;
      post_comment: string;
      loading: string;
      email: string;
      nickname: string;
      reply_placeholder: string;
      reply_btn: string;
      sending: string;
      be_the_first: string;
    };
  }
}
