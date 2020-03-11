import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import incrementReducer from './reducers/index';
import { watchIncrementAsync } from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync);
export default store;
