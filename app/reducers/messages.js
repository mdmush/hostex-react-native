import * as types from '../constants/ActionTypes';

const initialState = {
  messageList: []
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_MESSAGE_LIST:
      return Object.assign({}, state, {
        messageList: action.messageList
      });
    default:
      return state;
  }
}
