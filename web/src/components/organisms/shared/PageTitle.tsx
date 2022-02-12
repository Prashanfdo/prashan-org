import Head from 'next/head';

type PageTitleProps = {
  children: React.ReactNode;
};
const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Head>
      <title>{children} | Prashan Fernando</title>
    </Head>
  );
};

export default PageTitle;
