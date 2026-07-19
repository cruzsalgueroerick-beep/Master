export interface FeeService {
  id: string;
  name: string;
  category: 'demandas_solicitudes' | 'contestaciones_defensas' | 'impugnaciones_recursos' | 'diligencias_otros';
  basePrice: number;
  priceNote?: string;
  description: string;
  lawReference?: string;
}

export interface SelectedService {
  service: FeeService;
  customNotes?: string;
  hasBono?: boolean;
  bonoPercent?: number;
  variablePrice?: number; // for negotiable / variable fees
}

export interface Quotation {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  items: SelectedService[];
  notes?: string;
}

export interface ReviewTestimonial {
  id: string;
  author: string;
  role: string;
  firm: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
