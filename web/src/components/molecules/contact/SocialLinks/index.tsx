import React from 'react';
import { GitHub, Icon, Linkedin, Mail, MessageCircle, Phone, Twitter } from 'react-feather';

const links: [icon: Icon, link: string, label: string, display: string, openInSameTab?: boolean][] = [
  [Mail, 'mailto:prashanfdo@gmail.com', 'Email', 'prashanfdo@gmail.com'],
  [Phone, 'tel:+94777301150', 'Phone', '0094777301150', true],
  [MessageCircle, 'https://wa.me/94777301150', 'WhatsApp', 'wa.me/94777301150', true],
  [Linkedin, 'https://www.linkedin.com/in/prashanfdo/', 'Linkedin', 'www.linkedin.com/in/prashanfdo'],
  [GitHub, 'https://github.com/prashanfdo', 'GitHub', 'github.com/prashanfdo'],
  [Twitter, 'https://twitter.com/@prashanfdo', 'Twitter', '@prashanfdo'],
];

const SocialLinks = () => {
  return (
    <div className="mt-10">
      {links.map(([Icon, link, label, display, openInSameTab], i) => (
        <div className="flex mb-4 items-center text-slate-400 hover:text-slate-900 transition-all duration-200 " key={i}>
          <Icon size={30} className="mr-3" />
          <strong className="text-sm md:text-base w-24 inline-block">{label}</strong>
          <div>
            <a key={i} href={link} target={openInSameTab ? '_self' : '_blank'} rel="noreferrer" className="text-base md:text-lg">
              {display}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
