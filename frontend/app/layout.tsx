import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'PatientScure - Ayurvedic Health Information',
  description: 'Authentic Ayurvedic health information, traditional remedies, and natural healing practices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-full antialiased'
    >
      <body className='min-h-full flex flex-col bg-background dark:bg-background-dark'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

