import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true, createdAt: true },
    });

    const postUrls = posts.map((post) => ({
        url: `https://localhost:3000/blog/${post.slug}`,
        lastModified: post.createdAt,
    }));

    return [
        {
            url: 'https://localhost:3000',
            lastModified: new Date(),
        },
        ...postUrls,
    ];
}