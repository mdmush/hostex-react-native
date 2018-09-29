import * as types from '../constants/ActionTypes';

const initialState = {
  loading: false,
  houseList: [],
  selectedHouses: []
};

export default function houses(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_HOUSE_LIST:
      return Object.assign({}, state, {
        loading: true
      });
    case types.RECEIVE_HOUSE_LIST:
      return Object.assign({}, state, {
        loading: false,
        houseList: action.houseList
      });
    case types.RECEIVE_SELECTED_HOUSES:
      return Object.assign({}, state, {
        selectedHouses: action.houses
      });
    default:
      return state;
  }
}
