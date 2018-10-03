import * as types from '../constants/ActionTypes';

export function requestMessageList(params) {
  return {
    type: types.REQUEST_MESSAGE_LIST,
    params
  };
}

export function receiveMessageList(messageList) {
  return {
    type: types.RECEIVE_MESSAGE_LIST,
    messageList
  };
}
