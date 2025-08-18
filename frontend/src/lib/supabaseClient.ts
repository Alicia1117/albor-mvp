import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!url || !anon) {
    throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
}

let _client: SupabaseClient | undefined;

// 若你有 Database 泛型可替換成 createClient<Database>
export const supabase: SupabaseClient =
    _client ??
    (_client = createClient(url, anon, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true, // 用於處理 OAuth redirect
        },
    }));
