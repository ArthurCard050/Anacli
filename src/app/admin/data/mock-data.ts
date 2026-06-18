// =============================================
// Dados Mock — Painel Administrativo Anacli
// =============================================
import type {
  AdminOrder,
  CollectionSchedule,
  Collector,
  AdminCustomer,
  DashboardKPI,
  RevenueDataPoint,
  CategoryRevenue,
  TopExam,
  PaymentMethodStat,
  AdminNotification,
} from '../types';

// ─── helpers ───
function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
function todayAt(h: number, m = 0) {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

// ═══════════════════════════════════════════════
//  CLIENTES
// ═══════════════════════════════════════════════
export const mockCustomers: AdminCustomer[] = [
  { id: 'c1', name: 'Maria Silva', email: 'maria@email.com', phone: '(75) 99901-0001', cpf: '123.456.789-00', totalOrders: 8, totalSpent: 1240.50, lastOrderDate: daysAgo(2), status: 'active', createdAt: daysAgo(180) },
  { id: 'c2', name: 'João Santos', email: 'joao@email.com', phone: '(75) 99902-0002', cpf: '234.567.890-11', totalOrders: 5, totalSpent: 890.00, lastOrderDate: daysAgo(5), status: 'active', createdAt: daysAgo(150) },
  { id: 'c3', name: 'Ana Oliveira', email: 'ana@email.com', phone: '(75) 99903-0003', cpf: '345.678.901-22', totalOrders: 12, totalSpent: 2450.80, lastOrderDate: daysAgo(1), status: 'active', createdAt: daysAgo(365) },
  { id: 'c4', name: 'Carlos Pereira', email: 'carlos@email.com', phone: '(75) 99904-0004', cpf: '456.789.012-33', totalOrders: 3, totalSpent: 420.00, lastOrderDate: daysAgo(30), status: 'active', createdAt: daysAgo(90) },
  { id: 'c5', name: 'Beatriz Costa', email: 'beatriz@email.com', phone: '(75) 99905-0005', cpf: '567.890.123-44', totalOrders: 1, totalSpent: 97.00, lastOrderDate: daysAgo(60), status: 'inactive', createdAt: daysAgo(120) },
  { id: 'c6', name: 'Rafael Lima', email: 'rafael@email.com', phone: '(75) 99906-0006', cpf: '678.901.234-55', totalOrders: 7, totalSpent: 1680.00, lastOrderDate: daysAgo(3), status: 'active', createdAt: daysAgo(200) },
  { id: 'c7', name: 'Fernanda Rocha', email: 'fernanda@email.com', phone: '(75) 99907-0007', cpf: '789.012.345-66', totalOrders: 2, totalSpent: 310.00, lastOrderDate: daysAgo(15), status: 'active', createdAt: daysAgo(60) },
  { id: 'c8', name: 'Lucas Mendes', email: 'lucas@email.com', phone: '(75) 99908-0008', cpf: '890.123.456-77', totalOrders: 4, totalSpent: 560.90, lastOrderDate: daysAgo(7), status: 'active', createdAt: daysAgo(100) },
  { id: 'c9', name: 'Patrícia Alves', email: 'patricia@email.com', phone: '(75) 99909-0009', cpf: '901.234.567-88', totalOrders: 6, totalSpent: 1120.00, lastOrderDate: daysAgo(4), status: 'active', createdAt: daysAgo(250) },
  { id: 'c10', name: 'Diego Martins', email: 'diego@email.com', phone: '(75) 99910-0010', totalOrders: 0, totalSpent: 0, status: 'inactive', createdAt: daysAgo(10) },
];

// ═══════════════════════════════════════════════
//  PROFISSIONAIS COLETADORES
// ═══════════════════════════════════════════════
export const mockCollectors: Collector[] = [
  { id: 'col1', name: 'Dra. Camila Souza', phone: '(75) 99801-0001', email: 'camila@anacli.com.br', activeRegions: ['Centro', 'Kalilândia', 'Santa Mônica'], maxDailyCollections: 12, collectionsToday: 5, status: 'collecting', rating: 4.9, totalCollections: 342, createdAt: daysAgo(400) },
  { id: 'col2', name: 'Enf. Ricardo Melo', phone: '(75) 99802-0002', email: 'ricardo@anacli.com.br', activeRegions: ['Tomba', 'Cidade Nova', 'Capuchinhos'], maxDailyCollections: 10, collectionsToday: 3, status: 'available', rating: 4.7, totalCollections: 218, createdAt: daysAgo(300) },
  { id: 'col3', name: 'Téc. Juliana Reis', phone: '(75) 99803-0003', email: 'juliana@anacli.com.br', activeRegions: ['SIM', 'Mangabeira', 'Ponto Central'], maxDailyCollections: 10, collectionsToday: 7, status: 'collecting', rating: 4.8, totalCollections: 456, createdAt: daysAgo(500) },
  { id: 'col4', name: 'Enf. Marcos Almeida', phone: '(75) 99804-0004', email: 'marcos@anacli.com.br', activeRegions: ['Centro', 'Queimadinha'], maxDailyCollections: 8, collectionsToday: 0, status: 'available', rating: 4.6, totalCollections: 127, createdAt: daysAgo(150) },
  { id: 'col5', name: 'Téc. Amanda Ferreira', phone: '(75) 99805-0005', email: 'amanda@anacli.com.br', activeRegions: ['Brasília', 'Caseb', 'Jardim Acácia'], maxDailyCollections: 10, collectionsToday: 0, status: 'unavailable', rating: 4.5, totalCollections: 89, createdAt: daysAgo(100) },
  { id: 'col6', name: 'Enf. Paulo Neto', phone: '(75) 99806-0006', email: 'paulo@anacli.com.br', activeRegions: ['Muchila', 'Campo Limpo', 'Conceição'], maxDailyCollections: 12, collectionsToday: 4, status: 'available', rating: 4.8, totalCollections: 310, createdAt: daysAgo(350) },
];

// ═══════════════════════════════════════════════
//  PEDIDOS
// ═══════════════════════════════════════════════
const examNames = [
  'Hemograma Completo', 'Glicemia de Jejum', 'Colesterol Total e Frações',
  'TSH', 'Vitamina D (25-OH)', 'Vitamina B12', 'Ureia e Creatinina',
  'TGO e TGP', 'PSA Total', 'Beta HCG', 'Ferritina', 'Ácido Úrico',
  'EAS - Urina', 'PCR', 'Hemoglobina Glicada',
];
const examCategories = [
  'check-up', 'diabetes', 'cardiaco', 'tireoide', 'vitaminas',
  'vitaminas', 'renal', 'hepatico', 'hormonal', 'hormonal',
  'vitaminas', 'renal', 'renal', 'cardiaco', 'diabetes',
];
const examPrices = [45.90, 25.90, 55.90, 39.90, 89.90, 65.90, 35.90, 42.90, 58.90, 48.90, 52.90, 28.90, 22.90, 38.90, 68.90];
const statuses: AdminOrder['status'][] = ['pending', 'confirmed', 'processing', 'completed', 'cancelled'];
const payStatuses: AdminOrder['paymentStatus'][] = ['pending', 'paid', 'paid', 'paid', 'refunded'];
const payMethods: AdminOrder['paymentMethod'][] = ['pix', 'credit_card', 'debit_card', 'boleto', 'pix'];

function buildOrders(): AdminOrder[] {
  const orders: AdminOrder[] = [];
  for (let i = 1; i <= 52; i++) {
    const cust = mockCustomers[i % mockCustomers.length];
    const statusIdx = i <= 6 ? 0 : i <= 12 ? 1 : i <= 24 ? 2 : i <= 48 ? 3 : 4;
    const numItems = 1 + (i % 4);
    const items: AdminOrder['items'] = [];
    for (let j = 0; j < numItems; j++) {
      const eIdx = (i + j) % examNames.length;
      items.push({
        id: `item-${i}-${j}`,
        examName: examNames[eIdx],
        category: examCategories[eIdx],
        price: examPrices[eIdx],
        quantity: 1,
      });
    }
    const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
    orders.push({
      id: `ORD-${String(1000 + i)}`,
      customerId: cust.id,
      customerName: cust.name,
      customerEmail: cust.email,
      customerPhone: cust.phone,
      items,
      total: Math.round(total * 100) / 100,
      status: statuses[statusIdx],
      paymentStatus: payStatuses[statusIdx],
      paymentMethod: payMethods[i % payMethods.length],
      collectionType: i % 3 === 0 ? 'home' : 'lab',
      scheduledDate: statusIdx >= 2 ? daysAgo(Math.max(0, 50 - i)) : undefined,
      collectorId: statusIdx >= 2 && i % 3 === 0 ? mockCollectors[i % mockCollectors.length].id : undefined,
      collectorName: statusIdx >= 2 && i % 3 === 0 ? mockCollectors[i % mockCollectors.length].name : undefined,
      notes: i % 7 === 0 ? 'Cliente solicitou horário pela manhã' : undefined,
      createdAt: daysAgo(55 - i),
      updatedAt: daysAgo(Math.max(0, 53 - i)),
    });
  }
  return orders;
}
export const mockOrders: AdminOrder[] = buildOrders();

// ═══════════════════════════════════════════════
//  AGENDAMENTOS
// ═══════════════════════════════════════════════
const scheduleStatuses: CollectionSchedule['status'][] = [
  'scheduled', 'collector_assigned', 'en_route', 'collecting', 'collected', 'in_lab', 'ready', 'delivered',
];

export const mockSchedules: CollectionSchedule[] = [
  // Hoje
  { id: 'sch-1', orderId: 'ORD-1013', customerId: 'c3', customerName: 'Ana Oliveira', customerPhone: '(75) 99903-0003', collectorId: 'col1', collectorName: 'Dra. Camila Souza', date: new Date().toISOString().split('T')[0], timeSlot: '07:00 - 07:30', collectionType: 'home', address: { street: 'Rua Aristides Novis', number: '288', neighborhood: 'Kalilândia', city: 'Feira de Santana', state: 'BA', zipCode: '44025-010' }, status: 'en_route', examCount: 4, createdAt: daysAgo(2) },
  { id: 'sch-2', orderId: 'ORD-1014', customerId: 'c1', customerName: 'Maria Silva', customerPhone: '(75) 99901-0001', collectorId: 'col1', collectorName: 'Dra. Camila Souza', date: new Date().toISOString().split('T')[0], timeSlot: '08:00 - 08:30', collectionType: 'home', address: { street: 'Av. Getúlio Vargas', number: '1500', complement: 'Apto 302', neighborhood: 'Centro', city: 'Feira de Santana', state: 'BA', zipCode: '44001-050' }, status: 'scheduled', examCount: 2, createdAt: daysAgo(1) },
  { id: 'sch-3', orderId: 'ORD-1015', customerId: 'c6', customerName: 'Rafael Lima', customerPhone: '(75) 99906-0006', date: new Date().toISOString().split('T')[0], timeSlot: '09:00 - 09:30', collectionType: 'lab', status: 'scheduled', examCount: 3, createdAt: daysAgo(1) },
  { id: 'sch-4', orderId: 'ORD-1016', customerId: 'c9', customerName: 'Patrícia Alves', customerPhone: '(75) 99909-0009', collectorId: 'col3', collectorName: 'Téc. Juliana Reis', date: new Date().toISOString().split('T')[0], timeSlot: '07:30 - 08:00', collectionType: 'home', address: { street: 'Rua Castro Alves', number: '45', neighborhood: 'Santa Mônica', city: 'Feira de Santana', state: 'BA', zipCode: '44050-200' }, status: 'collected', examCount: 5, createdAt: daysAgo(3) },
  { id: 'sch-5', orderId: 'ORD-1017', customerId: 'c2', customerName: 'João Santos', customerPhone: '(75) 99902-0002', collectorId: 'col6', collectorName: 'Enf. Paulo Neto', date: new Date().toISOString().split('T')[0], timeSlot: '10:00 - 10:30', collectionType: 'home', address: { street: 'Rua São Domingos', number: '78', neighborhood: 'Tomba', city: 'Feira de Santana', state: 'BA', zipCode: '44010-150' }, status: 'collector_assigned', examCount: 1, createdAt: daysAgo(1) },
  // Amanhã
  { id: 'sch-6', orderId: 'ORD-1018', customerId: 'c8', customerName: 'Lucas Mendes', customerPhone: '(75) 99908-0008', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], timeSlot: '07:00 - 07:30', collectionType: 'lab', status: 'scheduled', examCount: 2, createdAt: daysAgo(0) },
  { id: 'sch-7', orderId: 'ORD-1019', customerId: 'c7', customerName: 'Fernanda Rocha', customerPhone: '(75) 99907-0007', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], timeSlot: '08:30 - 09:00', collectionType: 'home', address: { street: 'Av. Maria Quitéria', number: '2100', neighborhood: 'Ponto Central', city: 'Feira de Santana', state: 'BA', zipCode: '44075-100' }, status: 'scheduled', examCount: 6, createdAt: daysAgo(0) },
  // Passados
  { id: 'sch-8', orderId: 'ORD-1020', customerId: 'c4', customerName: 'Carlos Pereira', customerPhone: '(75) 99904-0004', collectorId: 'col2', collectorName: 'Enf. Ricardo Melo', date: daysAgo(1).split('T')[0], timeSlot: '07:00 - 07:30', collectionType: 'home', address: { street: 'Rua Marechal Deodoro', number: '321', neighborhood: 'Centro', city: 'Feira de Santana', state: 'BA', zipCode: '44001-120' }, status: 'delivered', examCount: 3, createdAt: daysAgo(3) },
  { id: 'sch-9', orderId: 'ORD-1021', customerId: 'c3', customerName: 'Ana Oliveira', customerPhone: '(75) 99903-0003', collectorId: 'col1', collectorName: 'Dra. Camila Souza', date: daysAgo(2).split('T')[0], timeSlot: '08:00 - 08:30', collectionType: 'lab', status: 'ready', examCount: 2, createdAt: daysAgo(5) },
  { id: 'sch-10', orderId: 'ORD-1022', customerId: 'c6', customerName: 'Rafael Lima', customerPhone: '(75) 99906-0006', collectorId: 'col3', collectorName: 'Téc. Juliana Reis', date: daysAgo(3).split('T')[0], timeSlot: '09:00 - 09:30', collectionType: 'home', address: { street: 'Rua Dr. João Pessoa', number: '56', neighborhood: 'Capuchinhos', city: 'Feira de Santana', state: 'BA', zipCode: '44020-080' }, status: 'delivered', examCount: 4, createdAt: daysAgo(5) },
];

// ═══════════════════════════════════════════════
//  KPIs
// ═══════════════════════════════════════════════
export const mockKPIs: DashboardKPI = {
  revenue: 18742.50,
  revenueTrend: 12.5,
  totalOrders: 52,
  ordersTrend: 8.3,
  avgTicket: 360.43,
  avgTicketTrend: 3.8,
  collectionsToday: 5,
  collectionsPending: 2,
};

// ═══════════════════════════════════════════════
//  DADOS DE GRÁFICOS
// ═══════════════════════════════════════════════
export const mockRevenueData: RevenueDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
  revenue: Math.round((400 + Math.random() * 800) * 100) / 100,
  orders: Math.floor(1 + Math.random() * 5),
}));

export const mockCategoryRevenue: CategoryRevenue[] = [
  { category: 'Check-up', revenue: 4850, count: 28 },
  { category: 'Vitaminas', revenue: 3420, count: 22 },
  { category: 'Hormonal', revenue: 2980, count: 18 },
  { category: 'Cardíaco', revenue: 2650, count: 15 },
  { category: 'Diabetes', revenue: 2100, count: 20 },
  { category: 'Renal', revenue: 1580, count: 14 },
  { category: 'Hepático', revenue: 890, count: 8 },
  { category: 'Tireoide', revenue: 1270, count: 12 },
];

export const mockTopExams: TopExam[] = [
  { name: 'Hemograma Completo', count: 48, revenue: 2203.20 },
  { name: 'Vitamina D (25-OH)', count: 35, revenue: 3146.50 },
  { name: 'Glicemia de Jejum', count: 32, revenue: 828.80 },
  { name: 'Colesterol Total e Frações', count: 28, revenue: 1565.20 },
  { name: 'Hemoglobina Glicada', count: 25, revenue: 1722.50 },
  { name: 'TSH', count: 22, revenue: 877.80 },
  { name: 'Vitamina B12', count: 20, revenue: 1318.00 },
  { name: 'Ferritina', count: 18, revenue: 952.20 },
  { name: 'TGO e TGP', count: 15, revenue: 643.50 },
  { name: 'Beta HCG', count: 14, revenue: 684.60 },
];

export const mockPaymentMethodStats: PaymentMethodStat[] = [
  { method: 'PIX', count: 24, total: 8950.40 },
  { method: 'Cartão de Crédito', count: 15, total: 5620.80 },
  { method: 'Cartão de Débito', count: 8, total: 2340.30 },
  { method: 'Boleto', count: 5, total: 1831.00 },
];

// ═══════════════════════════════════════════════
//  NOTIFICAÇÕES
// ═══════════════════════════════════════════════
export const mockNotifications: AdminNotification[] = [
  { id: 'n1', title: 'Novo pedido recebido', message: 'Ana Oliveira realizou um pedido de R$ 245,60', type: 'order', read: false, createdAt: daysAgo(0) },
  { id: 'n2', title: 'Pagamento confirmado', message: 'PIX de R$ 97,00 confirmado — Pedido ORD-1048', type: 'payment', read: false, createdAt: daysAgo(0) },
  { id: 'n3', title: 'Coleta concluída', message: 'Dra. Camila finalizou coleta em Kalilândia', type: 'schedule', read: false, createdAt: daysAgo(0) },
  { id: 'n4', title: 'Novo cliente cadastrado', message: 'Diego Martins criou uma conta', type: 'system', read: true, createdAt: daysAgo(1) },
  { id: 'n5', title: 'Pedido cancelado', message: 'Pedido ORD-1052 foi cancelado pelo cliente', type: 'order', read: true, createdAt: daysAgo(1) },
];

// ═══════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════
export const RESULTS_URL = 'http://anacli.ddns.com.br:8090/web_laudos/login.asp';

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  pix: 'PIX',
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
  boleto: 'Boleto',
  cash: 'Dinheiro',
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Aguardando pagamento',
  confirmed: 'Confirmado',
  processing: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

export const SCHEDULE_STATUS_LABELS: Record<string, string> = {
  scheduled: 'Agendado',
  collector_assigned: 'Coletador atribuído',
  en_route: 'A caminho',
  collecting: 'Coletando',
  collected: 'Coletado',
  in_lab: 'No laboratório',
  processing: 'Processando',
  ready: 'Resultado pronto',
  delivered: 'Entregue',
};
