import { prisma } from '@/lib/prisma';
import { cacheLife, cacheTag } from 'next/cache';
import { CommentsSection } from './comments-section';

async function getComments(postId: string) {
    'use cache';
    cacheTag(`comments-${postId}`);
    cacheLife('minutes');

    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.comment.findMany({
        where: { postId },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
    });
}

export async function Comments({ postId }: { postId: string }) {
    const comments = await getComments(postId);
    return <CommentsSection postId={postId} initialComments={comments} />;
}