import { createClient } from '@supabase/supabase-js'

// Intentar leer de .env o usar las llaves directas de respaldo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://uoyflugqjfuwrjzukach.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveWZsdWdxamZ1d3JqenVrYWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDI3NTUsImV4cCI6MjEwMTM3ODc1NX0.yv2-psk8Tk6Hg8kdoICpXZOnsPj1VvtTqNaRKCUrMuw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Nombres de tablas y buckets (coinciden con el schema.sql)
export const TABLE_NAME = 'wedding_uploads'
export const BUCKET_NAME = 'wedding-media'
export const RSVP_TABLE_NAME = 'wedding_rsvps'

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024   // 8 MB
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024  // 50 MB