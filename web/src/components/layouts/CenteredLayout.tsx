import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Home, Icon, Mail, Tv, User } from 'react-feather';
import MainLayout from './MainLayout';

function CenteredLayout({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  return (
    <MainLayout>
      <div className="max-w-screen-lg mx-auto md:flex md:flex-col md:h-full justify-center md:pt-20 pb-20 md:pb-0">
        {children}
      </div>
    </MainLayout>
  );
}

export default CenteredLayout;

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
            'md:hidden flex-auto border-b-2 border-solid bg-white border-[#ebebeb] py-5 tracking-wide hover:tracking-widest transition-all duration-200 font-medium md:mb-3 text-slate-600 hover:text-slate-900 flex flex-col items-center justify-center group',
            {
              'text-slate-900': isActive,
            },
          )}
        >
          <Icon
            size={18}
            className={classnames('transition-all duration-200 mr-2 mb-1 group-hover:scale-125 group-active:!scale-105', {
              'scale-125': isActive,
            })}
          />
        </a>
      </Link>
      <Link passHref href={href}>
        <a
          className={classnames(
            'hidden md:block py-3 tracking-wide hover:tracking-widest transition-all duration-300 font-medium mb-3 text-slate-500 hover:text-slate-900',
            {
              'text-slate-900': isActive,
            },
          )}
        >
          <div className="flex items-center">
            <Icon size={18} />
            <span className="hidden md:inline ml-3">{label}</span>
          </div>
        </a>
      </Link>
    </>
  );
};
