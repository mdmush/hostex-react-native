import { put, take, call, fork, select } from 'redux-saga/effects';
import _ from 'lodash';
import RequestUtil from '../utils/RequestUtil';
import * as types from '../constants/ActionTypes';
import ToastUtil from '../utils/ToastUtil';
import {
  receiveThreadList,
  fetchMessageList,
  receiveMessageList,
  receiveMessageHouseInfo,
  receiveMessageOrderList,
  receiveQuickReplyList
} from '../actions/messages';

export function* requestThreadList(params) {
  try {
    const result = yield call(
      RequestUtil.get,
      'mobile_api/chat/chat_list',
      params
    );
    yield put(receiveThreadList(result.data.list));
  } catch (error) {
    yield put(receiveThreadList([]));
  }
}

export function* watchRequestThreadList() {
  while (true) {
    const { params } = yield take(types.REQUEST_THREAD_LIST);
    yield fork(requestThreadList, params);
  }
}

export function* requestMessageList(params) {
  try {
    yield put(fetchMessageList());

    const result = yield call(
      RequestUtil.get,
      'mobile_api/chat/chat_detail',
      params
    );
    const { house_info: houseInfo, list } = result.data;
    yield put(receiveMessageList(list.reverse()));

    if (houseInfo) {
      const houses = yield call(
        RequestUtil.get,
        'mobile_api/calendar/house_summary_list'
      );
      const house = _.find(houses.data.list, { id: houseInfo.house_id });
      yield put(receiveMessageHouseInfo(house));
    } else {
      yield put(receiveMessageHouseInfo(null));
    }
  } catch (error) {
    yield put(receiveMessageList([]));
  }
}

export function* watchRequestMessageDetail() {
  while (true) {
    const { threadId: thread_id } = yield take(types.REQUEST_MESSAGE_LIST);
    yield fork(requestMessageList, { thread_id });
  }
}

export function* requestQuickReplyList() {
  try {
    const result = yield call(RequestUtil.get, 'mobile_api/quick_reply/list');
    yield put(receiveQuickReplyList(result.data.list));
  } catch (error) {
    yield put(receiveQuickReplyList([]));
  }
}

export function* watchRequestQuickReplyList() {
  while (true) {
    yield take(types.REQUEST_QUICK_REPLY_LIST);
    yield fork(requestQuickReplyList);
  }
}

export function* requestDeleteQuickReply(params) {
  try {
    yield call(RequestUtil.post, 'mobile_api/quick_reply/delete', params);
    yield fork(requestQuickReplyList);
  } catch (error) {}
}

export function* requestModifyQuickReply(params) {
  try {
    yield call(RequestUtil.post, 'mobile_api/quick_reply/modify', params);
    yield fork(requestQuickReplyList);
    ToastUtil.showShort('修改成功');
  } catch (error) {
    ToastUtil.showShort('修改失败，请重试');
  }
}

export function* requestCreateQuickReply(params) {
  try {
    yield call(RequestUtil.post, 'mobile_api/quick_reply/create', params);
    yield fork(requestQuickReplyList);
    ToastUtil.showShort('创建成功');
  } catch (error) {
    ToastUtil.showShort('创建失败，请重试');
  }
}

export function* watchRequestDeleteQuickReply() {
  while (true) {
    const { id } = yield take(types.REQUEST_DELETE_QUICK_REPLY);
    yield fork(requestDeleteQuickReply, { id });
  }
}

export function* watchRequestModifyQuickReply() {
  while (true) {
    const { id, title, content } = yield take(types.REQUEST_MODIFY_QUICK_REPLY);
    yield fork(requestModifyQuickReply, { id, title, content });
  }
}

export function* watchRequestCreateQuickReply() {
  while (true) {
    const { title, content } = yield take(types.REQUEST_CREATE_QUICK_REPLY);
    yield fork(requestCreateQuickReply, { title, content });
  }
}

export function* requestSendText(params) {
  const uniqueId = _.uniqueId();
  const message = {
    uniqueId,
    thirdparty_customer_type: 1,
    display_type: 'Text',
    message: params.message,
    sendStatus: 1 // 1 发送中 2 发送成功 3 发送失败
  };
  try {
    const msgList = yield select(state => state.messages.messageList);
    const newMsgList = msgList.concat(message);
    yield put(receiveMessageList(newMsgList));

    yield call(RequestUtil.post, 'mobile_api/chat/send_text', params);

    yield fork(requestMessageList, { thread_id: params.thread_id });
    // const index = _.findLastIndex(newMsgList, { uniqueId });
    // message.sendStatus = 2 && newMsgList.splice(index, 1, message);
    // yield put(receiveMessageList(newMsgList.slice(0)));
  } catch (error) {}
}

export function* requestSendRecommend(params) {
  try {
    yield call(RequestUtil.post, 'mobile_api/chat/send_recommend', params);
    yield fork(requestMessageList, { thread_id: params.thread_id });
  } catch (error) {}
}

export function* watchRequestSendText() {
  while (true) {
    const { threadId: thread_id, message } = yield take(
      types.REQUEST_SEND_TEXT
    );
    yield fork(requestSendText, { thread_id, message });
  }
}

export function* watchRequestSendRecommend() {
  while (true) {
    const { threadId: thread_id, houseId: house_id } = yield take(
      types.REQUEST_SEND_RECOMMEND
    );
    yield fork(requestSendRecommend, { thread_id, house_id });
  }
}
