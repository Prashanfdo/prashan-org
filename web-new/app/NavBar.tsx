'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Home, Icon, Mail, Tv, User } from 'react-feather';
import { gaEventOnClick } from './_shared/utils/ga';

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
    <nav
      className="fixed z-10 w-full md:w-[230px] lg:w-[300px] md:top-0 left-0 bottom-0 flex flex-col flex-auto justify-center items-center bg-white border-0 md:border-r border-r-[#ebebeb] border-solid"
      style={{
        boxShadow: '0 0 30px rgb(62 68 125 / 8%)',
      }}
    >
      <div className="flex-auto flex flex-col md:justify-center md:mr-1 font-display w-full">
        <Link passHref href="/" className="fixed md:static top-0 w-full bg-white ">
          <h6 className="text-3xl text-center py-4 md:text-lg md:mb-8 font-medium tracking-wider">Prashan Fernando</h6>
        </Link>
        <div className="flex md:block justify-around w-full bottom-0 border-0 border-t md:border-t-0 border-t-[#ebebeb] border-solid">
          {navLinks.map(([Icon, label, href]) => (
            <Link
              key={label}
              href={href}
              onMouseDown={gaEventOnClick({
                action: 'nav_menu_click',
                params: {
                  menu_name: label,
                },
              })}
              className={clsx(
                'flex-auto border-b-2 md:border-b-0 border-solid bg-white border-[#ebebeb] py-5 tracking-wide hover:tracking-widest transition-all duration-200 font-medium md:mb-3 text-slate-400 hover:text-slate-900 flex flex-col items-center justify-center group',
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
                <span className="hidden md:inline ml-3 w-28">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <p className="hidden md:block italic py-4 px-4 text-slate-500 text-xs text-center">
        &copy; {new Date().getFullYear()} Prashan Fernando. All rights reserved.
      </p>
    </nav>
  );
}

export default Navbar;
