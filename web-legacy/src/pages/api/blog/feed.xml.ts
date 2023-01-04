import getAllPosts from 'components/organisms/blog/posts';
import type { NextApiRequest, NextApiResponse } from 'next';
import xml from 'xml';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).end(`<?xml version="1.0" encoding="UTF-8"?>${xml(getFeedXml())}`);
};

function getFeedXml() {
  const posts = getAllPosts().map((post) => {
    return {
      item: [
        {
          title: post.data.title,
        },
        {
          pubDate: new Date(post.data.date as string).toUTCString(),
        },
        {
          guid: [{ _attr: { isPermaLink: true } }, `https://www.prashan.org/blog/${post.slug}/`],
        },
        {
          link: [`https://www.prashan.org/blog/${post.slug}/`],
        },
      ],
    };
  });
  const feedObject = {
    rss: [
      {
        _attr: {
          version: '2.0',
          'xmlns:atom': 'http://www.w3.org/2005/Atom',
        },
      },
      {
        channel: [
          {
            'atom:link': {
              _attr: {
                href: 'https://www.prashan.org/blog/feed.xml',
                rel: 'self',
                type: 'application/rss+xml',
              },
            },
          },
          {
            title: 'Prashan Fernando',
          },
          {
            link: 'https://www.prashan.org/blog',
          },
          {
            description: `Fullstack Developer with ${
              new Date().getFullYear() - 2010
            }+ years of experience, Certified Azure Architect with a passion for software development.`,
          },
          { language: 'en-US' },
          ...posts,
        ],
      },
    ],
  };
  return feedObject;
}
