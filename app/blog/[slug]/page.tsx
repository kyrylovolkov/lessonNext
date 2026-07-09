import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Comments } from './_components/comments';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';


export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.post.findUnique({ where: { slug } });

    if (!post) return {};

    return {
        title: post.title,
        description: post.content.slice(0, 160),
        openGraph: {
            title: post.title,
            description: post.content.slice(0, 160),
            type: 'article',
        },
    };
}


async function getPost(slug: string) {
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { author: true },
    });
    if (!post) notFound();
    return post;
}

export default async function BlogPostPage({
                                               params,
                                           }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    return (
        <article>
            <h1>{post.title}</h1>
            <p>Автор: {post.author.name}</p>
            <div>{post.content}</div>

            <section>
                <h2>Коментарі</h2>
                <Suspense fallback={<p>Завантаження коментарів...</p>}>
                    <Comments postId={post.id} />
                </Suspense>
            </section>
        </article>
    );
}