import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { SignOutButton } from '@/app/components/ui/sign-out-button';
import Link from 'next/link';

export async function UserNav() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        return (
            <>
                <span>Привіт, {session.user.name}</span>
                <Link href="/new">Новий пост</Link>
                <SignOutButton />
            </>
        );
    }

    return (
        <>
            <Link href="/login">Увійти</Link>
            <Link href="/register">Реєстрація</Link>
        </>
    );
}