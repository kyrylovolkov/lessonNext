import { prisma } from '@/lib/prisma';
import { Modal } from './modal';
import { notFound } from 'next/navigation';

export default async function InterceptedPostPage({
                                                      params,
                                                  }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { author: true },
    });

    if (!post) notFound();

    return (
        <Modal>
            <h1>{post.title}</h1>
            <p>Автор: {post.author.name}</p>
            <div>{post.content}</div>
        </Modal>
    );
}