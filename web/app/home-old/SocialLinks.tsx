'use client';

import Link from 'next/link';
import { GitHub, Icon, Linkedin, Mail, MessageCircle, Phone, Twitter } from 'react-feather';
import { gaEventOnClick } from '../_shared/utils/ga';

const links: [icon: Icon, link: string, label: string, display: string, openInSameTab?: boolean][] = [
  [Mail, 'mailto:prashanfdo@gmail.com', 'Email', 'prashanfdo@gmail.com'],
  [Phone, 'tel:+94777301150', 'Phone', '0094777301150', true],
  [MessageCircle, 'https://wa.me/94777301150', 'WhatsApp', 'wa.me/94777301150', true],
  [Linkedin, 'https://www.linkedin.com/in/prashanfdo/', 'Linkedin', 'www.linkedin.com/in/prashanfdo'],
  [GitHub, 'https://github.com/prashanfdo', 'GitHub', 'github.com/prashanfdo'],
  [Twitter, 'https://twitter.com/@prashanfdo', 'Twitter', '@prashanfdo'],
];

export default function SocialLinks() {
  return (
    <div className="flex justify-center xl:justify-start mt-20 xl:mt-4">
      {links.map(([Icon, link, tooltip, openInSameTab], i) => (
        <Link
          key={i}
          href={link}
          target={openInSameTab ? '_self' : '_blank'}
          rel="noreferrer"
          className="mr-4 text-slate-400 hover:text-slate-700 active:text-slate-700 transition-all duration-200 hover:scale-110 active:scale-110"
          title={tooltip}
          onMouseDown={gaEventOnClick({
            action: 'contact_link_click',
            params: {
              clicked_from_location: 'home_intro',
              link_type: tooltip,
            },
          })}
        >
          <Icon size={24} />
        </Link>
      ))}
    </div>
  );
}
