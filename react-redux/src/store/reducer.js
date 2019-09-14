import { combineReducers } from 'redux';

import ctrReducer from './reducers/counter';
import resultReducer from './reducers/result';

const rootReducer = combineReducers({
  ctr: ctrReducer,
  res: resultReducer,
});

export default rootReducer;