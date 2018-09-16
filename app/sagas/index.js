import { all, fork } from 'redux-saga/effects';

import { watchRequestHouseList } from './houses';

export default function* rootSaga() {
  yield all([fork(watchRequestHouseList)]);
}
