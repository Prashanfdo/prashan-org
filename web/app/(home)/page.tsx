import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import postData from '../../data/blog/posts.json';

type PageProps = {};
export default function Page({}: PageProps) {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-medium tracking-tighter">hey, I&apos;m Prashan Fernando 👋</h1>
      <p>
        I&apos;m a full stack developer based in London, UK. I build web applications using modern technologies like React, .Net,
        and Node.js. I currently work at VaultData, a Birmingham AI/Machine Learning Startup, where I help build and maintain the
        company&apos;s core product.
      </p>

      <h2 className="my-6 text-lg font-medium tracking-normal">Latest Blog Posts ✍️</h2>
      <div className="my-4 space-y-4">
        {postData.data?.slice(0, 3).map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index} className="block w-full h-full">
            <h3 className="font-medium tracking-normal">{post.data.title}</h3>
            <div>
              <span className="text-xs font-bold text-slate-400">{format(parseISO(post.data.date), 'MMMM do, uuu')}</span>
            </div>
          </Link>
        ))}
        <Link href={`/blog`} className="block w-full h-full text-sm">
          See all blog posts →
        </Link>
      </div>
    </div>
  );
}
