'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { updateTag } from 'next/cache';

export async function createComment(postId: string, text: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error('Потрібно увійти');
    if (!text.trim()) throw new Error('Коментар не може бути порожнім');

    await prisma.comment.create({
        data: { text, postId, authorId: session.user.id },
    });

    updateTag(`comments-${postId}`);
}