'use client';
import Link from 'next/link';

// import { useRouter } from 'next/router';

type Post = {
  data: {
    draft: boolean;
    image: string;
    title: string;
    tags: string[];
    date: string;
  };
  slug: string;
};

type PostGridProps = {
  posts: Post[];
};
export default function PostGrid({ posts }: PostGridProps) {
  // const posts = ['1'];
  // const router = useRouter();
  // const navigateToPost = (href) => () => router.push(href);
  // console.log(posts);
  if (!posts) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pb-16">
      {posts?.map((post, index) => (
        <Link
          href={post.slug}
          key={index}
          className="w-full h-full block transition-all hover:scale-105 active:scale-105 duration-200"
          // TODO
          // onMouseDown={gaEventOnClick({
          //   action: 'blog_post_click',
          //   params: {
          //     blog_post_slug: post.slug,
          //   },
          // })}
          // onClick={navigateToPost(post.slug)}
        >
          <div key={post.slug} className="h-full rounded overflow-hidden shadow-2xl">
            {/* {post.data.image && (
          <div className="w-full h-52 lg:h-60 relative">
            <Image src={post.data.image} alt={post.data.title} width={200} height={200} />
          </div>
        )} */}
            {/* <div className="px-6 pt-4 pb-3">
          <div className="font-bold text-xl mb-2">{post.data.title}</div>
          <div className="font-bold text-xs mb-2 text-slate-400">{format(parseISO(post.data.date), 'MMMM do, uuu')}</div>
        </div> */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi similique porro
          </div>
        </Link>
      ))}
    </div>
  );
}
