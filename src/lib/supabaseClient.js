// src/lib/supabaseClient.js
//
// Single shared Supabase client for the whole app. The anon key is safe
// to ship in client-side code — it's designed to be public. Actual
// security comes from Row Level Security policies on the database
// (see sql/schema.sql), not from hiding this key.
//
// Vite only exposes env vars prefixed with VITE_ to client code, so
// both of these MUST be set with that exact prefix in Vercel's
// Environment Variables settings.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
