import { Montserrat, Inter } from '@next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import './globals.css';
import Navbar from './NavBar';
import GAEl from './_shared/utils/GAEl';

const interFont = Inter({
  subsets: ['latin'],
  style: 'normal',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={interFont.className}>
      <Head>
        <title>Prashan Fernando</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#F8F8F8" />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        )}
      </Head>
      <body className="md:pl-[230px] lg:pl-[300px] md:pt-0 bg-[#f8f8f8]">
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
        <div className="fixed top-0 left-0 bg-black text-yellow-300 z-50 text-sm px-1 hover:hidden">
          <span className="sm:hidden">xs</span>
          <span className="hidden sm:block md:hidden">sm</span>
          <span className="hidden md:block lg:hidden">md</span>
          <span className="hidden lg:block xl:hidden">lg</span>
          <span className="hidden xl:block 2xl:hidden">xl</span>
          <span className="hidden 2xl:block">2xl</span>
        </div>
      </body>
    </html>
  );
}