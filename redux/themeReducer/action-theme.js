export const setTheme = {
  SET_THEME: 'SET_THEME'
};

export const setThemeAction = theme => {
  return {
    type: setTheme.SET_THEME,
    payload: theme
  };
};
