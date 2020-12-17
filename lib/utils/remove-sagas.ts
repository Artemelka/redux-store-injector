import { AsyncSagaItem, InjectSagasParams } from '../types';

export const removeSagas = ({ asyncSagas, store }: InjectSagasParams) => {
  if (store.runSaga) {
    const removedSagaNames: Array<string> = [];

    asyncSagas.forEach(({ name }: AsyncSagaItem) => {
      if (store.injectedSagas[name]) {
        const { [name]: deletedSaga, ...rest } = store.injectedSagas;

        deletedSaga.cancel();
        // eslint-disable-next-line
        store.injectedSagas = rest;
        removedSagaNames.push(name);
      } else {
        // eslint-disable-next-line
        console.warn(`The saga ${name} is not found in asyncSagas`);
      }
    });

    if (removedSagaNames.length) {
      store.dispatch({
        type: '@@injectSaga/REMOVE_ASYNC_SAGAS',
        payload: removedSagaNames.join('; '),
      });
      removedSagaNames.length = 0;
    }
  }
};
