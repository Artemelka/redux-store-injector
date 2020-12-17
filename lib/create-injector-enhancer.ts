import { CreateEnhancer, CreateEnhancerParams } from './types';

export const createInjectorEnhancer = ({
  createReducer,
  runSaga,
}: CreateEnhancerParams): CreateEnhancer =>
  // eslint-disable-next-line
  // @ts-ignore
  (createStore) =>
    // eslint-disable-next-line
    // @ts-ignore
    (...args) => ({
      ...createStore(...args),
      appReducer: createReducer,
      injectedSagas: {},
      injectedReducers: {},
      runSaga,
    });
