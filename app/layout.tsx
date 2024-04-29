import { DM_Mono, Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import './globals.css';
import Navbar from './NavBar';
import GAEl from './_shared/utils/GAEl';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';
import { Analytics } from '@vercel/analytics/react';

const interFont = Inter({
  subsets: ['latin'],
  style: 'normal',
  preload: true,
});

const dmFont = DM_Mono({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

export default function RootLayout({ children }) {
  return (
    <HydrationOverlay>
      <html lang="en" className={`${interFont.className} ${dmFont.variable}`}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#FFFFFF" />
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
          )}
        </Head>
        <body className="max-w-2xl m-auto mx-4 mt-8 mb-40 overflow-y-scroll antialiased bg-white md:flex-row lg:mx-auto vsc-initialized lg:max-w-2xl">
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <Script
              id="google-analytics-embed"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          )}
          <GAEl />
          <Navbar />
          {children}
          <p className="hidden px-4 py-4 text-xs italic text-center md:block text-slate-500">
            &copy; {new Date().getFullYear()} Prashan Fernando. All rights reserved.
          </p>
          <Analytics />
        </body>
      </html>
    </HydrationOverlay>
  );
}
