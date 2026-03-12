'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Package, ChevronRight, Clock, CheckCircle, Truck, FileText } from 'lucide-react';
import { mockApi } from '../data/mock-data';
import { Order } from '../types';

export default function DashboardContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/usuario/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadOrders();
    }
  }, [isAuthenticated, user]);

  const loadOrders = async () => {
    try {
      setLoadingData(true);
      const ordersData = await mockApi.getOrders();
      // Ordenar por data mais recente
      setOrders(ordersData.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getOrderStatusInfo = (status: string) => {
    const statusMap = {
      pending: {
        label: 'Aguardando pagamento',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: Clock
      },
      confirmed: {
        label: 'Pagamento confirmado',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: CheckCircle
      },
      processing: {
        label: 'Em andamento',
        color: 'text-orange-700',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: Truck
      },
      completed: {
        label: 'Concluído',
        color: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle
      },
      cancelled: {
        label: 'Cancelado',
        color: 'text-gray-700',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        icon: Clock
      }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels = {
      pending: 'Aguardando',
      paid: 'Pago',
      failed: 'Falhou',
      refunded: 'Reembolsado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Header Simples */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img src="/assets/logo.svg" alt="Anacli" className="h-8" />
              <span className="text-xl font-semibold text-gray-900">Minha Conta</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                Olá, <span className="font-medium text-gray-900">{user.name}</span>
              </span>
              <a href="/loja" className="text-sm text-primary hover:text-primary/80">
                Voltar à loja
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 pt-24 md:pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary-clean mb-1">
              Olá, {user.name.split(' ')[0]}
            </h1>
            <p className="text-text-secondary-clean">
              Gerencie seus pedidos e acompanhe seus exames
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <a
              href="/loja"
              className="card-clean-sm hover:micro-shadow transition-all text-center group cursor-pointer"
            >
              <Package className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-text-primary-clean">Agendar Exames</p>
            </a>
            <a
              href="/loja/pacotes"
              className="card-clean-sm hover:micro-shadow transition-all text-center group cursor-pointer"
            >
              <Package className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-text-primary-clean">Pacotes</p>
            </a>
            <a
              href="/loja/ia-receituario"
              className="card-clean-sm hover:micro-shadow transition-all text-center group cursor-pointer"
            >
              <FileText className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-text-primary-clean">Enviar Receita</p>
            </a>
            <button className="card-clean-sm hover:micro-shadow transition-all text-center group cursor-pointer">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-text-primary-clean">Histórico</p>
            </button>
          </div>

          {/* Orders Section - Estilo Mercado Livre */}
          <div className="card-clean">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-light">
              <h2 className="text-xl font-bold text-text-primary-clean">Suas compras</h2>
              <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                Ver histórico completo
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {loadingData ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = getOrderStatusInfo(order.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <div
                      key={order.id}
                      className="card-clean-sm hover:micro-shadow transition-all cursor-pointer border border-border-light"
                    >
                      {/* Header do Pedido */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-border-light">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${statusInfo.bgColor}`}>
                            <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary-clean">
                              Pedido #{order.id}
                            </p>
                            <p className="text-xs text-text-secondary-clean">
                              {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${statusInfo.borderColor} ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Items do Pedido */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                          <div key={item.id} className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-text-primary-clean text-sm mb-1">
                                {item.name}
                              </h3>
                              <p className="text-xs text-text-secondary-clean">
                                {item.type === 'package' ? 'Pacote' : 'Exame individual'} • Qtd: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-semibold text-text-primary-clean">
                                R$ {item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer do Pedido */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 border-t border-border-light">
                        <div className="flex items-center gap-4 text-sm text-text-secondary-clean">
                          <span>
                            Pagamento: <span className="font-medium text-text-primary-clean">{order.paymentMethod}</span>
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span className={order.paymentStatus === 'paid' ? 'text-green-600 font-medium' : ''}>
                            {getPaymentStatusLabel(order.paymentStatus)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <div className="text-right">
                            <p className="text-xs text-text-secondary-clean mb-0.5">Total</p>
                            <p className="text-xl font-bold text-primary">
                              R$ {order.total.toFixed(2)}
                            </p>
                          </div>
                          <button className="btn-secondary-clean px-4 py-2 text-sm whitespace-nowrap">
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary-clean mb-2">
                  Nenhuma compra ainda
                </h3>
                <p className="text-text-secondary-clean mb-6">
                  Comece agendando seus exames agora mesmo
                </p>
                <a href="/loja" className="btn-primary-clean px-6 py-3 inline-block">
                  Agendar Exames
                </a>
              </div>
            )}
          </div>

          {/* Banner CTA */}
          <div className="mt-6 card-clean bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-text-primary-clean mb-1">
                  Precisa agendar novos exames?
                </h3>
                <p className="text-sm text-text-secondary-clean">
                  Navegue por nosso catálogo completo e agende com facilidade
                </p>
              </div>
              <a
                href="/loja"
                className="btn-primary-clean px-6 py-3 whitespace-nowrap"
              >
                Ver Exames
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Simples */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Laboratório Anacli. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
