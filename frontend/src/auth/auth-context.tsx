'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { UserDTO } from '@albor-mvp/shared/src/dto/user.dto';
import { supabase } from '@/lib/supabaseClient';

type User = UserDTO;

type AuthState = {
    loading: boolean;
    user: User | null;
};

type AuthContextValue = AuthState & {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// 🔧 抽出映射：Supabase user -> UserDTO
function toUserDTO(
    u: NonNullable<
        Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user']
    >
): User {
    return {
        id: u.id,
        email: u.email ?? '',
        createdAt: u.created_at ?? '',
        name:
            ((u.user_metadata as Record<string, unknown>)?.name as string) ??
            null,
    };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (!mounted) return;
                if (error) {
                    console.error('[auth] getSession error:', error);
                    setUser(null);
                } else {
                    setUser(
                        data.session?.user ? toUserDTO(data.session.user) : null
                    );
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!mounted) return;
            setUser(session?.user ? toUserDTO(session.user) : null);
            // 不再在這裡 setLoading(false)；初始化流程會處理，之後狀態即時更新
        });

        initAuth();

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        // TODO: 接 supabase

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        console.log('signIn 還沒串接完成');
    };

    const signOut = async () => {
        // TODO: 接 supabase

        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        console.log('signOut 還沒串接完成');
    };

    const value = useMemo<AuthContextValue>(
        () => ({ loading, user, signIn, signOut }),
        [loading, user]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
}
