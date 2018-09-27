import * as types from '../constants/ActionTypes';

export function requestHouseList(params) {
  return {
    type: types.REQUEST_HOUSE_LIST,
    params
  };
}

export function fetchHouseList() {
  return {
    type: types.FETCH_HOUSE_LIST
  };
}

export function receiveHouseList(houseList) {
  return {
    type: types.RECEIVE_HOUSE_LIST,
    houseList
  };
}
