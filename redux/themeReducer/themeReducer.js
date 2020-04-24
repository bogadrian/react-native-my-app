import { setTheme } from './action-theme';

const INITIAL_STATE = {
  theme: 'light'
};

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case setTheme.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};

export default themeReducer;
