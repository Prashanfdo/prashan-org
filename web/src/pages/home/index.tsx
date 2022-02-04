import CenteredLayout from 'components/layouts/CenteredLayout';
import HomeIntro from 'components/molecules/home/HomeIntro';

export function HomePage() {
  return (
    <div className="md:-mt-16">
      <HomeIntro />
    </div>
  );
}

HomePage.layout = CenteredLayout;

export default HomePage;
