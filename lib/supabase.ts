import { createClient } from '@supabase/supabase-js'
// Enhanced rental business types for seamless integration

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client (safe for client components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (will be generated from Supabase CLI)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null // Enhanced: renamed from display_name
          display_name: string | null // Legacy compatibility
          phone: string | null
          photo_url: string | null
          avatar_url: string | null // Enhanced: additional avatar field
          address: any | null
          preferences: any | null
          booking_history: string[] | null
          role: 'customer' | 'admin' | 'staff' // Enhanced: role-based system
          // ...existing code...
          is_active: boolean // Enhanced: user status
          last_login: string | null // Enhanced: login tracking
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          phone?: string | null
          photo_url?: string | null
          address?: any | null
          preferences?: any | null
          booking_history?: string[] | null
          // ...existing code...
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          phone?: string | null
          photo_url?: string | null
          address?: any | null
          preferences?: any | null
          booking_history?: string[] | null
          // ...existing code...
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string // Enhanced: SEO-friendly URLs
          description: string
          images: string[]
          daily_rate: number // Enhanced: structured pricing
          security_deposit: number // Enhanced: deposit system
          pricing: any // Legacy compatibility
          specifications: any // Enhanced: detailed specs
          quantity_available: number // Enhanced: inventory tracking
          availability: string[] | null // Legacy compatibility
          category: 'tents' | 'tables' | 'chairs' | 'linens' | 'lighting' | 'audio' // Enhanced: structured categories
          categories: string[] // Legacy compatibility
          tags: string[] // Enhanced: searchable tags
          is_active: boolean // Enhanced: product status
          requires_delivery: boolean // Enhanced: delivery requirements
          setup_time_minutes: number // Enhanced: setup logistics
          weight_lbs: number | null // Enhanced: shipping calculations
          dimensions: any | null // Enhanced: size specifications
          care_instructions: string | null // Enhanced: maintenance info
          replacement_cost: number | null // Enhanced: insurance data
          popularity_score: number // Enhanced: trending products
          status: string // Legacy compatibility
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          images: string[]
          pricing: any
          availability?: string[] | null
          categories: string[]
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          images?: string[]
          pricing?: any
          availability?: string[] | null
          categories?: string[]
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string
          image: string | null
          product_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image?: string | null
          product_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image?: string | null
          product_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          items: any[]
          dates: any
          delivery: any
          payment: any
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: any[]
          dates: any
          delivery: any
          payment: any
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: any[]
          dates?: any
          delivery?: any
          payment?: any
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      availability: {
        Row: {
          id: string
          product_id: string
          blocks: any[]
          maintenance_dates: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          blocks: any[]
          maintenance_dates: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          blocks?: any[]
          maintenance_dates?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          rating: number
          comment: string
          user_id: string
          product_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          rating: number
          comment: string
          user_id: string
          product_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          rating?: number
          comment?: string
          user_id?: string
          product_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          business_hours: any
          delivery_zones: any[]
          pricing_rules: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_hours: any
          delivery_zones: any[]
          pricing_rules: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_hours?: any
          delivery_zones?: any[]
          pricing_rules?: any
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          page: string
          views: number
          product_id: string | null
          conversion: boolean
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          page: string
          views: number
          product_id?: string | null
          conversion: boolean
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          page?: string
          views?: number
          product_id?: string | null
          conversion?: boolean
          date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
