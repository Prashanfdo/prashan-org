import HomeIntroStyles from './HomeIntro.module.css';
import { GitHub, Linkedin, Mail, MessageCircle, Phone, Twitter } from 'react-feather';
import type { Icon } from 'react-feather';

function HomeIntro() {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="avatar flex-none w-[300px] md:mr-16">
        <div
          className={`w-[300px]  h-[300px] bg-cover bg-center grayscale-[90%] transition-all duration-200 hover:grayscale-[50%] ${HomeIntroStyles.animated_bubble}`}
          style={{
            backgroundImage: 'url(assets/images/prashan.jpg)',
          }}
        ></div>
      </div>
      <div>
        <h3 className="font-display text-5xl md:text-6xl text-center md:text-left font-semibold leading-[1.05em] mb-8 mt-8 md:mt-2">
          Prashan <br /> <span className="font-normal">Fernando</span>
        </h3>
        <p className="text-lg text-slate-500 mb-6">
          Fullstack Developer with {new Date().getFullYear() - 2010}+ years of experience, Certified Azure Architect with a
          passion for software development.
        </p>

        <SocialLinks />
      </div>
    </div>
  );
}

export default HomeIntro;

const links: [Icon, string, string, boolean?][] = [
  [GitHub, 'https://github.com/prashanfdo', 'GitHub'],
  [Linkedin, 'https://www.linkedin.com/in/prashanfdo/', 'Linkedin'],
  [Mail, 'mailto:prashanfdo@gmail.com', 'Email'],
  [Phone, 'tel:+94777301150', 'Phone', true],
  [MessageCircle, 'https://wa.me/94777301150', 'WhatApp', true],
  [Twitter, 'https://twitter.com/@prashanfdo', 'Twitter'],
];

const SocialLinks = () => {
  return (
    <div className="flex justify-center md:justify-start mt-20 md:mt-4">
      {links.map(([Icon, link, tooltip, openInSameTab], i) => (
        <a
          key={i}
          href={link}
          target={openInSameTab ? '_self' : '_blank'}
          rel="noreferrer"
          className="mr-4 text-slate-400 hover:text-slate-700 active:text-slate-700 transition-all duration-200 hover:scale-110 active:scale-110"
          title={tooltip}
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
};
