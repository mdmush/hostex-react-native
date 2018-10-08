import { put, take, call, fork } from 'redux-saga/effects';
import RequestUtil from '../utils/RequestUtil';
import * as types from '../constants/ActionTypes';
import {
  receiveThreadList,
  fetchMessageList,
  receiveMessageList,
  receiveQuickReplyList
} from '../actions/messages';

export function* requestThreadList(params) {
  try {
    const result = yield call(
      RequestUtil.request,
      'mobile_api/chat/chat_list',
      'get',
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
      RequestUtil.request,
      'mobile_api/chat/chat_detail',
      'get',
      params
    );
    yield put(receiveMessageList(result.data.list));
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
    const result = yield call(
      RequestUtil.request,
      'mobile_api/quick_reply/list',
      'get'
    );
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
