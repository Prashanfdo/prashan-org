'use client';
import hydrate from 'next-mdx-remote/hydrate';
import SlugStyles from './Slug.module.css';

export default function PostContent({ postBody }) {
  const hydratedContent = typeof postBody === 'string' ? postBody : hydrate(postBody);
  return <div className={`mt-6 ${SlugStyles.blogPostOverride}`}>{hydratedContent}</div>;
}
