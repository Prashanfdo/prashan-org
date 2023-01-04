/* eslint-disable @next/next/no-img-element */
// import type { BlogPost } from 'components/organisms/blog/posts';
// import PageTitle from 'components/organisms/shared/PageTitle';
import { format, parseISO } from 'date-fns';
// import hydrate from 'next-mdx-remote/hydrate';
// import renderToString from 'next-mdx-remote/render-to-string';
import Image from 'next/image';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';

import postData from '../../../data/blog/posts.json';
import PostContent from './PostContent';

type PageProps = {
  params: { slug: string };
};
export default async function Page({ params }: PageProps) {
  const postIndex = postData.data?.findIndex((post) => post.slug === params.slug);

  if (postIndex < 0) {
    return <div>Not Found</div>;
  }

  const post = postData.data?.[postIndex];
  const postContent = (await renderToString(post.content)) as unknown as string;
  const nextPost = postIndex === postData.data.length - 1 ? postData.data?.[0] : postData.data?.[postIndex + 1];
  const prevPost = postIndex === 0 ? postData.data?.[postData.data.length - 1] : postData.data?.[postIndex - 1];

  return (
    <div className="justify-center content-around min-h-screen pb-[80px] pt-[100px] px-[min(4vw,_60px)] container m-auto max-w-[1000px]">
      <article className="prose prose-slate prose-sm lg:prose-xl pb-24 prose-code:bg-slate-300 prose-code:font-normal prose-code:rounded prose-code:text-slate-600 prose-code:text-xs prose-code:before:text-white prose-code:after:text-white prose-code:px-1 ">
        <Link href="/blog" className="text-sm font-semibold text-gray-400 mb-4 decoration-0 no-underline">
          {'<'} Blog
        </Link>
        <h1 className="text-2xl font-bold font-display pt-2 pb-1">{post.data.title}</h1>
        <div className="text-sm font-semibold text-gray-400 pt-2 pb-1 mb-4 flex justify-between">
          <span>{format(parseISO(post.data.date), 'MMMM do, uuu')}</span>
          <div>
            {post.data.tags?.map?.((tag) => (
              <Link key={tag} href={`/blog/tag/${tag}`} className="bg-slate-200 rounded mx-1 px-2 text-slate-800 no-underline">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        {post.data.image && (
          <img
            src={post.data.image}
            alt={post.data.title}
            className="w-full rounded overflow-hidden shadow-xl border relative mt-2 mb-1"
          />
        )}
        <PostContent postBody={postContent} />
      </article>
      <div className="pb-20">
        <div className="flex">
          <div className="flex-1 mr-8">
            <h3 className="font-bold text-lg mb-5">Previous</h3>
            <ReadMorePost post={prevPost} />
          </div>
          <div className="flex-1 ml-8">
            <h3 className="font-bold text-lg text-right mb-5">Next</h3>
            <ReadMorePost post={nextPost} />
          </div>
        </div>
      </div>
    </div>
  );
}

type ReadMorePostProps = {
  post: any;
};
const ReadMorePost: React.FC<ReadMorePostProps> = ({ post }: ReadMorePostProps) => {
  if (!post.data.image) {
    return null;
  }
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="relative h-56">
        <Image src={post.data.image} alt={post.data.title} layout="fill" objectFit="cover" />
      </div>
      <h4 className="font-semibold text-lg group-hover:underline">{post.data.title}</h4>
    </Link>
  );
};
