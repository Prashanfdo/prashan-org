---
title: Secure routing in NextJS with TypeScript
date: 2021-07-09
image: /assets/images/blog/10.jpg
tags: react
---

In Nextjs, a route (page on your website) is created by simply creating a React component inside the pages folder. If for example you create a dashboard.tsx file inside the pages folder then the component inside this file will be rendered for a user visiting _www.example.com/dashboard._

In order to make a route only accessible to authenticated users, we need to find a way to be able to check whether the user is authenticated when they try to access the page.

Imagine having a room with all your really important private items and secrets inside, you don’t want anyone to be able to see what’s inside unless you have explicitly allowed them to right? Right!

Imagine that people started entering your room, and it’s only when they get inside that you can ask the ones that are not meant to be there to leave. This is what would happen if you check if a user is authenticated directly in the route component itself.

Now imagine we could have a reception area in front of this room, that would only let people into the room that are actually allowed in. This sounds like a better plan doesn’t it? We can achieve this by wrapping the page component in an authentication component.

**Prerequisites:**

Please setup the two following projects to be able to easily follow this tutorial.

- Nextjs project setup with Typescript: [Nextjs docs](https://nextjs.org/docs/getting-started)
- Basic Hello World ExpressJS app: [Express docs](https://expressjs.com/en/starter/installing.html)

## Create a simple express API to test the frontend

Let’s jump to the Backend for a few minutes!

We are not going to go into how to setup an express server in node as this is a prerequisite for this tutorial, but you can copy this code into the index.js file of your express app in order to setup a simple GET endpoint to allow us to test the frontend functionality.

```
**_index.js_**const express = require('express');
const app = express();/*
  Do not use this as authentication on the backend. This is only a simple setup to test the secure route on the frontend.
For more information on JSON web tokens please checkout this link [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
*/const authToken = '123456';app.get('/api/auth/user', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/); const token = match[1]; if (token !== authToken) {
    return res.status(401).send('Unauthorized');
  } else {
    return res.status(200).json({
      currentUser: {
        full_name: 'John Doe',
      }
    });
  }
});const port = process.env.PORT || 8080;app.listen(port, () => console.log(`App is listening on [http://localhost:${port}`));](http://localhost:${port}`));/)
```

All this route does is grab the Token that you pass into the Authorization header from the frontend and compare it to the authToken variable. If they are equal then you get a currentUser object back in response, if not then you get an error response.

## Creating a secure route component

Let’s jump back to the Frontend now!

We are going to create a wrapper that will take a component as an argument, check whether the user is authenticated, then return the component with the user data. If the user is not authenticated then instead of returning the component we can redirect using (next/router) to the homepage or login page.

### Create api service

In order to respect the principle of separation of concerns, we will create a file which we will call api-service.ts inside a folder called helpers.

We shall create a simple fetch request to our backend user authentication endpoint. We need to pass an auth token in the Authorization header to check whether the token is valid. Even if the user has a token from a previous valid login, the token could be expired, therefore we always need to check.

```
**_./helpers/api-service.ts_**const apiBaseUrl: string = process.env.NODE_ENV === 'production'
  ? 'https://example.com/api'
  : 'http://localhost:8080/api';export const findUser = (token: string) => fetch(`${apiBaseUrl}/auth/user`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Create the wrapper

The authRoute wrapper will pass the authenticated user data down into the component as a prop. If the user is not authenticated then they will be redirected to the login screen or homepage.

First of all, to ensure that the wrapper doesn’t have any strange side effects, we will just create the wrapper and pass the props down into the returned component.

```
**_./authentication/authRoute.tsx_**const authRoute = (Component) => {
  return (props) => {
    return <Component {...props} />;
  }
};export default authRoute;
```

Here it is important to note that we are not doing anything to the inner component. So if we were to wrap a component with this code then the component should act as if this wrapper is not even there.

### Authenticating the user

Before returning the component, we can now authenticate the user. To do this we are going to add the following variables

```
const router = useRouter();
const [user, setUser] = useState(null);
const [authenticated, setAuthenticated] = useState(false);
```

The user variable and the authenticated variable will store the user data and authenticated state respectively. The router variable will allow us to redirect the unauthenticated user to safety (homepage or login page).

```
**_./authentication/authRoute.tsx_**const authRoute = (Component) => {
  return (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false); return <Component {...props} />;
  }
};export default authRoute;
```

We then can authenticate the user using the `findUser` helper function we wrote earlier. Do do this we are going to use the `useEffect` hook and async/await as follows.

```
useEffect(() => {
  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
    } else { /* Here you would normally pass in the token to findUser but we are going to pass in '123456' to get a valid response from the server */ /* const response: any = await findUser(JSON.parse(token));*/

      const response: any = await findUser('123456'); if (!response.ok) {
        localStorage.removeItem("token");
        router.replace("/");
      } else {
        const userData = await response.json();
        if (!userData.currentUser) {
          router.replace("/");
          localStorage.removeItem('token');
        } else {
          setUser(userData.currentUser);
          setAuthenticated(true);
        }
      }
    }
  }
  checkToken();
}, []);
```

In order to be able to check whether the user that is trying to access this secure route is authenticated we need to get access to the access token that in our case is saved in local storage. Depending on your setup this might be inside the session storage or a cookie.

We check whether the token exists in local storage and if it doesn’t then we don’t need to go any further in the process and we can redirect the user to the homepage or login page.

Once we have a token, we are going to use our `findUser` service function to query our API. When we get a response from the server we need to check whether there were any errors and act accordingly. In the code below you can see that if there is an error we redirect the user to the homepage.

```
const response: any = await findUser(JSON.parse(token));if (!response.ok) {
  localStorage.removeItem("token");
  router.replace("/");
}
```

The last thing we do in this useEffect is to check whether we receive the right object and if so we set the user state to that object and toggle authenticated to true and then call the checkToken function.

```
if (!userData.currentUser) {
router.replace("/");
localStorage.removeItem('token');
} else {
setUser(userData.currentUser);
setAuthenticated(true);
}
```

Remember in the beginning of this article we mentioned having a reception area where we could check if the user is authenticated before letting them into the room? Well now we will code the final piece in this authRoute puzzle.

Right after the `useEffect` we shall add the following if statement:

```
if (authenticated) {
return <Component {...props} user={user} />;
} else {
return null;
}
```

As you can see, this if statement wraps the initial return component that we coded at the beginning and adds the user object as a prop to the component.

### What does the whole wrapper look like ?

```
**_./authentication/authRoute.tsx_**
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { findUser } from '../helpers/api-service';const authRoute = (Component) => {
  return (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);          useEffect(() => {
      const checkToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/");
        } else {
          const response: any = await findUser(JSON.parse(token));           if (!response.ok) {
            localStorage.removeItem("token");
            router.replace("/");
          } else {
            const userData = await response.json();
            if (!userData.currentUser) {
              router.replace("/");
              localStorage.removeItem('token');
            } else {
              setUser(userData.currentUser);
              setAuthenticated(true);
            }
          }
        }
      }
      checkToken();
    }, []);

    if (authenticated) {
      return <Component {...props} user={user} />;
    } else {
      return null;
    }
  }
}; export default authRoute;
```

### How does this work with an actual component?

Now the authentication wrapper is finished and we can test our wrapper on a simple component.

Create a dashboard component in your pages folder and add the following code.

```
**_./pages/dashboard.tsx_**
import React from 'react';
import authRoute from './authRoute.tsx;const Dashboard = ({ user }) => {
  return (
    <>
      <h1>{`Hello ${user.full_name}}</h1>
    </>
  )
};export default authRoute(Dashboard);
```

### Run the local version of your app

```
$ npm run dev
```

This is the output that you should see in your browser.
![](/assets/images/blog/10.1.png)

_Screenshot http://localhost:3000/dashboard_

## Conclusion

There are a few ways to deal with secure routes in React and in Nextjs but this way ensures that you always have access to the authenticated data when the page is rendered, if not you will end up on a login page or homepage in our case.
