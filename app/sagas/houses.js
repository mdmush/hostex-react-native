import { put, take, call, fork } from 'redux-saga/effects';
import RequestUtil from '../utils/RequestUtil';
import * as types from '../constants/ActionTypes';
import { fetchHouseList, receiveHouseList } from '../actions/houses';
export function* requestHouseList(params) {
  try {
    yield put(fetchHouseList());
    const houseList = yield call(
      RequestUtil.request,
      'mobile_api/house_relation/hostex_house_list',
      'get',
      params
    );
    yield put(receiveHouseList(houseList.data.list));
  } catch (error) {
    yield put(receiveHouseList([]));
  }
}

export function* watchRequestHouseList() {
  while (true) {
    const { params } = yield take(types.REQUEST_HOUSE_LIST);
    yield fork(requestHouseList, params);
  }
}
