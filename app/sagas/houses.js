import { put, take, call, fork } from 'redux-saga/effects';
import RequestUtil from '../utils/RequestUtil';
import ToastUtil from '../utils/ToastUtil';
import * as types from '../constants/ActionTypes';
import {
  fetchHouseList,
  receiveHouseList,
  receiveRecommendHouseList
} from '../actions/houses';
export function* requestHouseList(params) {
  try {
    yield put(fetchHouseList());
    const houseList = yield call(
      RequestUtil.get,
      'mobile_api/house_relation/hostex_house_list',
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

export function* requestTitleAlias(params) {
  try {
    yield call(
      RequestUtil.request,
      'mobile_api/house/title_alias',
      'post',
      params
    );
    ToastUtil.showShort('别名设置成功');
    // yield fork(requestHouseList, { page: 1, page_size: 100 });
  } catch (error) {
    ToastUtil.showShort('别名设置失败，请重试');
  }
}

export function* watchRequestTitleAlias() {
  while (true) {
    const { houseId, titleAlias } = yield take(types.REQUEST_TITLE_ALIAS);
    yield fork(requestTitleAlias, {
      house_id: houseId,
      title_alias: titleAlias
    });
  }
}

export function* requestRecommendHouseList() {
  try {
    const result = yield call(
      RequestUtil.get,
      'mobile_api/chat/recommend_list'
    );
    yield put(receiveRecommendHouseList(result.data.list));
  } catch (error) {
    console.log('error: ', error);
    yield put(receiveRecommendHouseList([]));
  }
}

export function* watchRequestRecommendHouseList() {
  while (true) {
    yield take(types.REQUEST_RECOMMEND_HOUSE_LIST);
    yield fork(requestRecommendHouseList);
  }
}
