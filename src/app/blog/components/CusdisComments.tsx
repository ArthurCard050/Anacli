'use client';

import { useEffect, useRef } from 'react';
import '../styles/cusdis-custom.css';

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

      // Traduzir textos para português após carregar
      setTimeout(() => {
        translateCusdis();
        // Remover "Comments powered by Cusdis"
        removePoweredBy();
      }, 500);

      // Observer para traduzir dinamicamente quando novos elementos aparecerem
      const observer = new MutationObserver(() => {
        translateCusdis();
        removePoweredBy();
      });

      if (cusdisRef.current) {
        observer.observe(cusdisRef.current, {
          childList: true,
          subtree: true,
        });
      }

      return () => observer.disconnect();
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const translateCusdis = () => {
    // Traduzir placeholders
    const nicknameInput = document.querySelector('#cusdis_thread input[placeholder*="Nickname"]') as HTMLInputElement;
    if (nicknameInput) nicknameInput.placeholder = 'Nome';

    const emailInput = document.querySelector('#cusdis_thread input[placeholder*="Email"]') as HTMLInputElement;
    if (emailInput) emailInput.placeholder = 'Email (opcional)';

    const replyTextarea = document.querySelector('#cusdis_thread textarea[placeholder*="Reply"]') as HTMLTextAreaElement;
    if (replyTextarea) replyTextarea.placeholder = 'Escreva seu comentário...';

    // Traduzir botão de enviar
    const submitButton = document.querySelector('#cusdis_thread button[type="submit"]') as HTMLButtonElement;
    if (submitButton && submitButton.textContent?.includes('Send')) {
      submitButton.textContent = 'Enviar';
    }

    // Traduzir botão de responder
    const replyButtons = document.querySelectorAll('#cusdis_thread .cusdis-reply-button');
    replyButtons.forEach((button) => {
      if (button.textContent?.includes('Reply')) {
        button.textContent = 'Responder';
      }
    });

    // Traduzir mensagem de carregamento
    const loading = document.querySelector('#cusdis_thread .cusdis-loading');
    if (loading && loading.textContent?.includes('Loading')) {
      loading.textContent = 'Carregando comentários...';
    }

    // Traduzir mensagem vazia
    const empty = document.querySelector('#cusdis_thread .cusdis-empty');
    if (empty && empty.textContent?.includes('No comment')) {
      empty.textContent = 'Seja o primeiro a comentar!';
    }
  };

  const removePoweredBy = () => {
    // Remover todos os links para cusdis.com
    const poweredByLinks = document.querySelectorAll('#cusdis_thread a[href*="cusdis.com"]');
    poweredByLinks.forEach((link) => {
      if (link.parentElement) {
        link.parentElement.style.display = 'none';
      }
    });

    // Remover footer
    const cusdisThread = document.querySelector('#cusdis_thread');
    if (cusdisThread && cusdisThread.lastElementChild) {
      const lastChild = cusdisThread.lastElementChild as HTMLElement;
      if (lastChild.querySelector('a[href*="cusdis.com"]')) {
        lastChild.style.display = 'none';
      }
    }
  };

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
