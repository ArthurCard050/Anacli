'use client';

import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  postId: string;
  postTitle: string;
}

export default function GiscusComments({ postId, postTitle }: GiscusCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'ArthurCard050/ComentariosAnacli');
    script.setAttribute('data-repo-id', 'R_kgDORPGAsA');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDORPGAsM4C2UhJ');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'pt');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
      
      <div ref={commentsRef} className="giscus-container"></div>

      <style jsx global>{`
        .giscus-container {
          min-height: 200px;
        }

        /* Customização do Giscus */
        .giscus-frame {
          width: 100% !important;
          border: none !important;
        }

        /* Estilo dos comentários */
        .giscus {
          font-family: inherit !important;
        }
      `}</style>
    </div>
  );
}
