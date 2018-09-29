import { all, fork } from 'redux-saga/effects';

import { watchRequestHouseList } from './houses';
import {
  watchRequestGroupList,
  watchAddHousesToGroups,
  watchCreateGroup
} from './groups';

export default function* rootSaga() {
  yield all([
    fork(watchRequestHouseList),
    fork(watchRequestGroupList),
    fork(watchAddHousesToGroups),
    fork(watchCreateGroup)
  ]);
}
