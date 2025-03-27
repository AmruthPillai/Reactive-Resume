export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string
          title: string
          slug: string
          data: Json
          visibility: 'public' | 'private'
          locked: boolean
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          data?: Json
          visibility?: 'public' | 'private'
          locked?: boolean
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          data?: Json
          visibility?: 'public' | 'private'
          locked?: boolean
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      statistics: {
        Row: {
          id: string
          views: number
          downloads: number
          resume_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          views?: number
          downloads?: number
          resume_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          views?: number
          downloads?: number
          resume_id?: string
          created_at?: string
          updated_at?: string
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
      visibility_type: 'public' | 'private'
    }
  }
}