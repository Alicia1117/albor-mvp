'use client';
import { useAuth } from '@/auth/auth-context';

export default function Home() {
    const { user, loading, signOut } = useAuth();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl text-red-500">Hello World</h1>
                <p className="text-4xl font-huninn">繁體中文測試</p>
                <div>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        <>
                            <p>{user ? user.email : 'guest'}</p>
                            <div className="flex gap-4 mt-4">
                                {!user ? (
                                    <a href="/login">
                                        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                            登入
                                        </button>
                                    </a>
                                ) : (
                                    <button
                                        className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                                        onClick={async () => {
                                            await signOut();
                                        }}
                                    >
                                        登出
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
