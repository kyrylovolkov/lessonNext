import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import { UserNav } from '@/app/components/user-nav';
import Link from 'next/link';

import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
});

export const metadata: Metadata = {
  title: 'Мій блог',
  description: 'Пет-проект на Next.js 16',
};

export default function RootLayout({
                                     children,
    modal,
                                   }: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
      <html lang="uk">
      <body>
      <header>
        <nav>
          <Link href="/">Блог</Link>
          <Suspense fallback={<span>...</span>}>
            <UserNav />
          </Suspense>
        </nav>
      </header>
      <main>{children}</main>
      {modal}
      </body>
      </html>
  );
}