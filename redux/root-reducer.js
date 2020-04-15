import { createStore, combineReducers } from 'redux';
import blogReducer from './blogReducer/blogReducer';

const rootReducer = combineReducers({
  blog: blogReducer
});

const store = createStore(rootReducer);

export default store;
