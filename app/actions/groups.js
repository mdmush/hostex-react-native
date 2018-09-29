import * as types from '../constants/ActionTypes';

export function requestGroupList(params) {
  return {
    type: types.REQUEST_GROUP_LIST,
    params
  };
}

export function receiveGroupList(groupList) {
  return {
    type: types.RECEIVE_GROUP_LIST,
    groupList
  };
}

export function requestAddHousesToGroups(groupIds, houseIds) {
  return {
    type: types.REQUEST_ADD_HOUSES_TO_GROUPS,
    groupIds,
    houseIds
  };
}

export function requestCreateGroup(name) {
  return {
    type: types.REQUEST_CREATE_GROUP,
    name
  };
}
