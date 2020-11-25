import { combineReducers } from 'redux';

import SharedReducer from './SharedReducer';
import EventReducer from './EventReducer';

const rootReducer = combineReducers({
  event: EventReducer,
  shared: SharedReducer,
});

export default rootReducer;
