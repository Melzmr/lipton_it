import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers';
import { rootSaga } from './rootSaga';

export const isDevelop = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const composeEnhancers = isDevelop
  ? composeWithDevTools(middlewareEnhancer)
  : compose(middlewareEnhancer);

export const store = createStore(rootReducer, composeEnhancers);
sagaMiddleware.run(rootSaga);
