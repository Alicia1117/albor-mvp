'use client';

import { useAuth } from '@/auth/auth-context';

export default function DebugAuth() {
    const { loading, user, signIn, signOut } = useAuth();

    if (loading) return <div>loading...</div>;

    return (
        <div>
            <pre>{JSON.stringify({ user }, null, 2)}</pre>
            <button onClick={() => signIn('test@test.com', 'password')}>
                Sign In (未實作)
            </button>
            <button onClick={() => signOut()}>Sign Out (未實作)</button>
        </div>
    );
}
