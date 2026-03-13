'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Package, ChevronLeft, Clock, CheckCircle, Truck, Calendar, MapPin, X } from 'lucide-react';
import ShopHeader from '@/app/loja/components/ShopHeader';
import ShopFooter from '@/app/loja/components/ShopFooter';
import CartDrawer from '@/app/loja/components/CartDrawer';
import { CartProvider } from '@/app/loja/context/CartContext';
import { apiGet } from '../../utils/api';
import { Order } from '../../types';
import NavigationCards from '../components/NavigationCards';

export default function MeusPedidosContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [modalOrderItems, setModalOrderItems] = useState<any[]>([]);

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
      
      // Buscar pedidos da API
      const apiOrders = await apiGet<any[]>('/orders');
      
      // Transformar dados da API para o formato esperado pelo frontend
      const transformedOrders: Order[] = apiOrders.map(apiOrder => ({
        id: apiOrder.id,
        userId: apiOrder.userId.toString(),
        items: apiOrder.items.map((item: any) => ({
          id: item.id.toString(),
          name: item.exam?.rotulo || item.exam?.descricao_completa || 'Exame',
          type: 'exam' as const,
          price: parseFloat(item.price),
          quantity: item.quantity
        })),
        total: parseFloat(apiOrder.total),
        status: apiOrder.status,
        paymentStatus: apiOrder.paymentStatus,
        paymentMethod: formatPaymentMethod(apiOrder.paymentMethod),
        shippingAddress: undefined,
        createdAt: apiOrder.createdAt,
        updatedAt: apiOrder.updatedAt
      }));
      
      setOrders(transformedOrders.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setOrders([]);
    } finally {
      setLoadingData(false);
    }
  };

  const formatPaymentMethod = (method: string): string => {
    const methodMap: Record<string, string> = {
      'credit_card': 'Cartão de Crédito',
      'debit_card': 'Cartão de Débito',
      'pix': 'PIX',
      'boleto': 'Boleto',
      'cash': 'Dinheiro'
    };
    return methodMap[method] || method;
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

  const filterOrders = (orders: Order[], filter: string) => {
    if (filter === 'all') return orders;
    
    const filterMap = {
      'pending': 'pending',
      'processing': 'processing',
      'completed': 'completed'
    };
    
    return orders.filter(order => order.status === filterMap[filter as keyof typeof filterMap]);
  };

  const filteredOrders = filterOrders(orders, activeFilter);

  const getFilterCount = (filter: string) => {
    return filterOrders(orders, filter).length;
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const openItemsModal = (items: any[]) => {
    setModalOrderItems(items);
    setShowItemsModal(true);
  };

  const closeItemsModal = () => {
    setShowItemsModal(false);
    setModalOrderItems([]);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-page flex flex-col">
        <ShopHeader />
        
        <main className="flex-1 pt-36 md:pt-32 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => router.push('/usuario/minha-conta/pedidos')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-text-secondary-clean" />
                </button>
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-primary-clean">
                    Meus Pedidos
                  </h1>
                  <p className="text-sm md:text-base text-text-secondary-clean">
                    Acompanhe seus pedidos e agendamentos de exames
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Cards */}
            <NavigationCards />

            {/* Filtros */}
            <div className="card-clean mb-4 md:mb-6">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                    activeFilter === 'all' 
                      ? 'bg-magenta-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos ({orders.length})
                </button>
                <button 
                  onClick={() => setActiveFilter('pending')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                    activeFilter === 'pending' 
                      ? 'bg-magenta-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Aguardando pagamento ({getFilterCount('pending')})
                </button>
                <button 
                  onClick={() => setActiveFilter('processing')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                    activeFilter === 'processing' 
                      ? 'bg-magenta-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Em andamento ({getFilterCount('processing')})
                </button>
                <button 
                  onClick={() => setActiveFilter('completed')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                    activeFilter === 'completed' 
                      ? 'bg-magenta-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Concluídos ({getFilterCount('completed')})
                </button>
              </div>
            </div>

            {/* Lista de Pedidos */}
            {loadingData ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {filteredOrders.map((order) => {
                  const statusInfo = getOrderStatusInfo(order.status);
                  const StatusIcon = statusInfo.icon;
                  const isExpanded = expandedOrders.has(order.id);
                  
                  return (
                    <div key={order.id} className="card-clean">
                      {/* Header do Pedido */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3 pb-3 md:pb-4 mb-3 md:mb-4 border-b border-border-light">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`p-1.5 md:p-2 rounded-lg ${statusInfo.bgColor}`}>
                            <StatusIcon className={`h-4 w-4 md:h-5 md:w-5 ${statusInfo.color}`} />
                          </div>
                          <div>
                            <p className="text-base md:text-lg font-semibold text-text-primary-clean">
                              Pedido #{order.id}
                            </p>
                            <p className="text-xs md:text-sm text-text-secondary-clean">
                              Realizado em {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium border ${statusInfo.borderColor} ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Items do Pedido - Resumo */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-text-secondary-clean">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                          </p>
                          <p className="text-lg md:text-xl font-bold text-primary">
                            R$ {order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Detalhes Expandidos */}
                      {isExpanded && (
                        <div className="space-y-3 md:space-y-4 mb-4 border-t border-border-light pt-4">
                          {/* Items Detalhados */}
                          <div>
                            <h4 className="font-medium text-text-primary-clean mb-3 text-sm md:text-base">Itens do pedido:</h4>
                            <div className="space-y-2 md:space-y-3">
                              {order.items.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg">
                                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                                    <Package className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm md:text-base text-text-primary-clean mb-1">
                                      {item.name}
                                    </h3>
                                    <p className="text-xs md:text-sm text-text-secondary-clean">
                                      {item.type === 'package' ? 'Pacote' : 'Exame individual'} • Qtd: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-semibold text-sm md:text-base text-text-primary-clean">
                                      R$ {item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              
                              {order.items.length > 3 && (
                                <div className="text-center pt-2">
                                  <button
                                    onClick={() => openItemsModal(order.items)}
                                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 mx-auto"
                                  >
                                    <Package className="h-4 w-4" />
                                    Ver todos os {order.items.length} exames
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Informações de Pagamento */}
                          <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Informações de Pagamento</h4>
                            <div className="space-y-1 text-xs md:text-sm text-gray-700">
                              <p><span className="font-medium">Método:</span> {order.paymentMethod}</p>
                              <p><span className="font-medium">Status:</span> <span className={order.paymentStatus === 'paid' ? 'text-green-600 font-medium' : ''}>{getPaymentStatusLabel(order.paymentStatus)}</span></p>
                              <p><span className="font-medium">Total:</span> R$ {order.total.toFixed(2)}</p>
                            </div>
                          </div>

                          {/* Informações de Agendamento */}
                          {order.status !== 'cancelled' && (
                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                              <div className="flex items-start gap-2 md:gap-3">
                                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-gray-600 mt-0.5" />
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 mb-1 text-sm md:text-base">Agendamento</h4>
                                  <p className="text-xs md:text-sm text-gray-700 mb-2">
                                    {order.status === 'pending' 
                                      ? 'Aguardando confirmação do pagamento para agendar'
                                      : order.status === 'confirmed'
                                      ? 'Entre em contato para agendar sua coleta'
                                      : 'Agendado para 15/03/2024 às 08:00'
                                    }
                                  </p>
                                  {order.status !== 'pending' && (
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                                      <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                                      <span>Coleta domiciliar - Rua das Flores, 123</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Histórico do Pedido */}
                          <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Histórico</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-xs md:text-sm">
                                <span className="text-gray-700">Pedido realizado</span>
                                <span className="text-gray-500">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                              </div>
                              {order.paymentStatus === 'paid' && (
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                  <span className="text-green-600">Pagamento confirmado</span>
                                  <span className="text-gray-500">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                              )}
                              {order.status === 'completed' && (
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                  <span className="text-green-600">Exames concluídos</span>
                                  <span className="text-gray-500">15/03/2024</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Footer do Pedido */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3 pt-3 md:pt-4 border-t border-border-light">
                        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-text-secondary-clean">
                          <span>
                            Pagamento: <span className="font-medium text-text-primary-clean">{order.paymentMethod}</span>
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span className={order.paymentStatus === 'paid' ? 'text-green-600 font-medium' : ''}>
                            {getPaymentStatusLabel(order.paymentStatus)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => toggleOrderDetails(order.id)}
                              className="btn-secondary-clean px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm"
                            >
                              {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes'}
                            </button>
                            {order.status === 'pending' && (
                              <button className="btn-primary-clean px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm">
                                Pagar agora
                              </button>
                            )}
                          </div>
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
                  {activeFilter === 'all' 
                    ? 'Nenhum pedido encontrado'
                    : `Nenhum pedido ${
                        activeFilter === 'pending' ? 'aguardando pagamento' :
                        activeFilter === 'processing' ? 'em andamento' :
                        activeFilter === 'completed' ? 'concluído' : ''
                      } encontrado`
                  }
                </h3>
                <p className="text-text-secondary-clean mb-6">
                  {activeFilter === 'all' 
                    ? 'Você ainda não fez nenhum pedido. Que tal começar agora?'
                    : 'Tente selecionar outro filtro ou fazer um novo pedido.'
                  }
                </p>
                {activeFilter === 'all' && (
                  <a href="/loja" className="btn-primary-clean px-6 py-3 inline-block">
                    Agendar Exames
                  </a>
                )}
                {activeFilter !== 'all' && (
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className="btn-secondary-clean px-6 py-3 inline-block mr-3"
                  >
                    Ver todos os pedidos
                  </button>
                )}
              </div>
            )}
          </div>
        </main>

        <ShopFooter />
        <CartDrawer />

        {/* Modal de Itens */}
        {showItemsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
              {/* Header do Modal */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-bold text-text-primary-clean">
                  Todos os Exames ({modalOrderItems.length} itens)
                </h2>
                <button
                  onClick={closeItemsModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-3">
                  {modalOrderItems.map((item, index) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-medium text-text-primary-clean mb-1">
                              {index + 1}. {item.name}
                            </h3>
                            <p className="text-sm text-text-secondary-clean">
                              {item.type === 'package' ? 'Pacote' : 'Exame individual'} • Qtd: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-semibold text-text-primary-clean">
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-text-primary-clean">
                      Total dos Exames:
                    </span>
                    <span className="text-xl font-bold text-primary">
                      R$ {modalOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="p-4 md:p-6 border-t border-gray-200">
                <button
                  onClick={closeItemsModal}
                  className="btn-primary-clean px-6 py-2 w-full"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CartProvider>
  );
}