---
title: Add Tailwind CSS to Next.js
date: 2021-09-05
image: /assets/images/blog/9.jpg
tags: react
---

Tailwind CSS is a utility-fast CSS framework for building custom UI in a faster & easier way. Tailwind CSS is highly customizable low-level CSS framework.

## Steps to add Tailwind CSS to a Next.js application.

## 1. Install Tailwind dependencies.

if using `yarn`

```
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

if using `npm`

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

## 2. Create the configuration files

if using `yarn`

```
yarn tailwindcss init -p
```

if using `npx`

```
npx tailwindcss init -p
```

Now, this command will create a minimal `tailwind.config.js` file at the root directory.

```
// tailwind.config.js
module.exports = {
 purge: [],
 darkMode: false, // or 'media' or 'class'
 theme: {
 extend: {},
 },
 variants: {
 extend: {},
 },
 plugins: [],
}
```

That also creates a `postcss.config.js` file -

```
module.exports = {
 plugins: {
 tailwindcss: {},
 autoprefixer: {},
 },
}
```

## 3. Configure the Tailwind

In `tailwind.config.js` file, configure the `purge` option with the paths to all the pages & components so Tailwind can tree-shake unused styles in production builds.

```
purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}']
```

Again if you want to use `dark mode`, change the option -

```
darkmode: 'class';
```

## 4. Include Tailwind in CSS

open the `./styles/global.css` file and the following lines of code -

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 5. Add Tailwind CSS IntelliSense to VS Code

For the autocomplete features for Tailwind CSS classes in VS Code, Install the plugin — [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
