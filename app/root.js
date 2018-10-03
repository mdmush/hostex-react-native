import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import Navigator from './utils/Navigator';
import App from './containers/app';
import { MenuProvider } from 'react-native-popup-menu';

const store = configureStore();

store.runSaga(rootSaga);

const Root = () => (
  <Provider store={store}>
    <MenuProvider>
      <App ref={navigatorRef => Navigator.setTopLevelNavigator(navigatorRef)} />
    </MenuProvider>
  </Provider>
);

export default Root;
