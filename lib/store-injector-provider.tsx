import React, { PureComponent } from 'react';
import { InjectorContext } from './context';
import {
  injectReducers,
  removeReducers,
  injectSagas,
  removeSagas,
} from './utils';
import {
  StoreInjectorProviderProps,
  AsyncReducerItem,
  AsyncSagaItem,
} from './types';

export class StoreInjectorProvider extends PureComponent<
  StoreInjectorProviderProps
> {
  setReducers = (asyncReducers: Array<AsyncReducerItem>) => {
    injectReducers({ asyncReducers, store: this.props.store });
  };

  setSagas = (asyncSagas: Array<AsyncSagaItem>) => {
    injectSagas({ asyncSagas, store: this.props.store });
  };

  ejectReducers = (asyncReducers: Array<AsyncReducerItem>) => {
    removeReducers({ asyncReducers, store: this.props.store });
  };

  ejectSagas = (asyncSagas: Array<AsyncSagaItem>) => {
    removeSagas({ asyncSagas, store: this.props.store });
  };

  render() {
    return (
      <InjectorContext.Provider
        value={{
          setReducers: this.setReducers,
          setSagas: this.setSagas,
          ejectReducers: this.ejectReducers,
          ejectSagas: this.ejectSagas,
        }}
      >
        {this.props.children}
      </InjectorContext.Provider>
    );
  }
}
