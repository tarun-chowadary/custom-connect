export type UserRole = 'buyer' | 'maker' | 'both';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePhoto?: string;
  bio?: string;
  verified: boolean;
  rating: number;
  joinedAt: Date;
  // Maker specific
  skills?: string[];
  portfolio?: string[];
  avgTurnaround?: number;
  deliveryOptions?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  requestCount: number;
  image: string;
}

export interface Request {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhoto?: string;
  title: string;
  description: string;
  images: string[];
  specs: Record<string, string>;
  categoryId: string;
  categoryName: string;
  budgetMin: number;
  budgetMax: number;
  deadline: Date;
  visibility: 'public' | 'private';
  status: 'seeking' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  viewsCount: number;
  proposalCount: number;
  tags: string[];
}

export interface Proposal {
  id: string;
  requestId: string;
  makerId: string;
  makerName: string;
  makerPhoto?: string;
  makerRating: number;
  makerVerified: boolean;
  price: number;
  timelineDays: number;
  note: string;
  status: 'sent' | 'withdrawn' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Order {
  id: string;
  requestId: string;
  proposalId: string;
  buyerId: string;
  makerId: string;
  advanceAmount: number;
  totalAmount: number;
  status: 'pending_payment' | 'advance_paid' | 'in_production' | 'ready' | 'completed' | 'disputed';
  agreementText: string;
  agreementAcceptedBy?: {
    name: string;
    timestamp: Date;
  };
  createdAt: Date;
}

export interface Message {
  id: string;
  orderId?: string;
  requestId?: string;
  fromUserId: string;
  fromUserName: string;
  fromUserPhoto?: string;
  toUserId: string;
  content: string;
  attachments: string[];
  createdAt: Date;
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerPhoto?: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
