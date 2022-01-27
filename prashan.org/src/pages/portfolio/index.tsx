import MainLayout from 'components/layouts/MainLayout';
import Image from 'next/image';
import portfolioData from './data';
import Link from 'next/link';
import SkillPill from 'components/atoms/SkillPill';

function PortfolioPage() {
  return (
    <div className="mt-4 md:mt-12 px-4 md:px-10">
      <div className="flex justify-between w-full items-center md:flex-row flex-col">
        <h1 className="text-2xl flex-none font-bold font-display">Creative Portfolio</h1>
        {/* <div className="flex-initial">AllUi/UxWebsiteGraphicCreative</div> */}
      </div>
      <div className="grid grid-cols-2 gap-8 mt-12 mb-16">
        {portfolioData.map(([title, images, skills], index) => (
          <Link passHref href={`/portfolio/${index + 1}`} key={index}>
            <a className="w-full h-full block transition-all hover:scale-110 active:scale-105 duration-200">
              <div className="h-full rounded overflow-hidden shadow-2xl">
                <img
                  className="w-full h-80"
                  src={`/assets/images/portfolio/${images.split(',')[0]}`}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 pt-4 pb-3">
                  <div className="font-bold text-xl mb-2">{title}</div>
                </div>
                <div className="px-6 pt-2 mb-4">
                  {skills?.split(',').map((skill) => (
                    <SkillPill key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

PortfolioPage.layout = MainLayout;

export default PortfolioPage;
