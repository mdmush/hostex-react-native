import * as types from '../constants/ActionTypes';

export function requestThreadList(params) {
  return {
    type: types.REQUEST_THREAD_LIST,
    params
  };
}

export function receiveThreadList(threadList) {
  return {
    type: types.RECEIVE_THREAD_LIST,
    threadList
  };
}

export function fetchMessageList() {
  return {
    type: types.FETCH_MESSAGE_LIST
  };
}

export function receiveMessageList(messageList) {
  return {
    type: types.RECEIVE_MESSAGE_LIST,
    messageList
  };
}

export function requestMessageList(threadId) {
  return {
    type: types.REQUEST_MESSAGE_LIST,
    threadId
  };
}

export function requestQuickReplyList() {
  return {
    type: types.REQUEST_QUICK_REPLY_LIST
  };
}

export function receiveQuickReplyList(replyList) {
  return {
    type: types.RECEIVE_QUICK_REPLY_LIST,
    replyList
  };
}
