import MainLayout from 'components/layouts/MainLayout';
import type { BlogPost } from 'components/organisms/blog/posts';
import getAllPosts from 'components/organisms/blog/posts';
import { format, parseISO } from 'date-fns';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export type PortfolioSinglePageProps = {
  post?: BlogPost;
};
function PortfolioSinglePage({ post }: PortfolioSinglePageProps) {
  if (!post) {
    return <div>Not Found</div>;
  }

  const {
    data: { title, date, image },
    content,
  } = post;
  const hydratedContent = typeof content === 'string' ? content : hydrate(content);

  return (
    <>
      <Head>
        <title>{title} | Blog | Prashan Fernando</title>
      </Head>
      <article className="prose lg:prose-xl px-6 md:px-10 md:flex md:flex-col md:justify-center pb-24">
        <Link href="/blog" passHref>
          <a className="text-sm font-semibold text-gray-400 mb-4 decoration-0">Blog</a>
        </Link>
        <div className="flex justify-between w-full items-center md:flex-row flex-col mb-0">
          <h1 className="text-2xl flex-none font-bold font-display">{title}</h1>
        </div>
        <div className="text-sm font-semibold text-gray-400 mb-4">· {format(parseISO(date), 'MMMM do, uuu')}</div>
        <div className="w-full object-cover rounded overflow-hidden shadow-xl border relative h-96">
          <Image src={image} alt={image} layout="fill" objectFit="cover" />
        </div>
        <div className="mt-6">{hydratedContent}</div>
      </article>
    </>
  );
}

PortfolioSinglePage.layout = MainLayout;

export default PortfolioSinglePage;

export async function getStaticProps(context: { params: Pick<BlogPost, 'slug'> }) {
  const { params } = context;

  const allPosts = getAllPosts();

  const post = allPosts.find((i) => i.slug === params.slug);
  if (post) {
    post.content = (await renderToString(post.content)) as unknown as string;
  }

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = getAllPosts();

  const paths = allPosts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}
