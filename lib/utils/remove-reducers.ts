import { InjectReducersParams } from '../types';

export const removeReducers = ({
  asyncReducers,
  store,
}: InjectReducersParams) => {
  const replacedReducerNames: Array<string> = [];

  asyncReducers.forEach(({ name }) => {
    if (store.injectedReducers[name]) {
      const { [name]: deletedReducer, ...rest } = store.injectedReducers;
      // eslint-disable-next-line
      store.injectedReducers = rest;
      replacedReducerNames.push(name);
    } else {
      // eslint-disable-next-line
      console.warn(`The reducer ${name} is not found in asyncReducers`);
    }
  });

  if (replacedReducerNames.length) {
    // eslint-disable-next-line
    // @ts-ignore
    store.replaceReducer(store.appReducer(store.injectedReducers));
    store.dispatch({
      type: '@@injectReducer/REMOVE_ASYNC_REDUCER',
      payload: replacedReducerNames.join('; '),
    });
    replacedReducerNames.length = 0;
  }
};
