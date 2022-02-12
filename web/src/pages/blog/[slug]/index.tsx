import MainLayout from 'components/layouts/MainLayout';
import type { BlogPost } from 'components/organisms/blog/posts';
import getAllPosts from 'components/organisms/blog/posts';
import { format, parseISO } from 'date-fns';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import Head from 'next/head';
import image from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import SlugStyles from './Slug.module.css';

export type PortfolioSinglePageProps = {
  post?: BlogPost;
  readMore: { next: BlogPost; prev: BlogPost };
};
const PortfolioSinglePage = ({ post, readMore }: PortfolioSinglePageProps) => {
  if (!post) {
    return <div>Not Found</div>;
  }

  const {
    data: { title, date, image, tags },
    content,
  } = post;
  const hydratedContent = typeof content === 'string' ? content : hydrate(content);

  return (
    <>
      <Head>
        <title>{title} | Blog | Prashan Fernando</title>
      </Head>
      <article className="prose prose-slate prose-sm lg:prose-xl px-6 md:px-10 md:flex md:flex-col md:justify-center pb-24 prose-code:bg-slate-300 prose-code:font-normal prose-code:rounded prose-code:text-slate-600 prose-code:text-xs prose-code:before:text-white prose-code:after:text-white prose-code:px-1 ">
        <Link href="/blog" passHref>
          <a className="text-sm font-semibold text-gray-400 mb-4 decoration-0">Blog</a>
        </Link>
        <div className="flex justify-between w-full items-center md:flex-row flex-col mb-0">
          <h1 className="text-2xl flex-none font-bold font-display w-full">{title}</h1>
        </div>
        <div className="text-sm font-semibold text-gray-400 mb-4 flex justify-between">
          <span>{format(parseISO(date), 'MMMM do, uuu')}</span>
          <div>
            {tags?.map?.((tag) => (
              <span key={tag} className="bg-slate-200 rounded mx-1 px-2 text-slate-800">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        {image && (
          <div className="w-full object-cover rounded overflow-hidden shadow-xl border relative h-96">
            <Image src={image} alt={image} layout="fill" objectFit="cover" />
          </div>
        )}
        <div className={`mt-6 ${SlugStyles.blogPostOverride}`}>{hydratedContent}</div>
      </article>
      <div className="pb-20">
        <div className="flex">
          <div className="flex-1 mr-8">
            <h3 className="font-bold text-lg mb-5">Previous</h3>
            <ReadMorePost post={readMore.prev} />
          </div>
          <div className="flex-1 ml-8">
            <h3 className="font-bold text-lg text-right mb-5">Next</h3>
            <ReadMorePost post={readMore.next} />
          </div>
        </div>
      </div>
    </>
  );
};

PortfolioSinglePage.layout = MainLayout;

export default PortfolioSinglePage;

export async function getStaticProps(context: { params: Pick<BlogPost, 'slug'> }) {
  const { params } = context;

  const allPosts = getAllPosts();

  const postIndex = allPosts.findIndex((i) => i.slug === params.slug);
  const post = allPosts[postIndex];
  post.content = (await renderToString(post.content)) as unknown as string;
  const nextPostIndex = postIndex + 1;
  const prevPostIndex = postIndex - 1;
  const readMore = {
    next: {
      ...allPosts[nextPostIndex >= allPosts.length ? 0 : nextPostIndex],
      content: null,
    },
    prev: {
      ...allPosts[prevPostIndex < 0 ? allPosts.length - 1 : prevPostIndex],
      content: null,
    },
  };
  return {
    props: {
      post,
      readMore,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = getAllPosts();

  const paths = allPosts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

type ReadMorePostProps = {
  post: BlogPost;
};
const ReadMorePost: React.FC<ReadMorePostProps> = ({ post }: ReadMorePostProps) => {
  if (!post.data.image) {
    return null;
  }
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <a className="block group">
        <div className="relative h-80">
          <Image src={post.data.image} alt={post.data.title} layout="fill" objectFit="cover" />
        </div>
        <h4 className="font-semibold text-lg group-hover:underline">{post.data.title}</h4>
      </a>
    </Link>
  );
};
