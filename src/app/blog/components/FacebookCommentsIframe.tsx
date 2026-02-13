'use client';

interface FacebookCommentsIframeProps {
  postUrl: string;
}

export default function FacebookCommentsIframe({ postUrl }: FacebookCommentsIframeProps) {
  const encodedUrl = encodeURIComponent(postUrl);
  const iframeSrc = `https://www.facebook.com/plugins/comments.php?href=${encodedUrl}&width=100%&numposts=10&colorscheme=light`;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comentários</h2>
      
      <div className="w-full">
        <iframe
          src={iframeSrc}
          width="100%"
          height="500"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
        <p>💡 Se os comentários não aparecerem, verifique se:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>O app do Facebook está em modo &quot;Ativo&quot; (não &quot;Desenvolvimento&quot;)</li>
          <li>Os domínios anacli.com.br e www.anacli.com.br estão configurados</li>
          <li>As URLs de privacidade estão acessíveis</li>
          <li>Você está logado no Facebook</li>
        </ul>
      </div>
    </div>
  );
}
