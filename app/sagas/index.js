import { all, fork } from 'redux-saga/effects';

import { watchRequestHouseList, watchRequestTitleAlias } from './houses';
import {
  watchRequestGroupList,
  watchAddHousesToGroups,
  watchCreateGroup
} from './groups';
import {
  watchRequestThreadList,
  watchRequestMessageDetail,
  watchRequestQuickReplyList
} from './messages';

export default function* rootSaga() {
  yield all([
    fork(watchRequestHouseList),
    fork(watchRequestTitleAlias),

    fork(watchRequestGroupList),
    fork(watchAddHousesToGroups),
    fork(watchCreateGroup),

    fork(watchRequestThreadList),
    fork(watchRequestMessageDetail),
    fork(watchRequestQuickReplyList)
  ]);
}
