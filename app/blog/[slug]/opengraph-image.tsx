import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
                                                 params,
                                             }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({ where: { slug } });

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 64,
                    background: '#0f172a',
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 80,
                    textAlign: 'center',
                }}
            >
                {post?.title ?? 'Мій блог'}
            </div>
        ),
        size
    );
}