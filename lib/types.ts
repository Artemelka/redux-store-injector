import { PropsWithChildren } from 'react';
import { EnhancedStore, Reducer, StoreEnhancer, Store } from '@reduxjs/toolkit';
import { Saga, RunSagaOptions, Task } from 'redux-saga';

export type AsyncReducerMap = Record<string, Reducer>;
export type AsyncSagasMap = Record<string, Task>;
type RunSaga = (
  saga: Saga,
  options: RunSagaOptions<string, EnhancedStore>,
) => Task;
export type AppStore = Store & {
  appReducer?: (asyncReducers?: AsyncReducerMap) => Reducer;
  runSaga?: RunSaga;
  injectedReducers: AsyncReducerMap;
  injectedSagas: AsyncSagasMap;
};

export type CreateEnhancerParams = {
  createReducer: (asyncReducers?: AsyncReducerMap) => Reducer;
  runSaga?: RunSaga;
};
export type CreateEnhancer = StoreEnhancer;

export type AsyncReducerItem = {
  name: string;
  reducer: Reducer;
};
export type InjectReducersParams = {
  asyncReducers: Array<AsyncReducerItem>;
  store: AppStore;
};

export type AsyncSagaItem = {
  args?: RunSagaOptions<string, EnhancedStore>;
  saga: Saga;
  name: string;
};
export type InjectSagasParams = {
  asyncSagas: Array<AsyncSagaItem>;
  store: AppStore;
};

export type ContextValue = {
  setReducers?: (asyncReducers: Array<AsyncReducerItem>) => void;
  setSagas?: (asyncSagas: Array<AsyncSagaItem>) => void;
  ejectReducers?: (asyncReducers: Array<AsyncReducerItem>) => void;
  ejectSagas?: (asyncSagas: Array<AsyncSagaItem>) => void;
};

export type StoreInjectorProviderProps = PropsWithChildren<{
  store: AppStore;
}>;

export type StoreInjectorConsumerProps = {
  asyncSagas?: Array<AsyncSagaItem>;
  asyncReducers?: Array<AsyncReducerItem>;
  withEjectReducers?: boolean;
  children: any;
};
