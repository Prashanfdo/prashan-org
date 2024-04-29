import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col px-[8vw] justify-center md:items-center xl:flex  xl:gap-3 xl:align-middle xl:content-around min-h-screen pb-[80px] pt-[68px] sm:pt-[98px] md:pt-[68px]  xl:grid-cols-2 grid-rows-2 xl:grid-flow-row max-w-[1300px] xl:mx-auto text-left">
      <h1 className="font-bold text-2xl mt-4 md:mt-0 text-center mb-6 p-0 text-black align-baseline col-span-2">About</h1>
      {/* <div className="h-60 relative w-full">
        <Image src="/assets/images/about/1.jpg" alt="Prashan Fernando About" fill className="object-scale-down" />
      </div> */}
      <div className="pt-[4vw] md:pt-[0]">
        <p className="pt-[2vw]">Hi,</p>
        <p className="pt-[2vw]">I&#39;m Prashan.</p>
        <p className="pt-[2vw]">
          I&#39;m a fullstack Developer with {new Date().getFullYear() - 2010}+ years of experience of designing, developing and
          deploying scalable and highly available secure applications, Certified Azure Architect with a passion for software
          development.
          <span className="font-medium"> Expert in React, Node, .Net and Azure Cloud related tech</span>.
        </p>
        <p className="pt-[2vw]">Currently working as a Associate Software Architect in John Morris Group, Sri Lanka.</p>
        <p className="pt-[2vw]">
          Completed my masters in{' '}
          <span className="font-medium">Sheffield Hallam University, England on MSc in Enterprise Application Development</span>.
          And completed my bachelors in Sri Lanka Institute of Technology(SLIIT) on BSc in IT(Hons)
        </p>
        <p className="pt-[2vw]">
          I love checking on Rockets, Cosmos, Tech and Geo Politics on my leisure. And Go{' '}
          <Link href="https://www.youtube.com/watch?v=MBRqu0YOH14" target={'_blank'} className="underline-offset-2 underline">
            Optimistic Nihilism
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function InfoGrid() {
  const data = [
    `Experience:${new Date().getFullYear() - 2010}+ years in Software Development`,
    'Designation:Associate Software Architect',
    'Work:John Morris Group',
    'Education:MSc. in Enterprise Application Development',
    'Study:Sheffield Hallam University',
    'Location:Colombo, Sri Lanka',
  ];

  return (
    <div className="mt-10 md:mt-10">
      {data
        .map((i) => i.split(':'))
        .map(([label, value]) => (
          <div
            className="flex mb-4 items-start md:items-center text-slate-400 hover:text-slate-900 transition-all duration-200 "
            key={label}
          >
            <span className="text-sm md:text-base w-32 inline-block">{label}</span>
            <span className="text-base md:text-lg">{value}</span>
          </div>
        ))}
    </div>
  );
}
