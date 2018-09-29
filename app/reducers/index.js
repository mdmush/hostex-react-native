import { combineReducers } from 'redux';
import houses from './houses';
import groups from './groups';

const rootReducer = combineReducers({
  houses,
  groups
});

export default rootReducer;
