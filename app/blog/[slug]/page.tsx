import { format, parseISO } from 'date-fns';
import renderToString from 'next-mdx-remote/render-to-string';
import Link from 'next/link';

import type { Metadata, ResolvingMetadata } from 'next';
import postData from '../../../data/blog/posts.json';
import PostContent from './PostContent';

type Post = (typeof postData.data)[0];

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const postIndex = postData.data?.findIndex((post) => post.slug === params.slug);

  if (postIndex < 0) {
    return {
      title: 'Not Found',
      description: 'Not Found',
    };
  }

  const post = postData.data?.[postIndex];

  return {
    title: `${post.data?.title} - Blog | Prashan Fernando`,
    description: post.data?.title,
  };
}

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
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tighter">{post.data.title}</h1>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <span>{format(parseISO(post.data.date), 'MMMM do, uuu')}</span>
        </div>
      </div>
      <PostContent postBody={postContent} />
      <div className="pb-20">
        <div className="flex">
          <div className="flex-1 mr-2">
            <h3 className="mb-1 text-lg">←</h3>
            <ReadMorePost post={prevPost} />
          </div>
          <div className="flex-1 ml-2 [&_h4]:text-right">
            <h3 className="mb-1 text-lg text-right">→</h3>
            <ReadMorePost post={nextPost} />
          </div>
        </div>
      </div>
    </div>
  );
}

type ReadMorePostProps = {
  post: Post;
};
function ReadMorePost({ post }: ReadMorePostProps) {
  if (!post.data.image) {
    return null;
  }
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <h4 className="text-sm group-hover:underline">{post.data.title}</h4>
    </Link>
  );
}
