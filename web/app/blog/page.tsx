import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import postData from '../../data/blog/posts.json';

export default async function Page() {
  return (
    <div className="grid justify-center content-around min-h-screen pb-[80px] pt-[100px] px-[8vw] container">
      <div className="flex justify-between w-full items-center md:flex-row flex-col">
        <h1 className="text-2xl flex-none font-bold font-display">Blog</h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mt-12 pb-16">
        {postData.data?.map((post, index) => (
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
