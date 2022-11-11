import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import postData from '../../data/blog/posts.json';
import PostGrid from './PostGrid';

export default async function Page() {
  return (
    <div className="grid justify-center content-around min-h-[100vh] pb-[140px] container">
      <div className="flex justify-between w-full items-center md:flex-row flex-col">
        <h1 className="text-2xl flex-none font-bold font-display">Blog</h1>
      </div>
      <PostGrid posts={postData.data} />
    </div>
  );
}
