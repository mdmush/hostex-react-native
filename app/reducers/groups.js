import * as types from '../constants/ActionTypes';

const initialState = {
  groupList: []
};

export default function groups(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_GROUP_LIST:
      return Object.assign({}, state, {
        groupList: action.groupList
      });
      break;
    default:
      return state;
  }
}
