import { DM_Mono, Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import './globals.css';
import Navbar from './NavBar';
import GAEl from './_shared/utils/GAEl';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

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
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#F8F8F8" />
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
        </body>
      </html>
    </HydrationOverlay>
  );
}
