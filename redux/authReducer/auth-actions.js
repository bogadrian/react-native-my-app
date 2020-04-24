import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const ERROR = 'ERROR';
export const ERROR_CLEAR = 'ERROR_CLEAR';

export const errorAction = error => {
  return dispatch => {
    dispatch({ type: ERROR, payload: error });
  };
};
export const errorActionClear = () => {
  return dispatch => {
    dispatch({ type: ERROR_CLEAR });
  };
};

let timer;

export const authenticate = (userId, token, email, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      email: email,
      token: token
    });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLzmiufN5pNv8E3A_CHPgJCVt_49Q_xnA',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already!';
        }

        dispatch(errorAction(message));
      }

      const resData = await response.json();
      dispatch(errorActionClear());
      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          resData.email.split('@'),
          parseInt(resData.expiresIn) * 1000
        )
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(
        resData.idToken,
        resData.localId,
        resData.email,
        expirationDate
      );
    } catch (err) {
      console.log('An error has occured', err);
      dispatch(errorActionClear());
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLzmiufN5pNv8E3A_CHPgJCVt_49Q_xnA',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }

        dispatch(errorAction(message));
      }

      const resData = await response.json();

      dispatch(errorActionClear());
      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          resData.email,
          parseInt(resData.expiresIn) * 1000
        )
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(
        resData.idToken,
        resData.localId,
        resData.email,
        expirationDate
      );
    } catch (err) {
      console.log('An error has occured', err);
      dispatch(errorActionClear());
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, email, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      email: email,
      expiryDate: expirationDate.toISOString()
    })
  );
};
