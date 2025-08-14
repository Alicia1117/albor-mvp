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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let mounted = true;

        const initAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (mounted) {
                setUser(
                    session?.user
                        ? {
                              id: session.user.id,
                              email: session.user.email ?? '',
                              createdAt: session.user.created_at ?? '',
                              name: session.user.user_metadata?.name ?? null,
                          }
                        : null
                );
                setLoading(false);
            }
        };

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                setUser(
                    session?.user
                        ? {
                              id: session.user.id,
                              email: session.user.email ?? '',
                              createdAt: session.user.created_at ?? '',
                              name: session.user.user_metadata?.name ?? null,
                          }
                        : null
                );
                setLoading(false);
            }
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

        throw new Error('Not implemented');
    };

    const signOut = async () => {
        // TODO: 接 supabase

        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        throw new Error('Not implemented');
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
