# redux-store-injector

Utils for redux code-splitting.

## Installation
redux-store-injector is available as an [npm package](https://www.npmjs.com/package/@artemelka/redux-store-injector).

```sh
// with npm
npm i @artemelka/redux-store-injector

// with yarn
yarn add @artemelka/redux-store-injector
```

## Usage

Here is a quick example to get you started.

#### Store initialization:

```jsx
import {
  configureStore,
  combineReducers,
  createSlice
} from '@reduxjs/toolkit';
import {
  createInjectorEnhancer
} from '@artemelka/redux-store-injector';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const appReducer = createSlice({
   name: 'appLoader',
   initialState: { isLoading: false },
   reducers: {
       setAppLoaderStart: (state) => {
           state.isLoading = true;
       },
       setAppLoaderStop: (state) => {
           state.isLoading = false;
       }
   }
});

const createReducer = (asyncReducers) => combineReducers({
   appLoader: appReducer,
   ...(asyncReducers ? asyncReducers : {})
});

export const appStore = configureStore({
    reducer: createReducer(),
    enhancers: [createInjectorEnhancer({
      createReducer,
      runSaga: sagaMiddleware.run, 
    })],
    middleware: [sagaMiddleware]
});
```

#### Inject reducers and sagas

```jsx
import React from 'react';
import { connect } from 'react-redux';
import { StoreInjectorConsumer } from '@artemelka/redux-store-injector';
import { PageComponent } from './page';
import { pageReducer } from './reducer';
import { getRequestWatcherSaga } from './sagas';

export const Page = (props) => {
    return (
        <StoreInjectorConsumer
            asyncReducers={[{
              name: 'page',
              reducer: pageReducer
            }]}
            asyncSagas={[{
              name: 'GET_REQUEST_WATCHER_SAGA',
              saga: getRequestWatcherSaga
            }]}
            withEjectReducers
        >
            <PageComponent {...props}/>
        </StoreInjectorConsumer>
    );
};
```