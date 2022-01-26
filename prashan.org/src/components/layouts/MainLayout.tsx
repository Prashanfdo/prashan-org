import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Home, Icon, Mail, Tv, User } from 'react-feather';

function MainLayout({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const navLinks: [Icon, string, string][] = [
    [Home, 'Home', '/'],
    [User, 'About', '/about'],
    [Tv, 'Portfolio', '/portfolio'],
    [Mail, 'Contact', '/contact'],
  ];
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div
        className="bg-white flex-none md:w-3/12 flex md:flex-col"
        style={{
          boxShadow: '0 0 30px rgb(62 68 125 / 8%)',
        }}
      >
        <div className="flex-auto flex md:flex-col justify-center items-center">
          <div className="flex-auto flex flex-col md:justify-center md:w-[10ch] md:mr-1 font-display">
            <Link passHref href="/">
              <a>
                <h6 className="text-3xl text-center py-4 md:text-lg md:mb-8 font-medium tracking-wider">Prashan Fernando</h6>
              </a>
            </Link>
            <div className="flex md:block justify-around">
              {navLinks.map(([icon, label, href], i) => (
                <NavLink key={label} icon={icon} label={label} href={href} />
              ))}
            </div>
          </div>
        </div>
        <footer className="flex-none hidden md:block">
          <p className="italic py-4 px-4 text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Prashan Fernando. All rights reserved.
          </p>
        </footer>
      </div>
      <main
        style={{
          borderLeft: '1px solid #ebebeb',
        }}
        className="flex-auto bg-[#f8f8f8]"
      >
        <div className="max-w-screen-lg mx-auto py-8 px-8 h-full">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;

type NavLinkProps = {
  icon: Icon;
  href: string;
  label: string;
};

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, label, href }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <>
      <Link passHref href={href}>
        <a
          className={classnames(
            'md:hidden flex-auto border-b-2 border-solid bg-slate-100 border-[#ebebeb] py-3 tracking-wide hover:tracking-widest transition-all duration-300 font-medium mb-3 text-slate-500 hover:text-slate-800 flex items-center justify-center',
            {
              'text-slate-800': isActive,
            },
          )}
        >
          <Icon
            size={18}
            className={classnames('transition-all duration-300 mr-2 mb-1 hover:scale-110', {
              'scale-125': isActive,
            })}
          />
          <span className="hidden md:inline">{label}</span>
        </a>
      </Link>
      <Link passHref href={href}>
        <a className="hidden md:block py-3 tracking-wide hover:tracking-widest transition-all duration-300 font-medium mb-3 text-slate-500 hover:text-slate-800">
          <div className="flex items-center">
            <Icon size={18} className="mr-3" />
            <span className="hidden md:inline">{label}</span>
          </div>
        </a>
      </Link>
    </>
  );
};
