'use client';

import { useEffect } from 'react';

interface GraphCommentWidgetProps {
  postId: string;
  postTitle: string;
}

export default function GraphCommentWidget({ postId, postTitle }: GraphCommentWidgetProps) {
  useEffect(() => {
    // Configuração do GraphComment
    (window as any).gc_params = {
      graphcomment_id: 'anacli-blog',
      fixed_header_height: 0,
    };

    // Carregar script do GraphComment
    const script = document.createElement('script');
    script.src = 'https://graphcomment.com/js/integration.js?' + Math.round(Math.random() * 1e8);
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Limpar configuração
      delete (window as any).gc_params;
    };
  }, [postId]);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
      
      <div id="graphcomment"></div>

      <style jsx global>{`
        /* Customização do GraphComment */
        #graphcomment {
          min-height: 200px;
          font-family: inherit !important;
        }

        /* Melhorar espaçamento */
        #graphcomment iframe {
          border: none !important;
        }

        /* Customizar cores para combinar com a marca */
        .gc-button {
          background-color: #A6C022 !important;
        }

        .gc-button:hover {
          background-color: #8fa01c !important;
        }
      `}</style>
    </div>
  );
}

// Tipos para o GraphComment
declare global {
  interface Window {
    gc_params: {
      graphcomment_id: string;
      fixed_header_height: number;
    };
  }
}
