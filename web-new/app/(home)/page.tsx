import React from 'react';
import HomeStyles from './home.module.css';

export default function Page() {
  return (
    <div className="grid justify-center content-around min-h-[calc(100vh-140px)]">
      <div className="flex flex-col md:flex-row items-center">
        <div className="avatar flex-none w-[240px] lg:w-[300px] md:mr-16">
          <div
            className={`w-[240px] h-[240px] lg:w-[300px] lg:h-[300px] bg-cover bg-center grayscale-[90%] transition-all duration-200 hover:grayscale-[50%] ${HomeStyles.animated_bubble}`}
            style={{
              backgroundImage: 'url(/assets/images/prashan.jpg)',
            }}
          />
        </div>
        <div>
          <h3 className="font-display text-5xl lg:text-6xl text-center md:text-left font-semibold leading-[1.05em] mb-8 mt-8 md:mt-2">
            Prashan <br /> <span className="font-normal">Fernando</span>
          </h3>
          <p className="text-base lg:text-lg text-slate-500 mb-6 text-center md:text-left">
            Fullstack Developer with {new Date().getFullYear() - 2010}+ years of experience, Certified Azure Architect with a
            passion for software development.
          </p>
          {/* <SocialLinks /> */}
        </div>
      </div>
    </div>
  );
}
