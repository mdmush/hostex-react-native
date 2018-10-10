import { all, fork } from 'redux-saga/effects';

import {
  watchRequestHouseList,
  watchRequestTitleAlias,
  watchRequestRecommendHouseList
} from './houses';
import {
  watchRequestGroupList,
  watchAddHousesToGroups,
  watchCreateGroup
} from './groups';
import {
  watchRequestThreadList,
  watchRequestMessageDetail,
  watchRequestQuickReplyList,
  watchRequestDeleteQuickReply,
  watchRequestModifyQuickReply,
  watchRequestCreateQuickReply,
  watchRequestSendText,
  watchRequestSendRecommend
} from './messages';

export default function* rootSaga() {
  yield all([
    fork(watchRequestHouseList),
    fork(watchRequestTitleAlias),
    fork(watchRequestRecommendHouseList),

    fork(watchRequestGroupList),
    fork(watchAddHousesToGroups),
    fork(watchCreateGroup),

    fork(watchRequestThreadList),
    fork(watchRequestMessageDetail),
    fork(watchRequestQuickReplyList),
    fork(watchRequestDeleteQuickReply),
    fork(watchRequestModifyQuickReply),
    fork(watchRequestCreateQuickReply),
    fork(watchRequestSendText),
    fork(watchRequestSendRecommend)
  ]);
}
