import MainLayout from 'components/layouts/MainLayout';
import type { BlogPost } from 'components/organisms/blog/posts';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import getAllPosts from 'components/organisms/blog/posts';
import { gaEventOnClick } from 'components/utils/ga';
import PageTitle from 'components/organisms/shared/PageTitle';

export type BlogPageProps = {
  posts: BlogPost[];
};
function BlogPage({ posts }: BlogPageProps) {
  return (
    <>
      <PageTitle>Blog</PageTitle>
      <div className="flex justify-between w-full items-center md:flex-row flex-col">
        <h1 className="text-2xl flex-none font-bold font-display">Blog</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pb-16">
        {posts.map((post) => (
          <Link passHref href={`/blog/${post.slug}`} key={post.slug}>
            <a
              onMouseDown={gaEventOnClick({
                action: 'blog_post_click',
                params: {
                  blog_post_slug: post.slug,
                },
              })}
              className="w-full h-full block transition-all hover:scale-105 active:scale-105 duration-200"
            >
              <div className="h-full rounded overflow-hidden shadow-2xl">
                {post.data.image && (
                  <div className="w-full h-52 lg:h-60 relative">
                    <Image objectFit="cover" src={post.data.image} alt={post.data.title} layout="fill" />
                  </div>
                )}
                <div className="px-6 pt-4 pb-3">
                  <div className="font-bold text-xl mb-2">{post.data.title}</div>
                  <div className="font-bold text-xs mb-2 text-slate-400">{format(parseISO(post.data.date), 'MMMM do, uuu')}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

BlogPage.layout = MainLayout;

export default BlogPage;

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
