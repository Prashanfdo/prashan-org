import HomeStyles from './home.module.css';

import SocialLinks from './SocialLinks';

export default function Page() {
  return (
    <div className="flex flex-col px-[8vw] justify-center items-center xl:grid  xl:gap-3 xl:align-middle xl:content-around min-h-screen pb-[80px] pt-[68px] sm:pt-[98px] md:pt-[68px]  xl:grid-cols-2 grid-rows-2 xl:grid-flow-row">
      <div
        className={`w-[45vw] h-[45vw] md:w-[clamp(100px,_35vw,_330px)] md:h-[clamp(100px,_35vw,_330px)] xl:row-span-2 xl:justify-self-center bg-cover bg-center grayscale-[90%] transition-all duration-200 hover:grayscale-[50%] ${HomeStyles.animated_bubble}`}
        style={{
          backgroundImage: 'url(/assets/images/prashan.jpg)',
        }}
      />
      <h3 className="pt-[4vh] pb-[4vh] xl:col-span-1 xl:self-end font-display text-[10vw] md:text-[7vw] lg:text-6xl text-center md:text-left font-semibold leading-[1.05em]">
        Prashan <br /> <span className="font-light">Fernando</span>
      </h3>

      <div className="xl:col-span-1 xl:self-start">
        <p className="text-base xl:text-lg text-slate-500 mb-6 text-center xl:text-left">
          Fullstack Developer with {new Date().getFullYear() - 2010}+ years of experience, Certified Azure Architect with a
          passion for software development.
        </p>
        <SocialLinks />
      </div>
    </div>
  );
}
