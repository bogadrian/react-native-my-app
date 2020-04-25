import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  UPDATE_USER
} from './auth-actions';

const INITIAL_STATE = {
  token: null,
  userId: null,
  email: null,
  displayName: null
};

export default authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email
      };

    case UPDATE_USER:
      return {
        ...state,
        displayName: action.displayName
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
