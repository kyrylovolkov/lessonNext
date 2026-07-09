import { prisma } from '../lib/prisma';

async function main() {
    const user = await prisma.user.create({
        data: { name: 'Тестовий автор', email: 'author@example.com' },
    });

    await prisma.post.createMany({
        data: [
            { title: 'Перший пост', slug: 'first-post', content: 'Контент 1', published: true, authorId: user.id },
            { title: 'Другий пост', slug: 'second-post', content: 'Контент 2', published: true, authorId: user.id },
        ],
    });
}

main().finally(() => prisma.$disconnect());