export default function Page() {
  return (
    <div className="grid justify-center content-around min-h-screen pb-[140px]">
      <div className="flex flex-col md:flex-row items-center md:items-start px-8 md:px-0">
        <div className="flex-auto">
          <h1 className="font-bold text-2xl mt-4 md:mt-0 text-center md:text-left mb-6 p-0 text-black align-baseline">
            Prashan Fernando & Full Stack Developer
          </h1>
          <InfoGrid />
        </div>
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
