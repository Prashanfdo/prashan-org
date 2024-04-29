---
title: Authenticated Container for React Router and Redux
date: 2018-07-14
tags: react,redux
image: /assets/images/blog/1.webp
---

Separate authentication from your Components with a dedicated authentication component.

When writing [React](https://facebook.github.io/react/) applications with [Redux](https://github.com/reactjs/redux) and [react-router-redux](https://github.com/reactjs/react-router-redux) some routes in your application may require an authenticated user and others not. To separate the authentication concern we use a specific container that checks for the authentication and before rendering the child. If the authentication fails then you can respond by display an error or more likely redirect to login.

## Route

To simplify the main render method we use a function to wrap the child in an `AuthenticatedComponent`, so it is clear in your main render method which parts of your application are protected.

```
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppParent}>
        <Route path="login" component={LoginContainer}/>
        <Route path="logout" component={LogoutContainer}/>
        <Route path="about" component={AboutPage}/>
        <Route path="help" component={HelpPage}/>
        <Route path="user" component={requireAuth(UserContainer)}/>
        <Route path="admin" component={requireAuth(AdminContainer)}/>
        <Route path="main" component={requireAuth(MainContainer)}>
          <Route path="one" component={FirstPage}/>
          <Route path="two" component={SecondPage}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
```

## Authenticated Component

We then implement the `requireAuth` function as follows. You may need to change the detail of the auth check depending on your authentication actions and you can make the `authFailed` function do whatever you like, in this example we redirect to login with the path so we can redirect back after a successful login.

```
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export function requireAuth(ChildComponent) {

  class AuthenticatedComponent extends Component {

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.authFailed();
      }
    }

    render() {
      return (
        <div>
         { this.props.isAuthenticated === true ?
           <ChildComponent { ...this.props } /> : null }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.login.isAuthenticated,
  });

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      authFailed: () => {
        let location = ownProps.location
        let redirect = encodeURIComponent(location.pathname + location.search)
        dispatch(push(`/login?next=${redirect}`))
      },
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);

}

```

The auth details can be useful for the child components, say to show the username but not all children are likely to need it. A good way to do this is to make it a context object for the children. This can be done by adding the following to the class:

```
class AuthenticatedComponent extends Component {

  \\...

  static childContextTypes = {
    auth: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      auth: this.props.auth
    }
  }

  \\...
}
```
