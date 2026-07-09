'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        await authClient.signUp.email(
            { name, email, password },
            {
                onSuccess: () => {
                    router.push('/');
                    router.refresh();
                },
                onError: (ctx) => {
                    setError(ctx.error.message ?? 'Помилка реєстрації');
                },
            }
        );
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Реєстрація</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ім'я" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required minLength={8} />
            <button type="submit">Зареєструватись</button>
        </form>
    );
}