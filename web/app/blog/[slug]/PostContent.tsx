'use client';
import hydrate from 'next-mdx-remote/hydrate';

export default function PostContent({ postBody }) {
  const hydratedContent = typeof postBody === 'string' ? postBody : hydrate(postBody);
  return (
    <article className="pb-12 prose-base prose-slate prose-code:bg-slate-300 prose-code:font-normal prose-code:rounded prose-code:text-slate-600 prose-code:text-xs prose-code:before:text-white prose-code:after:text-white prose-code:px-1 ">
      <div className={`[&_pre>code]:bg-transparent  [&_pre]:bg-gray-700 [&_pre>code]:text-[#e1e1e1]`}>{hydratedContent}</div>
    </article>
  );
}
