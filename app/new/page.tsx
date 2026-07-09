'use client';

import { useActionState } from 'react';
import { createPost, type PostFormState } from '@/app/actions/posts';
import {SubmitButton} from "@/app/components/ui/submit-button";

const initialState: PostFormState = {};

export default function NewPostForm() {
    const [state, formAction] = useActionState(createPost, initialState);

    return (
        <main>
            <h1>Новий пост</h1>

            {state?.error && (
                <p style={{ color: 'red' }}>{state.error}</p>
            )}
        <form action={formAction}>
            <input name="title" required />
            <textarea name="content" required />
            <SubmitButton />
        </form>
            </main>
    );
}