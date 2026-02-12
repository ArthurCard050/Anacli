'use client';

import { useEffect } from 'react';

interface FacebookCommentsProps {
  postUrl: string;
}

export default function FacebookComments({ postUrl }: FacebookCommentsProps) {
  useEffect(() => {
    // Limpar qualquer instância anterior
    const fbRoot = document.getElementById('fb-root');
    if (fbRoot) {
      fbRoot.innerHTML = '';
    }

    // Inicializar Facebook SDK
    if (typeof window !== 'undefined') {
      // Deletar FB anterior se existir
      delete (window as any).FB;
      
      (window as any).fbAsyncInit = function() {
        (window as any).FB.init({
          appId: '4155112851395262',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v18.0'
        });
        
        // Parse após inicializar
        (window as any).FB.XFBML.parse();
      };

      // Remover script anterior se existir
      const existingScript = document.getElementById('facebook-jssdk');
      if (existingScript) {
        existingScript.remove();
      }

      // Carregar SDK do Facebook
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/pt_BR/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }
  }, [postUrl]);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
      <div id="fb-root"></div>
      <div 
        className="fb-comments" 
        data-href={postUrl}
        data-width="100%" 
        data-numposts="10"
        data-colorscheme="light"
        data-order-by="reverse_time"
        data-lazy="true"
      ></div>
    </div>
  );
}
