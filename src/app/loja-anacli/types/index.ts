// Tipos para o E-commerce Anacli

export interface Exam {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  category: ExamCategory;
  preparationInfo?: string[];
  deliveryTime: string; // Ex: "24h", "48h"
  featured?: boolean;
  popular?: boolean;
  image?: string;
  tags?: string[];
}

export interface ExamPackage {
  id: string;
  title: string;
  slug: string;
  description: string;
  exams: string[]; // IDs dos exames incluídos
  price: number;
  originalPrice?: number;
  discount?: string;
  featured?: boolean;
  image?: string;
  benefits?: string[];
}

export type ExamCategory = 
  | 'check-up'
  | 'hormonal'
  | 'vitaminas'
  | 'cardiaco'
  | 'hepatico'
  | 'renal'
  | 'tireoide'
  | 'diabetes'
  | 'alergias'
  | 'dst'
  | 'outros';

export interface CartItem {
  id: string;
  type: 'exam' | 'package';
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export interface SearchFilters {
  category?: ExamCategory;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'price-asc' | 'price-desc' | 'popular' | 'name';
  searchQuery?: string;
}

export interface UploadedPrescription {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  status: 'processing' | 'completed' | 'error';
  detectedExams?: string[];
}
