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
      </head>
      <body className="md:pl-[300px] md:pt-0 pt-[100px]  pb-[140px] min-h-screen bg-[#f8f8f8]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
