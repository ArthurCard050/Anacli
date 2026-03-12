// Tipos para o sistema de usuário

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ExamSchedule {
  id: string;
  userId: string;
  examId: string;
  examName: string;
  examType: 'individual' | 'package';
  status: 'scheduled' | 'collected' | 'processing' | 'ready' | 'delivered';
  scheduledDate: string;
  collectionDate?: string;
  resultDate?: string;
  deliveryDate?: string;
  location: 'lab' | 'home';
  address?: Address;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  shippingAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  type: 'exam' | 'package';
  price: number;
  quantity: number;
}

export interface ExamResult {
  id: string;
  examScheduleId: string;
  userId: string;
  examName: string;
  resultUrl?: string;
  resultData?: any;
  status: 'processing' | 'ready' | 'delivered';
  createdAt: string;
  deliveredAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Estados do dashboard
export interface DashboardStats {
  totalExams: number;
  scheduledExams: number;
  completedExams: number;
  pendingResults: number;
  totalSpent: number;
}