import * as types from '../constants/ActionTypes';
import moment from 'moment';

const initialState = {
  threadList: [],
  messageList: [],
  messageHouseInfo: null,
  messageOrderList: [],
  replyList: []
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
      const list = action.messageList.map(item => {
        return Object.assign(item, {
          formattedTime: moment(item.origin_create_time).format('MM-DD HH:mm')
        });
      });
      return Object.assign({}, state, {
        messageList: list
      });
    case types.RECEIVE_MESSAGE_HOUSE_INFO:
      return Object.assign({}, state, { messageHouseInfo: action.houseInfo });
    case types.RECEIVE_MESSAGE_ORDER_LIST:
      return Object.assign({}, state, { messageOrderList: action.orderList });
    case types.RECEIVE_QUICK_REPLY_LIST:
      return Object.assign({}, state, {
        replyList: action.replyList
      });
    default:
      return state;
  }
}
