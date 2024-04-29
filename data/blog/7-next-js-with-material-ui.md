---
title: Next.js with Material-UI
slug: next-js-with-material-ui
date: 2020-06-19
image: /assets/images/blog/6.jpg
tags: Next.JS,react,react-hooks
---

Nextjs is very popular server rendering library which so many people use it for their development purposes.

There are also so many ui libraries for server side rendering frameworks and Material UI is one of them.

Material UI offers React components for faster and easier web development. You can create your own design system, or start with Material Design.

You can find many useful information from their websites and components you would like to use it in your project.

[**Material UI library**](https://material-ui.com/)

## How to use Next.js with Material UI

There are some requirements we should do to use material UI in next.js projects.

1- Fixing the resolution order

2- Removing the server side injected CSS

**Resolution order** in our application needs to as

On the server:

1. app.getInitialProps
2. page.getInitialProps
3. document.getInitialProps
4. app.render
5. page.render
6. document.renderOn the server with error:
7. document.getInitialProps
8. app.render
9. page.render
10. document.renderOn the client
11. app.getInitialProps
12. page.getInitialProps
13. app.render
14. page.render

### Why we should use it like that?

Server side rendering frameworks can be a bit tricky sometimes about stylings.

If you having issues like flickering screen after you change your root in next.js you should do these changes in your application.

### How to install and use material UI with next.js

Install material-ui to existing next.js project

yarn

yarn add @material-ui/core

npm

npm install @material-ui/core

If you are using \_document.js file already adapt it yours or create new file.

**\_document.js**

```
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Document, {
  Html, Main, NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
```

If you are using \_app.js file already adapt it yours or create new file.

**\_app.js**

The most important part here is the removing the server side injected CSS.

```
React.useEffect(() => {
  // Remove the server-side injected CSS.
  const jssStyles = **_document_**.querySelector('#jss-server-side');
  if (jssStyles) {
    jssStyles.parentElement.removeChild(jssStyles);
  }
}, []);
```

```
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
```

Your application is ready to go! You can test it and now flickering issues is gone and you can able to use material UI properly on your nextjs applications.
