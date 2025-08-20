'use client';

import { useState } from 'react';
import { useAuth } from '@/auth/auth-context';

export default function DebugAuth() {
    const { user, loading, signIn, signOut } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (loading) return <p>loading...</p>;

    return (
        <div style={{ display: 'grid', gap: 8 }}>
            <div>status: {user ? user.email : 'guest'}</div>

            {!user ? (
                <>
                    <input
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button onClick={() => signIn(email, password)}>
                        sign in
                    </button>
                </>
            ) : (
                <button onClick={() => signOut()}>sign out</button>
            )}
        </div>
    );
}
