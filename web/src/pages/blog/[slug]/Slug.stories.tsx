import React from 'react';
import type { PortfolioSinglePageProps } from '.';
import Page from '.';

const Layout = Page.layout;

export default {
  title: 'Pages/Blog/Slug',
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
      query: {
        slug: '1',
      },
    },
  },
} as any;

export function Default(args: PortfolioSinglePageProps) {
  return (
    <div id="__next">
      <Layout>
        <Page {...args} />
      </Layout>
    </div>
  );
}

Default.args = {
  post: {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, qui? Dolorum architecto cupiditate velit quam nesciunt ad possimus nemo ut, quasi hic excepturi expedita, sed ullam iure numquam alias itaque?',
    slug: `blog-post-1`,
    data: {
      title: `Blog Post 1`,
      date: '2020-01-01',
      image: `https:////source.unsplash.com/collection/1`,
      draft: false,
    },
  },
};
