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

export function receiveMessageHouseInfo(houseInfo) {
  return {
    type: types.RECEIVE_MESSAGE_HOUSE_INFO,
    houseInfo
  };
}

export function receiveMessageOrderList(orderList) {
  return {
    type: types.RECEIVE_MESSAGE_ORDER_LIST,
    orderList
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

export function requestDeleteQuickReply(id) {
  return {
    type: types.REQUEST_DELETE_QUICK_REPLY,
    id
  };
}

export function requestModifyQuickReply(id, title, content) {
  return {
    type: types.REQUEST_MODIFY_QUICK_REPLY,
    id,
    title,
    content
  };
}

export function requestCreateQuickReply(title, content) {
  return {
    type: types.REQUEST_CREATE_QUICK_REPLY,
    title,
    content
  };
}

export function requestSendText(threadId, message) {
  return {
    type: types.REQUEST_SEND_TEXT,
    threadId,
    message
  };
}

export function requestSendRecommend(threadId, houseId) {
  return {
    type: types.REQUEST_SEND_RECOMMEND,
    threadId,
    houseId
  };
}
