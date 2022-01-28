import SkillPill from 'components/atoms/SkillPill';
import CenteredLayout from 'components/layouts/CenteredLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'react-feather';
import portfolioData from './data';

function PortfolioSinglePage() {
  const router = useRouter();
  if (!router.query.slug) {
    return null;
  }

  const [title, images, skills, description, allSkills] = portfolioData[parseInt(router.query.slug as string) - 1];

  const handleRouteBack = () => router.back();

  return (
    <div className="mt-4 px-6 md:px-10 md:h-full md:-mt-4 md:flex md:flex-col md:justify-center">
      <img
        className="w-full h-80 object-cover rounded overflow-hidden shadow-xl border"
        src={`/assets/images/portfolio/${images.split(',')[0]}`}
        alt="Sunset in the mountains"
      />
      <div>
        <Link passHref href="/portfolio">
          <a
            className="uppercase font-semibold text-slate-400 hover:text-slate-500 active:text-slate-500 text-xs md:text-sm inline-flex gap-1 mt-16 group"
            onClick={handleRouteBack}
          >
            <ArrowLeft
              size={16}
              className="ml-auto group-hover:translate-x-[-2px] ease-in duration-100 flex items-center flex-shrink-0"
            />
            Portfolio
          </a>
        </Link>
      </div>
      <div className="flex justify-between w-full items-center md:flex-row flex-col">
        <h1 className="text-2xl flex-none font-bold font-display">{title}</h1>
      </div>
      <div className="mt-6">
        <p>{description}</p>
      </div>
      <div className="mb-16 md:mb-4 mt-4">
        {allSkills
          ?.split(';')
          .filter((i) => !!i.trim())
          .map((skillRecord) => (
            <>
              <h5 className="text-sm font-semibold mb-2">{skillRecord.split(':')[0]}</h5>
              {skillRecord
                .split(':')[1]
                ?.split(',')
                .map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
            </>
          ))}
      </div>
    </div>
  );
}

PortfolioSinglePage.layout = CenteredLayout;

export default PortfolioSinglePage;
