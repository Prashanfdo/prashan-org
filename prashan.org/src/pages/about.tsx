import MainLayout from 'components/layouts/MainLayout';
import Image from 'next/image';
import React from 'react';

function AboutPage() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
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
        <h1 className="font-bold text-2xl mt-1 md:mt-0 text-center md:text-left mb-6 p-0 text-black align-baseline">
          Prashan Fernando & Full Stack Developer
        </h1>
        <p className="mb-4">Hi 👋</p>
        <p className="mb-4">
          I've been solving problems and building apps for nearly 10 years for many clients around the world. I'm a competitive
          overachiever who refuses to give up. I'm extremely honest, strategic, intuitive, committed, resourceful, decisive, and
          forward-thinking.
        </p>
        <p className="mb-4">
          I'm extremely proficient in, the required technologies. As I really love Agile and creating value for you, I do not mind
          if you change your mind a lot and iterate ideas - it's all about getting the RIGHT product out. I am a clean code
          enthusiast for this reason and promise to do my best to deliver extensible and maintainable solutions that keep up with
          business needs and change.
        </p>
        <p className="mb-4">
          I'm open to any interviews, coding challenges, product development, SDLC questions you require to feel comfortable
          getting started with me.
        </p>
        <p className="mb-4">✅ Please reach out, so we can discuss the details.</p>
      </div>
      <div className="flex-none w-4/12">
        <div className="hidden md:block mb-6">
          <Image
            className="grayscale-[90%] rounded-3xl shadow-[0_0_20px_rgb(0,0,0,0.12)] object-cover"
            src="/assets/images/prashan.jpg"
            width={400}
            height={400}
            layout="responsive"
          />
        </div>
        <InfoGrid />
      </div>
    </div>
  );
}

AboutPage.layout = MainLayout;

export default AboutPage;

function InfoGrid() {
  const data = [
    `Experience:${new Date().getFullYear() - 2010}+ years in Software Development`,
    `Designation:Senior Tech Lead`,
    `Work:Wollastra Tech`,
    'Education:MSc. in Enterprise Application Development',
    'Study:Sheffield Hallam University',
    'Location:Colombo, Sri Lanka',
    'Languages:English, Sinhala, Tamil',
  ];

  return (
    <div className="grid grid-cols-[100px_auto] text-sm">
      {data
        .map((i) => i.split(':'))
        .map(([label, value]) => (
          <React.Fragment key={label}>
            <span className="font-bold pb-2">{label}</span>
            <span className="pb-2">{value}</span>
          </React.Fragment>
        ))}
    </div>
  );
}
