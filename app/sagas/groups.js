import { put, take, call, fork } from 'redux-saga/effects';
import RequestUtil from '../utils/RequestUtil';
import ToastUtil from '../utils/ToastUtil';
import * as types from '../constants/ActionTypes';
import { fetchGroupList, receiveGroupList } from '../actions/groups';

export function* requestGroupList(params) {
  try {
    const groupList = yield call(
      RequestUtil.request,
      'mobile_api/house_group/group_list',
      'get',
      params
    );
    yield put(receiveGroupList(groupList.data.list));
  } catch (error) {
    yield put(receiveGroupList([]));
  }
}

export function* watchRequestGroupList() {
  while (true) {
    const { params } = yield take(types.REQUEST_GROUP_LIST);
    yield fork(requestGroupList, params);
  }
}

export function* requestAddHousesToGroups(params) {
  try {
    yield call(
      RequestUtil.request,
      'mobile_api/house_group/add_house',
      'post',
      params
    );
    ToastUtil.showShort('保存成功');
  } catch (error) {
    ToastUtil.showShort('保存失败，请重试');
  }
}

export function* watchAddHousesToGroups() {
  while (true) {
    const { groupIds, houseIds } = yield take(
      types.REQUEST_ADD_HOUSES_TO_GROUPS
    );
    yield fork(requestAddHousesToGroups, {
      group_ids: groupIds,
      house_ids: houseIds
    });
  }
}

export function* requestCreateGroup(params) {
  try {
    yield call(
      RequestUtil.request,
      'mobile_api/house_group/create',
      'post',
      params
    );
    yield fork(requestGroupList);
  } catch (error) {}
}

export function* watchCreateGroup() {
  while (true) {
    const { name } = yield take(types.REQUEST_CREATE_GROUP);
    yield fork(requestCreateGroup, { name });
  }
}
