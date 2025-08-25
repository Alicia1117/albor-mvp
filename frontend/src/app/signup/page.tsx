'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    // 移除 useAuth，signup 不需要登入狀態

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name },
                },
            });
            if (signUpError) {
                setError(signUpError.message || '註冊失敗，請稍後再試。');
            } else {
                setSuccess(true);
            }
        } catch {
            setError('註冊失敗，請稍後再試。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100dvh)] grid place-items-center px-4">
            <section className="w-full max-w-md p-6 border shadow-xl rounded-2xl border-neutral-800/50 bg-neutral-900">
                <header className="mb-6 space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">sign up</h1>
                    <p className="text-sm text-neutral-400">
                        create your account to continue
                    </p>
                </header>

                <form className="space-y-4" noValidate onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm">
                            name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="your name"
                            className="w-full px-3 py-2 border outline-none rounded-xl border-neutral-700 bg-neutral-950 ring-0 focus:border-neutral-500 focus:outline-none"
                            aria-label="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm">
                            email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 border outline-none rounded-xl border-neutral-700 bg-neutral-950 ring-0 focus:border-neutral-500 focus:outline-none"
                            aria-label="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm">
                            password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="w-full px-3 py-2 border outline-none rounded-xl border-neutral-700 bg-neutral-950 ring-0 focus:border-neutral-500"
                            aria-label="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <Link
                            href="/login"
                            className="text-neutral-300 underline-offset-4 hover:underline"
                        >
                            already have account?
                        </Link>
                    </div>
                    {error && (
                        <div className="text-sm text-center text-red-500">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 mt-2 rounded-xl bg-neutral-200 text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-disabled={loading}
                        title={loading ? 'signing up...' : 'sign up'}
                    >
                        {loading ? 'signing up...' : 'sign up'}
                    </button>
                </form>
                {success && (
                    <div className="mt-4 text-center text-green-500">
                        註冊成功！請至信箱收驗證信。
                    </div>
                )}
            </section>
        </main>
    );
}
