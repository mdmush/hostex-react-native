import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware, { END } from 'redux-saga';

const middlewares = [];
const { logger } = require('redux-logger');

const sagaMiddleware = createSageMiddleware();

middlewares.push(sagaMiddleware);

if (__DEV__) {
  middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware();

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
