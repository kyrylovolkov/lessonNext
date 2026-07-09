'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }, []);

    function handleClose() {
        router.back();
    }

    function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
        if (e.target === dialogRef.current) {
            dialogRef.current?.close();
        }
    }

    return (
        <dialog ref={dialogRef} onClose={handleClose} onClick={handleBackdropClick}>
            <form method="dialog">
                <button>Закрити ✕</button>
            </form>
            {children}
        </dialog>
    );
}