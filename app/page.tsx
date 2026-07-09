import { prisma } from '@/lib/prisma';
import { cacheLife, cacheTag } from 'next/cache';
import Link from "next/link";

interface Post {
  id: number;
  title: string;
}

async function getPosts() {
    'use cache';
    cacheTag('posts');
    cacheLife('hours');

    return prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });
}

export default async function HomePage() {
  const posts = await getPosts();
  return (
      <main>
        <h1>POSTS</h1>
        <ul>
          {posts.map((post) => (
              <li key={post.id}>{
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              }</li>
          ))}
        </ul>
      </main>
  )
}