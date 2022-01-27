import Image from 'next/image';
import MainLayout from 'components/layouts/MainLayout';
import HomeIntro from 'components/molecules/home/HomeIntro';

function AboutPage() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="md:hidden w-5/12 text-center">
        <Image
          className="grayscale-[90%] rounded-3xl shadow-[0_0_20px_rgb(0,0,0,0.12)] object-cover"
          src="/assets/images/prashan.jpg"
          width={200}
          height={200}
          layout="responsive"
        />
      </div>
      <div className="flex-auto">
        <h1 className="font-bold text-2xl mt-4 md:mt-0 text-center md:text-left mb-6 p-0 text-black align-baseline">
          Prashan Fernando & Full Stack Developer
        </h1>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem molestiae voluptate dolores, sint ullam itaque assumenda
        doloremque corporis. Natus atque veniam maxime iure dolorem optio amet quas sunt et. In!
      </div>
      <div className="flex-none w-4/12">
        <div className="hidden md:block">
          <Image
            className="grayscale-[90%] rounded-3xl shadow-[0_0_20px_rgb(0,0,0,0.12)] object-cover"
            src="/assets/images/prashan.jpg"
            width={400}
            height={400}
            layout="responsive"
          />
        </div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veniam explicabo harum molestiae similique
        consequuntur tenetur eveniet, nam cumque aliquid eos tempore ex, ipsum dolores mollitia repellendus vero eum fugiat!
      </div>
    </div>
  );
}

AboutPage.layout = MainLayout;

export default AboutPage;
