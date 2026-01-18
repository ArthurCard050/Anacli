'use client';

import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '5575999999999'; // Substituir pelo número real
const SHIPPING_THRESHOLD = 200;

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    closeCart,
  } = useCart();

  // Calcular quanto falta para frete grátis
  const remainingForFreeShipping = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);

  // Gerar mensagem do WhatsApp
  const generateWhatsAppMessage = () => {
    let message = '🧪 *Pedido Anacli - Exames Laboratoriais*\n\n';
    message += '📋 *Itens do Pedido:*\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += '\n💰 *Resumo:*\n';
    message += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    message += `Frete: ${shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}\n`;
    message += `*Total: R$ ${total.toFixed(2)}*\n\n`;
    message += 'Gostaria de finalizar este pedido!';

    return encodeURIComponent(message);
  };

  // Abrir WhatsApp
  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">
              Carrinho ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Barra de Progresso de Frete */}
        {items.length > 0 && (
          <div className="px-4 md:px-6 py-4 bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                {remainingForFreeShipping > 0 ? (
                  <>Falta <strong className="text-primary">R$ {remainingForFreeShipping.toFixed(2)}</strong> para frete grátis</>
                ) : (
                  <span className="text-green-600 font-semibold">🎉 Você ganhou frete grátis!</span>
                )}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-gray-600 mb-6">
                Adicione exames para começar
              </p>
              <Button onClick={closeCart} className="rounded-full">
                Continuar comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-2xl"
                >
                  {/* Imagem placeholder */}
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex-shrink-0" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-primary font-bold">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Controles */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Limpar carrinho */}
              <button
                onClick={clearCart}
                className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors py-2"
              >
                Limpar carrinho
              </button>
            </div>
          )}
        </div>

        {/* Footer com Totais e Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 md:p-6 bg-white">
            {/* Resumo */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-primary">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Botão de Checkout */}
            <Button
              size="lg"
              onClick={handleWhatsAppCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl h-14 text-base font-semibold transition-all"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Finalizar no WhatsApp
            </Button>

            <p className="text-xs text-center text-gray-500 mt-3">
              Você será redirecionado para o WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  );
}
