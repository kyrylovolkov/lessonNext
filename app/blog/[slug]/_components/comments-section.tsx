'use client';

import { useOptimistic, useRef, useState, useTransition } from 'react';
import { createComment } from '@/app/actions/comments';

type Comment = {
    id: string;
    text: string;
    author: { name: string };
};

export function CommentsSection({
                                    postId,
                                    initialComments,
                                }: {
    postId: string;
    initialComments: Comment[];
}) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [optimisticComments, addOptimistic] = useOptimistic<Comment[], Comment>(
        initialComments,
        (state, newComment) => [newComment, ...state]
    );

    async function handleSubmit(formData: FormData) {
        const text = formData.get('text') as string;
        setError(null);

        startTransition(async () => {
            addOptimistic({
                id: `temp-${Date.now()}`,
                text,
                author: { name: 'Ти' },
            });
            formRef.current?.reset();

            try {
                await createComment(postId, text);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Не вдалось додати коментар');
            }
        });
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form ref={formRef} action={handleSubmit}>
                <textarea name="text" required placeholder="Твій коментар..." />
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Надсилаю...' : 'Додати коментар'}
                </button>
            </form>

            {optimisticComments.length === 0 ? (
                <p>Коментарів поки немає</p>
            ) : (
                <ul>
                    {optimisticComments.map((comment) => (
                        <li key={comment.id}>
                            <strong>{comment.author.name}:</strong> {comment.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}