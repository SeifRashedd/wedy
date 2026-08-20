export interface InvitationData {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  weddingTime?: string;
  venue?: string;
  location?: string;
  googleMapsUrl?: string;
  mainImage?: string;
  gallery?: string[];
  story?: string;
  rsvpEnabled?: boolean;
  guestWishesEnabled?: boolean;
}

export type FieldType = "text" | "textarea" | "date" | "time" | "url" | "image" | "gallery" | "boolean";

export interface TemplateField {
  name: keyof InvitationData | string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string; 
  step?: number;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  price: number;
  previewImage: string;
  active: boolean;
  fields: TemplateField[];
  steps: { id: number; title: string; description: string }[];
}

export type PaymentMethod = "instapay" | "vodafone_cash";
export type PaymentStatus = "pending" | "approved" | "rejected";
export type OrderStatus = "pending" | "approved" | "rejected" | "cancelled";
export type InvitationStatus = "pending" | "active" | "expired" | "disabled";

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  template_id: string;
  invitation_id: string | null;
  invitation_slug: string | null;
  amount: number;
  payment_method: PaymentMethod;
  payment_screenshot: string | null;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  invitation_data: InvitationData;
  created_at: string;
  approved_at: string | null;
}

export interface Invitation {
  id: string;
  slug: string;
  template_id: string;
  order_id: string;
  data: InvitationData;
  status: InvitationStatus;
  start_date: string | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TemplateRecord {
  id: string;
  name: string;
  description: string;
  price: number;
  preview_image: string;
  active: boolean;
  order_count?: number;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  pendingOrders: number;
  activeInvitations: number;
  expiredInvitations: number;
  monthRevenue: number;
  yearRevenue: number;
}

export interface RevenueSummary {
  today: number;
  thisMonth: number;
  thisYear: number;
  allTime: number;
}

export const PAYMENT_ACCOUNTS = {
  instapay: {
    label: "InstaPay",
    account: "01234567890",
    name: "Wedy Wedding Invitations",
  },
  vodafone_cash: {
    label: "Vodafone Cash",
    account: "01012345678",
    name: "Wedy Wedding Invitations",
  },
} as const;

export const INVITATION_DURATION_DAYS = 30;
