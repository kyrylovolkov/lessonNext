'use client';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div>
            <h2>Щось пішло не так під час завантаження поста</h2>
            <button onClick={() => reset()}>Спробувати знову</button>
        </div>
    );
}