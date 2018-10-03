import { combineReducers } from 'redux';
import houses from './houses';
import groups from './groups';
import messages from './messages';

const rootReducer = combineReducers({
  houses,
  groups,
  messages
});

export default rootReducer;
