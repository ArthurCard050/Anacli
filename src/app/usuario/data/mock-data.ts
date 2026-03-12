import { User, ExamSchedule, Order, ExamResult, Notification, DashboardStats } from '../types';

// Usuário mock para desenvolvimento
export const mockUser: User = {
  id: 'user-123',
  email: 'joao.silva@email.com',
  name: 'João Silva',
  phone: '(11) 99999-9999',
  cpf: '123.456.789-00',
  birthDate: '1985-03-15',
  address: {
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  },
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-03-10T14:30:00Z'
};

// Exames agendados mock
export const mockExamSchedules: ExamSchedule[] = [
  {
    id: 'schedule-1',
    userId: 'user-123',
    examId: 'hemograma-completo',
    examName: 'Hemograma Completo',
    examType: 'individual',
    status: 'scheduled',
    scheduledDate: '2024-03-15T08:00:00Z',
    location: 'lab',
    price: 45.00,
    paymentStatus: 'paid',
    paymentMethod: 'Cartão de Crédito',
    createdAt: '2024-03-10T10:00:00Z'
  },
  {
    id: 'schedule-2',
    userId: 'user-123',
    examId: 'checkup-completo',
    examName: 'Check-up Completo',
    examType: 'package',
    status: 'collected',
    scheduledDate: '2024-03-08T09:00:00Z',
    collectionDate: '2024-03-08T09:15:00Z',
    resultDate: '2024-03-12T16:00:00Z',
    location: 'home',
    address: mockUser.address,
    price: 280.00,
    paymentStatus: 'paid',
    paymentMethod: 'PIX',
    createdAt: '2024-03-05T14:20:00Z'
  },
  {
    id: 'schedule-3',
    userId: 'user-123',
    examId: 'glicemia-jejum',
    examName: 'Glicemia de Jejum',
    examType: 'individual',
    status: 'ready',
    scheduledDate: '2024-03-01T07:30:00Z',
    collectionDate: '2024-03-01T07:45:00Z',
    resultDate: '2024-03-02T14:00:00Z',
    location: 'lab',
    price: 25.00,
    paymentStatus: 'paid',
    paymentMethod: 'Cartão de Débito',
    createdAt: '2024-02-28T16:00:00Z'
  }
];

// Pedidos mock - Estilo E-commerce
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    userId: 'user-123',
    items: [
      {
        id: 'item-1',
        name: 'Hemograma Completo',
        type: 'exam',
        price: 45.00,
        quantity: 1
      }
    ],
    total: 45.00,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Cartão de Crédito',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:05:00Z'
  },
  {
    id: 'order-002',
    userId: 'user-123',
    items: [
      {
        id: 'item-2',
        name: 'Check-up Completo',
        type: 'package',
        price: 280.00,
        quantity: 1
      },
      {
        id: 'item-3',
        name: 'Glicemia de Jejum',
        type: 'exam',
        price: 25.00,
        quantity: 1
      }
    ],
    total: 305.00,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'PIX',
    createdAt: '2024-03-05T14:20:00Z',
    updatedAt: '2024-03-08T14:25:00Z'
  },
  {
    id: 'order-003',
    userId: 'user-123',
    items: [
      {
        id: 'item-4',
        name: 'Colesterol Total',
        type: 'exam',
        price: 35.00,
        quantity: 1
      },
      {
        id: 'item-5',
        name: 'Triglicerídeos',
        type: 'exam',
        price: 35.00,
        quantity: 1
      }
    ],
    total: 70.00,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Cartão de Débito',
    createdAt: '2024-02-20T09:30:00Z',
    updatedAt: '2024-02-22T16:00:00Z'
  },
  {
    id: 'order-004',
    userId: 'user-123',
    items: [
      {
        id: 'item-6',
        name: 'Vitamina D',
        type: 'exam',
        price: 80.00,
        quantity: 1
      }
    ],
    total: 80.00,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Boleto',
    createdAt: '2024-03-12T16:30:00Z',
    updatedAt: '2024-03-12T16:30:00Z'
  },
  {
    id: 'order-005',
    userId: 'user-123',
    items: [
      {
        id: 'item-7',
        name: 'Ultrassom Abdominal',
        type: 'exam',
        price: 120.00,
        quantity: 1
      },
      {
        id: 'item-8',
        name: 'ECG',
        type: 'exam',
        price: 60.00,
        quantity: 1
      }
    ],
    total: 180.00,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'PIX',
    createdAt: '2024-03-11T09:15:00Z',
    updatedAt: '2024-03-11T09:15:00Z'
  },
  {
    id: 'order-006',
    userId: 'user-123',
    items: [
      {
        id: 'item-9',
        name: 'Raio-X Tórax',
        type: 'exam',
        price: 90.00,
        quantity: 1
      }
    ],
    total: 90.00,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Cartão de Crédito',
    createdAt: '2024-03-09T11:45:00Z',
    updatedAt: '2024-03-09T14:20:00Z'
  },
  {
    id: 'order-007',
    userId: 'user-123',
    items: [
      {
        id: 'item-10',
        name: 'Hemograma Completo',
        type: 'exam',
        price: 45.00,
        quantity: 1
      },
      {
        id: 'item-11',
        name: 'Glicemia de Jejum',
        type: 'exam',
        price: 25.00,
        quantity: 1
      },
      {
        id: 'item-12',
        name: 'Colesterol Total',
        type: 'exam',
        price: 35.00,
        quantity: 1
      },
      {
        id: 'item-13',
        name: 'Triglicerídeos',
        type: 'exam',
        price: 35.00,
        quantity: 1
      },
      {
        id: 'item-14',
        name: 'Vitamina D',
        type: 'exam',
        price: 80.00,
        quantity: 1
      },
      {
        id: 'item-15',
        name: 'Vitamina B12',
        type: 'exam',
        price: 65.00,
        quantity: 1
      },
      {
        id: 'item-16',
        name: 'TSH',
        type: 'exam',
        price: 40.00,
        quantity: 1
      },
      {
        id: 'item-17',
        name: 'T4 Livre',
        type: 'exam',
        price: 45.00,
        quantity: 1
      },
      {
        id: 'item-18',
        name: 'Creatinina',
        type: 'exam',
        price: 30.00,
        quantity: 1
      },
      {
        id: 'item-19',
        name: 'Ureia',
        type: 'exam',
        price: 25.00,
        quantity: 1
      }
    ],
    total: 425.00,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'PIX',
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-02-18T15:45:00Z'
  }
];

// Resultados de exames mock
export const mockExamResults: ExamResult[] = [
  {
    id: 'result-1',
    examScheduleId: 'schedule-3',
    userId: 'user-123',
    examName: 'Glicemia de Jejum',
    resultUrl: '/results/glicemia-jejum-result.pdf',
    status: 'ready',
    createdAt: '2024-03-02T14:00:00Z'
  },
  {
    id: 'result-2',
    examScheduleId: 'schedule-2',
    userId: 'user-123',
    examName: 'Check-up Completo',
    status: 'processing',
    createdAt: '2024-03-08T09:15:00Z'
  }
];

// Notificações mock
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-123',
    title: 'Resultado Disponível',
    message: 'O resultado do seu exame de Glicemia de Jejum está pronto para download.',
    type: 'success',
    read: false,
    createdAt: '2024-03-02T14:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-123',
    title: 'Lembrete de Exame',
    message: 'Você tem um exame agendado para amanhã às 08:00. Lembre-se do jejum de 12 horas.',
    type: 'info',
    read: false,
    createdAt: '2024-03-14T18:00:00Z'
  },
  {
    id: 'notif-3',
    userId: 'user-123',
    title: 'Coleta Realizada',
    message: 'A coleta do seu Check-up Completo foi realizada com sucesso. Resultado em até 3 dias úteis.',
    type: 'success',
    read: true,
    createdAt: '2024-03-08T09:30:00Z'
  }
];

// Estatísticas do dashboard
export const mockDashboardStats: DashboardStats = {
  totalExams: 3,
  scheduledExams: 1,
  completedExams: 2,
  pendingResults: 1,
  totalSpent: 350.00
};

// Funções utilitárias para simular API
export const mockApi = {
  // Simular delay de rede
  delay: (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Login
  login: async (email: string, password: string): Promise<User | null> => {
    await mockApi.delay(1500);
    if (email === mockUser.email && password === 'senha123') {
      return mockUser;
    }
    return null;
  },
  
  // Registro
  register: async (userData: any): Promise<User | null> => {
    await mockApi.delay(2000);
    // Simular sucesso sempre para desenvolvimento
    return {
      ...mockUser,
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      cpf: userData.cpf,
      birthDate: userData.birthDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },
  
  // Buscar dados do usuário
  getUserData: async (userId: string) => {
    await mockApi.delay(800);
    return {
      user: mockUser,
      examSchedules: mockExamSchedules,
      orders: mockOrders,
      examResults: mockExamResults,
      notifications: mockNotifications,
      stats: mockDashboardStats
    };
  },

  // Buscar estatísticas do dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await mockApi.delay(500);
    return mockDashboardStats;
  },

  // Buscar exames agendados
  getExamSchedules: async (): Promise<ExamSchedule[]> => {
    await mockApi.delay(600);
    return mockExamSchedules;
  },

  // Buscar resultados de exames
  getExamResults: async (): Promise<ExamResult[]> => {
    await mockApi.delay(600);
    return mockExamResults;
  },

  // Buscar notificações
  getNotifications: async (): Promise<Notification[]> => {
    await mockApi.delay(500);
    return mockNotifications;
  },

  // Buscar pedidos
  getOrders: async (): Promise<Order[]> => {
    await mockApi.delay(600);
    return mockOrders;
  }
};