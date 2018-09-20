import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import Navigator from './utils/Navigator';
import App from './containers/app';

const store = configureStore();

store.runSaga(rootSaga);

const Root = () => (
  <Provider store={store}>
    <App ref={navigatorRef => Navigator.setTopLevelNavigator(navigatorRef)} />
  </Provider>
);

export default Root;
