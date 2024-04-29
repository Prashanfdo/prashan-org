'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Home, Icon, Mail, Tv, User } from 'react-feather';
import { gaEventOnClick } from './_shared/utils/ga';

const navLinks: [Icon, string, string][] = [
  [Home, 'Home', '/'],
  [Book, 'Blog', '/blog'],
  // [Book, 'Work', '/work'],
  // [Book, 'Open Source', '/open-source'],
  [Mail, 'Contact', '/contact'],
];

function Navbar() {
  const pathname = usePathname();
  const path = pathname === '/home' ? '/' : pathname;

  return (
    <nav className="mb-10 space-x-4 font-mono">
      {navLinks.map(([Icon, label, href]) => (
        <Link
          key={href}
          passHref
          href={href}
          className={clsx('inline-block px-1 py-4 opacity-100 hover:underline underline-offset-[6px] active:underline', {
            underline: path === href || (href !== '/' && path?.startsWith(href)),
          })}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
