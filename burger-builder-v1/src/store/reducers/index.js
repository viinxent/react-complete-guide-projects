import { combineReducers } from 'redux';

import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
});

export default rootReducer;