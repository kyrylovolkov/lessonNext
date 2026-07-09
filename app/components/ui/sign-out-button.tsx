'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
    const router = useRouter();

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login');
                    router.refresh();
                },
            },
        });
    }

    return <button onClick={handleSignOut}>Вийти</button>;
}