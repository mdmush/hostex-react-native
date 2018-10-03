import { put, take, call, fork } from 'redux-saga/effects';
import RequestUtil from '../utils/RequestUtil';
import * as types from '../constants/ActionTypes';
import { receiveMessageList } from '../actions/messages';

export function* requestMessageList(params) {
  try {
    const messageList = yield call(
      RequestUtil.request,
      'mobile_api/chat/chat_list',
      'get',
      params
    );
    yield put(receiveMessageList(messageList.data.list));
  } catch (error) {
    yield put(receiveMessageList([]));
  }
}

export function* watchRequestMessageList() {
  while (true) {
    const { params } = yield take(types.REQUEST_MESSAGE_LIST);
    yield fork(requestMessageList, params);
  }
}
