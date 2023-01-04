import { ComponentMeta } from '@storybook/react';
import React from 'react';
import Page from 'pages/blog';
import type { BlogPageProps } from 'pages/blog';

const Layout = Page.layout;

export default {
  title: 'Pages/Blog',
  component: Page,
  argTypes: {},
  parameters: {
    viewMode: 'story',
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    nextRouter: {
      path: '/blog/[slug]',
      asPath: '/blog/1',
    },
  },
} as ComponentMeta<typeof Page>;

export function Default(args: BlogPageProps) {
  return (
    <div id="__next">
      <Layout>
        <Page {...args} />
      </Layout>
    </div>
  );
}

Default.args = {
  posts: Array(12)
    .fill({})
    .map((_, index) => ({
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, qui? Dolorum architecto cupiditate velit quam nesciunt ad possimus nemo ut, quasi hic excepturi expedita, sed ullam iure numquam alias itaque?',
      slug: `blog-post-${index + 1}`,
      data: {
        title: `Blog Post ${index + 1}`,
        date: '2020-01-01',
        image: `https:////source.unsplash.com/collection/${index + 1}`,
        draft: false,
      },
    })),
};
