import { AsyncSagaItem, InjectSagasParams } from '../types';

export const injectSagas = ({ asyncSagas, store }: InjectSagasParams) => {
  if (store.runSaga) {
    const addedSagaNames: Array<string> = [];

    asyncSagas.forEach(({ name, saga, args }: AsyncSagaItem) => {
      if (!store.injectedSagas[name]) {
        // eslint-disable-next-line
        // @ts-ignore
        store.injectedSagas[name] = store.runSaga(saga, args);  // eslint-disable-line
        addedSagaNames.push(name);
      }
    });

    if (addedSagaNames.length) {
      store.dispatch({
        type: '@@injectSaga/INJECT_ASYNC_SAGAS',
        payload: addedSagaNames.join('; '),
      });
      addedSagaNames.length = 0;
    }
  }
};
