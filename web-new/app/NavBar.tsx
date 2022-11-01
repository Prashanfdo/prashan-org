'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Home, Icon, Mail, Tv, User } from 'react-feather';

function Navbar() {
  const navLinks: [Icon, string, string][] = [
    [Home, 'Home', '/'],
    [User, 'About', '/about'],
    [Tv, 'Portfolio', '/portfolio'],
    [Book, 'Blog', '/blog'],
    [Mail, 'Contact', '/contact'],
  ];

  const pathname = usePathname();
  const path = pathname === '/home' ? '/' : pathname;

  return (
    <nav className="fixed z-10 w-full md:w-[300px] md:top-0 left-0 bottom-0 flex flex-col flex-auto justify-center items-center bg-white">
      <div className="flex-auto flex flex-col md:justify-center md:mr-1 font-display w-full">
        <Link passHref href="/" className="fixed md:static top-0 w-full">
          <h6 className="text-3xl text-center py-4 md:text-lg md:mb-8 font-medium tracking-wider">Prashan Fernando</h6>
        </Link>
        <div className="flex md:block justify-around w-full bottom-0 border-0 border-t md:border-t-0 border-t-[#ebebeb] border-solid">
          {navLinks.map(([Icon, label, href]) => (
            <Link
              passHref
              href={href}
              // TODO
              // onMouseDown={gaEventOnClick({
              //   action: 'nav_menu_click',
              //   params: {
              //     menu_name: label,
              //   },
              // })}
              className={clsx(
                'flex-auto border-b-2 border-solid bg-white border-[#ebebeb] py-5 tracking-wide hover:tracking-widest transition-all duration-200 font-medium md:mb-3 text-slate-600 hover:text-slate-900 flex flex-col items-center justify-center group',
                {
                  '!text-slate-900': href === '/' ? path === href : path.startsWith(href),
                },
              )}
            >
              <div className="flex items-center">
                <Icon
                  size={18}
                  className={clsx('transition-all duration-200 mr-2 mb-1 group-hover:scale-125 group-active:!scale-105', {
                    'scale-125': href === '/' ? path === href : path.startsWith(href),
                  })}
                />
                <span className="hidden md:inline ml-3">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <p className="hidden md:block italic py-4 px-4 text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} Prashan Fernando. All rights reserved.
      </p>
    </nav>
  );
}

export default Navbar;
