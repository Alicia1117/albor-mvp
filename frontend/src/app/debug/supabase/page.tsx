'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SupabaseDebug() {
    const [ok, setOk] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(() => {
                setOk(true);
                setLoading(false);
            })
            .catch(e => {
                setError(String(e));
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Supabase Client</h1>
            <p>{loading ? '⏳ checking...' : ok ? '✅ ready' : '❌ failed'}</p>
            {error && (
                <div className="p-4 mt-4 border border-red-200 rounded bg-red-50">
                    <h2 className="font-semibold text-red-800">Error:</h2>
                    <pre className="text-sm text-red-600 whitespace-pre-wrap">
                        {error}
                    </pre>
                </div>
            )}
        </div>
    );
}
