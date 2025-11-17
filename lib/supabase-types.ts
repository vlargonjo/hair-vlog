export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          auth_provider: string | null;
          oauth_id: string | null;
          created_at: string;
          marketing_opt_in: boolean | null;
        };
        Insert: {
          id?: string;
          email?: string | null;
          auth_provider?: string | null;
          oauth_id?: string | null;
          created_at?: string;
          marketing_opt_in?: boolean | null;
        };
        Update: Database["public"]["Tables"]["users"]["Insert"];
      };
      hair_analysis: {
        Row: {
          id: string;
          user_id: string | null;
          upload_id: string | null;
          hair_type: string | null;
          dryness_score: number | null;
          curl_score: number | null;
          recommendations: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          upload_id?: string | null;
          hair_type?: string | null;
          dryness_score?: number | null;
          curl_score?: number | null;
          recommendations?: Json | null;
          created_at?: string;
        };
        Update: Database["public"]["Tables"]["hair_analysis"]["Insert"];
      };
      products: {
        Row: {
          id: string;
          name: string;
          brand_id: string | null;
          description: string | null;
          image: string | null;
          price: number | null;
          category: string | null;
          partner_link: string | null;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand_id?: string | null;
          description?: string | null;
          image?: string | null;
          price?: number | null;
          category?: string | null;
          partner_link?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: Database["public"]["Tables"]["products"]["Insert"];
      };
      product_brands: {
        Row: {
          id: string;
          name: string;
          website: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          website?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: Database["public"]["Tables"]["product_brands"]["Insert"];
      };
      procedures: {
        Row: {
          id: string;
          title: string;
          summary: string | null;
          steps: Json;
          duration: number | null;
          seo_slug: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          summary?: string | null;
          steps: Json;
          duration?: number | null;
          seo_slug?: string | null;
          created_at?: string;
        };
        Update: Database["public"]["Tables"]["procedures"]["Insert"];
      };
      recommendations: {
        Row: {
          id: string;
          analysis_id: string | null;
          data: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          analysis_id?: string | null;
          data: Json;
          created_at?: string;
        };
        Update: Database["public"]["Tables"]["recommendations"]["Insert"];
      };
      uploads: {
        Row: {
          id: string;
          user_id: string | null;
          s3_key: string | null;
          encrypted: boolean | null;
          save_allowed: boolean | null;
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          s3_key?: string | null;
          encrypted?: boolean | null;
          save_allowed?: boolean | null;
          status?: string | null;
          created_at?: string;
        };
        Update: Database["public"]["Tables"]["uploads"]["Insert"];
      };
      ads: {
        Row: {
          id: string;
          name: string;
          cta: string | null;
          image: string | null;
          url: string | null;
          metrics: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          cta?: string | null;
          image?: string | null;
          url?: string | null;
          metrics?: Json | null;
          created_at?: string;
        };
        Update: Database["public"]["Tables"]["ads"]["Insert"];
      };
    };
  };
}

