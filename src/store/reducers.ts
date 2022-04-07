import { combineReducers } from 'redux';
import { routerReducer } from './router/routerReducer';

export const rootReducer = combineReducers({
  router: routerReducer,
});
