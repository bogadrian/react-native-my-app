import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import messagesReducer from './messageReducer/messagesReducer';
import themeReducer from './themeReducer/themeReducer';
import authReducer from './authReducer/authReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  messages: messagesReducer,
  theme: themeReducer,
  auth: authReducer,
  error: errorReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
