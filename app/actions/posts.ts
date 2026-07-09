'use server'

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma'
import {revalidateTag} from 'next/cache'
import { redirect} from "next/navigation";


export type PostFormState = {
    error?: string;
    success?: boolean;
};

export async function createPost(prevState: PostFormState | null, formData: FormData): Promise<PostFormState> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return { error: 'Потрібно увійти, щоб створити пост' };
    }
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
        return { error: 'Заповни всі поля' };
    }

    if (title.length < 3) {
        return { error: 'Заголовок має бути довшим за 3 символи' };
    }

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9а-яіїєґ\s]/gi, '')
        .replace(/\s+/g, '-');

    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
        return { error: 'Пост з таким заголовком вже існує' };
    }

    // тимчасово — беремо першого автора з бази
    const author = await prisma.user.findFirst();
    if (!author) throw new Error('Немає жодного автора в базі');

    await prisma.post.create({
        data: { title, content, slug, published: true, authorId: session.user.id },
    });

    // ключовий момент — інвалідуємо саме той тег, який ми повісили в getPosts()
    revalidateTag('posts', 'max');

    redirect('/');
}