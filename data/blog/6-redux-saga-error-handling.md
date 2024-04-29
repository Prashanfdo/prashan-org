---
title: Redux Saga Error Handling
slug: redux-saga-error-handling
date: 2020-03-02
image: /assets/images/blog/7.jpg
tags: react,redux-saga
---

**Problem: the try-catch insanity**

Again, I admit I have done it, we all have done it. Another copy and paste job from some tutorial that written up in 2 minutes for the purpose of learning NOT fit for production code that is littered with try-catch.

Here is a contrived example:

```
export function* requestCat() {
 try {
  const resp  = yield call(catService.get)
  yield put(actions.requestCatSuccess(resp))
 } catch (err) {
  yield put(actions.requestCatError(err))
 }
}

export function* requestDog() {
 try {
  const resp  = yield call(dogService.get)
  yield put(actions.requestDogSuccess(resp))
 } catch (err) {
  yield put(actions.requestDogError(err))
 }
}

export function* catsNDogsSaga() {
 yield takeLatest(actions.GET_CAT_REQUEST, requestCat)
 yield takeLatest(actions.GET_DOG_REQUEST, requestDog)
}
```

As you can see, this is not very good for our mental healthy, let’s see if we can do it better.

**Option 1: try-catch wrapper**

As per Unix Error handling principle “If we don’t have anything interesting to say, keep it quiet”. Meaning if we don’t have any value to add to solving the error, let it bubble up to the root error handler which is Option-2 below.

In the case that we don’t want error to bubble up to root Saga, or we are interested in handling in a specific saga, we wrap the saga generator in a safe generator.

onError handler can dispatch an event if we want the error to be handled somewhere else in the code base.

const onError = (err:any) => yield put(actions.requestError(err))

```
import * as actions from '../actions'
import { catService } from '../catServices'
import { put, call, takeLatest } from 'redux-saga/effects'

const safe = (handler:any = null, saga:any, ...args:any) => function* (action:any) {
  try {
    yield call(saga, ...args, action)
  } catch (err) {
    yield call(handler, ...args, err)
  }
}

export function* requestCat() {
  const cats = yield call(catService.get)
  yield put(actions.requestCatSuccess(cats))
}

export function* requestDog() {
  const dogs = yield call(catService.get)
  yield put(actions.requestDogSuccess(dogs))
}

const onError = (err:any) => {
  console.log(err)
}

export function* requestCatSaga() {
 yield takeLatest(actions.GET_CAT_REQUEST, safe(onError,requestCat))
 yield takeLatest(actions.GET_DOG_REQUEST, safe(onError, requestDog))
}
```

**Option 2: Global error handler**

So we have to options here:

1. Add an onError function to the middleware option.

2. Chain a catch function at returned promise of sagaMiddleware.run()

```
import { createStore, applyMiddleware, compose } from 'redux'
import RootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

//option 1
const sagaMiddleware = createSagaMiddleware({
  onError: (err) => {
    store.dispatch({ type: 'ERROR', payload: err })
  }
})

const composeEnhancers = ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }))
  || compose

const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

// option 2
sagaMiddleware.run(rootSaga).done.catch((e:any) => {
  console.log({ message: e.message, source: 'sagaError', stacktrace: e.sagaStack })
  store.dispatch({ type: 'ERROR', payload: e })
})

// option 2 if on latest mw version
sagaMiddleware.run(rootSagas, store.dispatch).toPromise().catch(e => {
    logger.error({ message: e.message, source: 'sagaError', stacktrace: e.sagaStack })
  store.dispatch({ type: 'ERROR', payload: e })
});

export default store
```
