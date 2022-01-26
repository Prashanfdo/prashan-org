import Image from 'next/image';
import MainLayout from 'components/layouts/MainLayout';
import HomeIntro from 'components/molecules/home/HomeIntro';

function HomePage() {
  return (
    <div className="flex items-center justify-center md:h-full">
      <HomeIntro />
    </div>
  );
}

HomePage.layout = MainLayout;

export default HomePage;
