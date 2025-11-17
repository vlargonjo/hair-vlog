export type HairType = "Straight-1" | "Wavy-2A" | "Wavy-2B" | "Curly-3A" | "Coily-4A";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  category: string;
  hairTypes: HairType[];
  partnerLink: string;
  tags?: string[];
  favorite?: boolean;
}

export interface Procedure {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  duration: number;
  difficulty: "easy" | "medium" | "pro";
  coverImage: string;
}

export interface HairAnalysis {
  id: string;
  userId?: string;
  hairType: HairType;
  issues: string[];
  drynessScore: number;
  curlScore: number;
  recommendations: string[];
  createdAt: string;
  imageUrl?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

export interface UploadRecord {
  id: string;
  url?: string;
  encrypted: boolean;
  saveAllowed: boolean;
  status: "pending" | "processed" | "failed";
  createdAt: string;
}

export interface BrandAd {
  id: string;
  name: string;
  cta: string;
  image: string;
  url: string;
  metrics: {
    ctr: number;
    impressions: number;
  };
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta?: string;
}

