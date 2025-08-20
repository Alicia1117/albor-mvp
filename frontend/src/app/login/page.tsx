// src/app/login/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Login | Albor',
    description: 'Sign in to your account',
};

export default function LoginPage() {
    return (
        <main className="min-h-[calc(100dvh)] grid place-items-center px-4">
            <section className="w-full max-w-md p-6 border shadow-xl rounded-2xl border-neutral-800/50 bg-neutral-900">
                <header className="mb-6 space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">sign in</h1>
                    <p className="text-sm text-neutral-400">
                        enter your credentials to continue
                    </p>
                </header>

                <form className="space-y-4" noValidate>
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
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className="w-full px-3 py-2 border outline-none rounded-xl border-neutral-700 bg-neutral-950 ring-0 focus:border-neutral-500"
                            aria-label="password"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link
                            href="/forgot-password"
                            className="text-neutral-300 underline-offset-4 hover:underline"
                        >
                            forgot password?
                        </Link>
                        <Link
                            href="/signup"
                            className="text-neutral-300 underline-offset-4 hover:underline"
                        >
                            create account
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled
                        className="w-full px-4 py-2 mt-2 rounded-xl bg-neutral-200 text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-disabled="true"
                        title="disabled for UI-only stub"
                    >
                        sign in
                    </button>
                </form>
            </section>
        </main>
    );
}
