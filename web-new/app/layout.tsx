import { Montserrat } from '@next/font/google';
import './globals.css';
import Navbar from './NavBar';

const montserrat = Montserrat();

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <head>
        <title>Next.js</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#F8F8F8" />
      </head>
      <body className="md:pl-[300px] md:pt-0 pt-[100px]  pb-[140px] min-h-screen bg-[#f8f8f8]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
