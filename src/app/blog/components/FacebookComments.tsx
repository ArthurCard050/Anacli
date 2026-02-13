'use client';

import { useEffect, useState } from 'react';

interface FacebookCommentsProps {
  postUrl: string;
}

export default function FacebookComments({ postUrl }: FacebookCommentsProps) {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const debug: string[] = [];
    debug.push(`[${new Date().toLocaleTimeString()}] Iniciando carregamento do Facebook SDK`);
    debug.push(`URL do post: ${postUrl}`);

    // Limpar qualquer instância anterior
    const fbRoot = document.getElementById('fb-root');
    if (fbRoot) {
      fbRoot.innerHTML = '';
      debug.push('fb-root limpo');
    }

    // Inicializar Facebook SDK
    if (typeof window !== 'undefined') {
      // Deletar FB anterior se existir
      if ((window as any).FB) {
        debug.push('FB anterior encontrado e removido');
        delete (window as any).FB;
      }
      
      (window as any).fbAsyncInit = function() {
        debug.push('fbAsyncInit chamado');
        try {
          (window as any).FB.init({
            appId: '4155112851395262',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v18.0'
          });
          debug.push('FB.init executado com sucesso');
          
          // Parse após inicializar
          (window as any).FB.XFBML.parse();
          debug.push('FB.XFBML.parse executado');
          
          setDebugInfo([...debug, 'SDK carregado com sucesso!']);
        } catch (error) {
          debug.push(`Erro ao inicializar FB: ${error}`);
          setDebugInfo(debug);
        }
      };

      // Remover script anterior se existir
      const existingScript = document.getElementById('facebook-jssdk');
      if (existingScript) {
        existingScript.remove();
        debug.push('Script anterior removido');
      }

      // Carregar SDK do Facebook
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/pt_BR/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        debug.push('Script do Facebook carregado');
        setDebugInfo(debug);
      };
      
      script.onerror = () => {
        debug.push('ERRO: Falha ao carregar script do Facebook');
        setDebugInfo(debug);
      };
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
        debug.push('Script inserido no DOM');
      }
      
      setDebugInfo(debug);
    }
  }, [postUrl]);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Comentários</h2>
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          {showDebug ? 'Ocultar' : 'Mostrar'} diagnóstico
        </button>
      </div>

      {/* Debug Info */}
      {showDebug && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-xs font-mono">
          <div className="font-bold mb-2">Informações de Diagnóstico:</div>
          {debugInfo.map((info, index) => (
            <div key={index} className="text-gray-700">{info}</div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-300">
            <div>Domínio atual: {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</div>
            <div>URL completa: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</div>
          </div>
        </div>
      )}

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
