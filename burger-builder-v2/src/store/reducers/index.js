import { combineReducers } from 'redux';

import authReducer from './auth';
import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';

const rootReducer = combineReducers({
  auth: authReducer,
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
});

export default rootReducer;