---
title: Taming React Hook useEffect Infinite Loop Inside
date: 2019-07-24
image: /assets/images/blog/5.jpg
tags: react,react-hooks
---

If you start using React-Hooks, and your component might need a life cycle method at some point. And, that is when you start using **useEffect()** (a.k.a **Effect Hook**). Then boom!!, you have encountered **an infinite loop behavior,** and you have no idea why the hell is that. If that happens, this article will explain to you why, and how can you prevent.

## Example Using Effect Hook

The code snippet below is the example of using Effect Hook, but it has an infinite loop behavior.

![](/assets/images/blog/5.1.png)

A problem snippet code for causing an infinite behavior

## What does this code do?

- In a nutshell, the component **_“DisplayName”_** has two states which are “**_name”_** and “**_userId”._**
- And it has a function called **_“fetchUser()”_** which handle fetching data from API and set the **_“name”._**
- Then, there is“**_useEffect()”_** which will call the “**_fetchUser()”_** after rendering a DOM element.

## Where is the problem?

- The “**_useEffect()”,_** will run after the initial render, then invoke the “**_fetchUser()”._**
- Inside the “**_fetchUser_**”, it will update the state “**_name_**” on line 9. Then it will trigger the component to re-render again.
- As a result, “**_useEffect()”_** will run again and update the state. Next, the whole process repeats again, and you're trapped inside an infinite loop.

![](/assets/images/blog/5.2.png)

The diagram of Infinite loop behavior

## The Solution for Infinite Behavior

![](/assets/images/blog/5.3.png)

A solution snippet code for an infinite behavior

> “You can tell React to _skip_ applying an effect if certain values haven’t changed between re-renders. To do so, pass an array as an optional second argument to useEffect”, from the official [documentation](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects).

In the snippet above, we now have an optional second argument **[userId]** passed in the “**_useEffect()_**”.

**By providing [userId] as a second argument**_,_ we are just telling “**_useEffect()”_** to run only if the certain value (userId) has changed between the component re-renders.

Here below, I’ve provided a simple diagram for the sake of simplicity.

![](/assets/images/blog/5.4.png)

The diagram of skipping useEffect

And now, we’ve escaped from the infinite world !!.
