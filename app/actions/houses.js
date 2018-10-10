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

export function receiveSelectedHouses(houses) {
  return {
    type: types.RECEIVE_SELECTED_HOUSES,
    houses
  };
}

export function requestTitleAlias(houseId, titleAlias) {
  return {
    type: types.REQUEST_TITLE_ALIAS,
    houseId,
    titleAlias
  };
}

export function requestRecommendHouseList() {
  return {
    type: types.REQUEST_RECOMMEND_HOUSE_LIST
  };
}

export function receiveRecommendHouseList(houseList) {
  return {
    type: types.RECEIVE_RECOMMEND_HOUSE_LIST,
    houseList
  };
}
