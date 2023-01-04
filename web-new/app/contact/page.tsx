import { GitHub, Icon, Linkedin, Mail, MessageCircle, Phone, Twitter } from 'react-feather';

export default function Page() {
  return (
    <div className="grid justify-center content-around min-h-screen pb-[140px]">
      <div className="flex flex-col md:flex-row items-center md:items-start px-8 md:px-0">
        <div className="flex-auto grow-0">
          <h1 className="font-bold text-2xl mt-4 md:mt-0 text-center md:text-left mb-6 p-0 text-black align-baseline">
            Say Hello
          </h1>
          <div className="md:text-left text-center">If you&apos;d like to say &quot;hello&quot;, feel free to get in touch.</div>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

const links: [icon: Icon, link: string, label: string, display: string, openInSameTab?: boolean][] = [
  [Mail, 'mailto:prashanfdo@gmail.com', 'Email', 'prashanfdo@gmail.com'],
  [Phone, 'tel:+94777301150', 'Phone', '0094777301150', true],
  [MessageCircle, 'https://wa.me/94777301150', 'WhatsApp', 'wa.me/94777301150', true],
  [Linkedin, 'https://www.linkedin.com/in/prashanfdo/', 'Linkedin', 'www.linkedin.com/in/prashanfdo'],
  [GitHub, 'https://github.com/prashanfdo', 'GitHub', 'github.com/prashanfdo'],
  [Twitter, 'https://twitter.com/@prashanfdo', 'Twitter', '@prashanfdo'],
];

function SocialLinks() {
  return (
    <div className="mt-10">
      {links.map(([IconEl, link, label, display, openInSameTab], i) => (
        <div className="flex mb-4 items-center text-slate-400 hover:text-slate-900 transition-all duration-200 " key={i}>
          <IconEl size={30} className="mr-3" />
          <strong className="text-sm md:text-base w-24 inline-block">{label}</strong>
          <div>
            <a key={i} href={link} target={openInSameTab ? '_self' : '_blank'} rel="noreferrer" className="text-base md:text-lg">
              {display}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
