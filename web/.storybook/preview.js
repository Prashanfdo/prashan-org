import '../src/styles/globals.css';
import './preview.css';
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const customViewports = {
  xs: {
    name: "XS",
    styles: {
      width: "480px",
      height: "600px",
    },
  },
  s: {
    name: "S",
    styles: {
      width: "640px",
      height: "600px",
    },
  },
  m: {
    name: "M",
    styles: {
      width: "960px",
      height: "600px",
    },
  },
  l: {
    name: "L",
    styles: {
      width: "1200px",
      height: "600px",
    },
  },
  xl: {
    name: "XL",
    styles: {
      width: "1400px",
      height: "600px",
    },
  },
  "2xl": {
    name: "2XL",
    styles: {
      width: "2400px",
      height: "600px",
    },
  },
};

export const parameters = {
  viewMode: 'docs',
  viewport: {
    viewports: {
      ...customViewports,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};
