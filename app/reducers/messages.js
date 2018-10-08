import * as types from '../constants/ActionTypes';

const initialState = {
  threadList: [],
  messageList: [],
  customerInfo: null
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_THREAD_LIST:
      return Object.assign({}, state, {
        threadList: action.threadList
      });
    case types.FETCH_MESSAGE_LIST:
      return Object.assign({}, state, {});
    case types.RECEIVE_MESSAGE_LIST:
      return Object.assign({}, state, {
        messageList: action.messageList
      });
    case types.RECEIVE_CUSTOMER_INFO:
      return Object.assign({}, state, {
        customerInfo: action.customerInfo
      });
    default:
      return state;
  }
}
