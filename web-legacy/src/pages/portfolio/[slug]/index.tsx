import SkillPill from 'components/atoms/SkillPill';
import MainLayout from 'components/layouts/MainLayout';
import PageSlider from 'components/molecules/shared/PageSlider';
import PageTitle from 'components/organisms/shared/PageTitle';
import portfolioData from 'data/portfolio/data';
import { useRouter } from 'next/router';

function PortfolioSinglePage() {
  const router = useRouter();
  if (!router.query.slug) {
    return <div>Not Found</div>;
  }

  const [title, images, , description, allSkills] = portfolioData[parseInt(router.query.slug as string) - 1];

  return (
    <>
      <PageTitle>{title} | Portfolio</PageTitle>
      <div className="px-6 md:px-10 md:flex md:flex-col md:justify-center pb-10">
        <div className="flex justify-between w-full items-center md:flex-row flex-col mb-8">
          <h1 className="text-2xl flex-none font-bold font-display">{title}</h1>
        </div>
        <PageSlider images={images.split(',').map((i) => `/assets/images/portfolio/${i}`)} />
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
    </>
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
