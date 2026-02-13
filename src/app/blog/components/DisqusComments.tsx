'use client';

import { useEffect } from 'react';

interface DisqusCommentsProps {
  postUrl: string;
  postId: string;
  postTitle: string;
}

export default function DisqusComments({ postUrl, postId, postTitle }: DisqusCommentsProps) {
  useEffect(() => {
    // Configuração do Disqus
    (window as any).disqus_config = function () {
      this.page.url = postUrl;
      this.page.identifier = postId;
      this.page.title = postTitle;
    };

    // Carregar script do Disqus
    const script = document.createElement('script');
    script.src = 'https://anacli-blog.disqus.com/embed.js';
    script.setAttribute('data-timestamp', String(+new Date()));
    (document.head || document.body).appendChild(script);

    return () => {
      // Cleanup
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        disqusThread.innerHTML = '';
      }
    };
  }, [postUrl, postId, postTitle]);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
      <div id="disqus_thread"></div>
      <noscript>
        Por favor, habilite o JavaScript para ver os comentários.
      </noscript>
    </div>
  );
}
