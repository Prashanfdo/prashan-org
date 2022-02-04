import SkillPill from 'components/atoms/SkillPill';
import MainLayout from 'components/layouts/MainLayout';
import PageSlider from 'components/molecules/shared/PageSlider';
import portfolioData from 'data/portfolio/data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'react-feather';

function PortfolioSinglePage() {
  const router = useRouter();
  if (!router.query.slug) {
    return null;
  }

  const [title, images, , description, allSkills] = portfolioData[parseInt(router.query.slug as string) - 1];

  return (
    <div className="max-w-screen-lg mx-auto pt-8 md:pt-20 pb-24 md:pb-10 lg:px-0 px-8 md:px-12">
      <div className="mt-4 px-6 md:px-10 md:h-full md:-mt-4 md:flex md:flex-col md:justify-center">
        <PageSlider images={images.split(',').map((i) => `/assets/images/portfolio/${i}`)} />
        <div>
          <Link passHref href="/portfolio">
            <a className="uppercase font-semibold text-slate-400 hover:text-slate-500 active:text-slate-500 text-xs md:text-sm inline-flex gap-1 mt-10 mb-3 group">
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
            .map((skillRecord, i) => (
              <>
                <h5 className="text-sm font-semibold mb-2">{skillRecord.split(':')[0]}</h5>
                {skillRecord
                  .split(':')[1]
                  ?.split(',')
                  .map((skill, j) => (
                    <SkillPill key={`${i}_${j}`} skill={skill} />
                  ))}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

PortfolioSinglePage.layout = MainLayout;

export default PortfolioSinglePage;

export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const paths = portfolioData.map((_, i) => ({ params: { slug: (i + 1).toString() } }));
  return { paths, fallback: false };
}
