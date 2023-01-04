import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import postData from '../../../../data/blog/posts.json';

type PageProps = {
  params: { tag: string };
};
export default async function Page({ params }: PageProps) {
  const posts = postData.data?.filter((post) => post.data.tags.includes(params.tag));
  console.log(
    params.tag,
    postData.data?.map((post) => post.data.tags),
  );
  return (
    <div className="grid justify-center content-around min-h-screen pb-[80px] pt-[100px] px-[8vw] container">
      <div className="justify-between w-full items-center flex-col">
        <Link href="/blog" className="text-sm font-semibold text-gray-400 mb-4 decoration-0 no-underline">
          {'<'} Blog
        </Link>
        <h1 className="text-2xl flex-none font-bold font-display">Tag: {params.tag}</h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-12 pb-16">
        {posts?.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            key={index}
            className="w-full h-full block transition-all hover:scale-[1.02] active:scale-[1.02] duration-200"
          >
            <div key={post.slug} className="h-full rounded overflow-hidden shadow-2xl">
              {post.data.image && (
                <div className="w-full h-52 lg:h-60 relative">
                  <Image
                    fill
                    src={post.data.image}
                    alt={post.data.title}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </div>
              )}
              <div className="px-6 pt-4 pb-3">
                <div className="font-bold text-xl mb-2">{post.data.title}</div>
                <div className="font-bold text-xs mb-2 text-slate-400">{format(parseISO(post.data.date), 'MMMM do, uuu')}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
