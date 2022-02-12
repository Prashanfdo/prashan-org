import { useGAPageTrack } from 'components/utils/ga';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useGAPageTrack();

  const Layout = (Component as any).layout || (({ children }: { children: React.FC }) => children);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Prashan Fernando</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
