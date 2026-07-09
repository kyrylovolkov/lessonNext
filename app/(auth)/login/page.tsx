'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        await authClient.signIn.email(
            { email, password },
            {
                onSuccess: () => {
                    router.push('/');
                    router.refresh();
                },
                onError: (ctx) => {
                    setError(ctx.error.message ?? 'Помилка входу');
                },
            }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Увійти</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
            <button type="submit">Увійти</button>
        </form>
    );
}