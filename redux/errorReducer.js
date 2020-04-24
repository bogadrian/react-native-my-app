import { ERROR, ERROR_CLEAR } from './authReducer/auth-actions';

const INITIAL_STATE = {
  error: null
};

export const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ERROR_CLEAR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
