'use client';

import { useEffect, useRef } from 'react';

interface GraphCommentWidgetProps {
  postId: string;
  postTitle: string;
}

export default function GraphCommentWidget({ postId, postTitle }: GraphCommentWidgetProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Garante que só inicializa uma vez por montagem real
    if (initialized.current) return;
    initialized.current = true;

    // Limpa o container antes de inicializar
    const container = document.getElementById('graphcomment');
    if (container) container.innerHTML = '';

    // Remove scripts anteriores do GraphComment
    document.querySelectorAll('script[src*="graphcomment.com"]').forEach(s => s.remove());

    // Configura e injeta
    (window as any).gc_params = {
      graphcomment_id: 'anacli-blog',
      fixed_header_height: 0,
    };

    const script = document.createElement('script');
    script.src = 'https://graphcomment.com/js/integration.js?' + Date.now();
    script.async = true;
    document.body.appendChild(script);

    return () => {
      initialized.current = false;
      script.remove();
      delete (window as any).gc_params;
      const container = document.getElementById('graphcomment');
      if (container) container.innerHTML = '';
    };
  }, [postId]);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
      <div id="graphcomment"></div>
    </div>
  );
}

declare global {
  interface Window {
    gc_params: {
      graphcomment_id: string;
      fixed_header_height: number;
    };
  }
}
