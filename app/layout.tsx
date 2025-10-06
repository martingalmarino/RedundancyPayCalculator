import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Redundancy Pay Calculator - Ireland | Calculate Your Statutory Redundancy',
  description: 'Calculate your statutory redundancy payment under Irish law. Free, accurate calculator based on current legislation. Get instant estimates for your redundancy pay.',
  keywords: 'redundancy pay calculator, Ireland, statutory redundancy, employment law, redundancy payment',
  authors: [{ name: 'RedundancyCalc' }],
  openGraph: {
    title: 'Redundancy Pay Calculator - Ireland',
    description: 'Calculate your statutory redundancy payment under Irish law',
    type: 'website',
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redundancy Pay Calculator - Ireland',
    description: 'Calculate your statutory redundancy payment under Irish law',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
