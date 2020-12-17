import { AsyncReducerItem, InjectReducersParams } from '../types';

export const injectReducers = ({
  asyncReducers,
  store,
}: InjectReducersParams) => {
  const replacedReducerNames: Array<string> = [];

  asyncReducers.forEach(({ name, reducer }: AsyncReducerItem) => {
    if (store.injectedReducers[name]) {
      store.dispatch({
        type: '@@injectReducer/REWRITE_ASYNC_REDUCER',
        payload: name,
      });
      // eslint-disable-next-line
      console.warn(
        `The reducer ${name} is being replaced with a new async reducer`,
      );
    }

    // eslint-disable-next-line
    store.injectedReducers[name] = reducer;
    replacedReducerNames.push(name);
  });

  if (replacedReducerNames.length) {
    // eslint-disable-next-line
    // @ts-ignore
    const nextStore = store.appReducer(store.injectedReducers);
    store.replaceReducer(nextStore);
    store.dispatch({
      type: '@@injectReducer/INJECT_ASYNC_REDUCER',
      payload: replacedReducerNames.join('; '),
    });
    replacedReducerNames.length = 0;
  }
};
