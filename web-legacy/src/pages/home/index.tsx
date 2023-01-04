import CenteredLayout from 'components/layouts/CenteredLayout';
import HomeIntro from 'components/molecules/home/HomeIntro';

export function HomePage() {
  return <HomeIntro />;
}

HomePage.layout = CenteredLayout;

export default HomePage;
