'use client';

import { useEffect } from 'react';

interface FacebookCommentsProps {
  postUrl: string;
}

export default function FacebookComments({ postUrl }: FacebookCommentsProps) {
  useEffect(() => {
    // Inicializar Facebook SDK
    if (typeof window !== 'undefined') {
      (window as any).fbAsyncInit = function() {
        (window as any).FB.init({
          appId: '4155112851395262',
          xfbml: true,
          version: 'v18.0'
        });
      };

      // Carregar SDK do Facebook
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/pt_BR/sdk.js';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
      }
    }
  }, []);

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
      ></div>
    </div>
  );
}
