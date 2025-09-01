'use client';
import { useAuth } from '@/auth/auth-context';
import { Button } from '@/components/ui/button';

export default function Home() {
    const { user, loading, signOut } = useAuth();
    // 切換深色模式
    function toggleTheme() {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark');
        }
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl text-red-500">Hello World</h1>
                <p className="text-4xl font-huninn">繁體中文測試</p>
                <div>
                    <Button
                        variant="ghost"
                        onClick={toggleTheme}
                        className="mb-4"
                    >
                        切換深色模式
                    </Button>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        <>
                            <p>{user ? user.email : 'guest'}</p>
                            <div className="flex gap-4 mt-4">
                                {!user ? (
                                    <a href="/login">
                                        <Button variant={'primary'}>
                                            登入
                                        </Button>
                                    </a>
                                ) : (
                                    <Button
                                        variant={'primary'}
                                        onClick={async () => {
                                            await signOut();
                                        }}
                                    >
                                        登出
                                    </Button>
                                )}
                            </div>
                            <div>
                                <Button>主動作</Button>
                                <Button variant="secondary">次動作</Button>
                                <Button variant="ghost">返回</Button>
                                <Button variant="danger">刪除</Button>
                                <Button variant="info">通知樣式</Button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
