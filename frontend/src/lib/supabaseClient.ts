import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// These environment variables are embedded into the client bundle at build time in Next.js
const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Optional: One-time check during development to avoid silently missing env vars
if (!url || !anon) {
    // This only executes when referenced on client side
    // You can change to console.warn to avoid interruption
    throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
}

// Singleton (avoid multiple clients during HMR)
let _client: SupabaseClient | undefined;

export const supabase: SupabaseClient =
    _client ??
    (_client = createClient(url, anon, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    }));
