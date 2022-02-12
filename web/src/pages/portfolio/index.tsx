import MainLayout from 'components/layouts/MainLayout';
import portfolioData from 'data/portfolio/data';
import Link from 'next/link';
import Image from 'next/image';

function PortfolioPage() {
  return (
    <>
      <div className="flex justify-between w-full items-center md:flex-row flex-col">
        <h1 className="text-2xl flex-none font-bold font-display">Portfolio</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:pb-16 pb-32">
        {portfolioData.reverse().map(([title, images], index) => (
          <Link passHref href={`/portfolio/${index + 1}`} key={title}>
            <a className="w-full h-full block transition-all hover:scale-110 active:scale-105 duration-200">
              <div className="h-full rounded overflow-hidden shadow-2xl">
                <div className="w-full h-52 lg:h-60 relative">
                  <Image objectFit="cover" src={`/assets/images/portfolio/${images.split(',')[0]}`} alt={title} layout="fill" />
                </div>
                <div className="px-6 pt-4 pb-3">
                  <div className="font-bold text-xl mb-2">{title}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

PortfolioPage.layout = MainLayout;

export default PortfolioPage;
