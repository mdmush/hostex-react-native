import { put, take, call, fork } from 'redux-saga/effects';
import RequestUtil from '../utils/RequestUtil';
import * as types from '../constants/ActionTypes';
import { fetchHouseList, receiveHouseList } from '../actions/houses';
export function* requestHouseList() {
  console.log('request house list');
  try {
    yield put(fetchHouseList());
    const houseList = yield call(
      RequestUtil.request,
      'mobile_api/house_relation/hostex_house_list?page=1&page_size=20',
      'get'
    );
    yield put(receiveHouseList(houseList.data.list));
  } catch (error) {}
}

export function* watchRequestHouseList() {
  while (true) {
    yield take(types.REQUEST_HOUSE_LIST);
    yield fork(requestHouseList);
  }
}
