import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { watchUnsplash } from '../features/ImageGrid/saga';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from '../features';

function* rootSaga() {
  yield all([watchUnsplash()]);
}

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
