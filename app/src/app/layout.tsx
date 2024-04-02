import NavBar from '@/app/NavBar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getSession } from './auth/auth';
import { StoreProvider } from './redux/StoreProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Challenges manager',
  description: 'CodeCLA challenges management',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
      {/* <link rel="icon" type="image/svg+xml" href="/logo.svg" /> */}
      <body className={`flex flex-col h-screen w-screen overflow-scroll ${inter.variable}`}>
        <main className="flex-grow w-full h-full overflow-scroll">
          {children}
        </main>
      </body>
    </html>
    </StoreProvider>
  );
}
