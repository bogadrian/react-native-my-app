export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER_PUSHTOKEN = 'GET_USER_PUSHTOKEN';
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

export const authenticate = (userId, token, email) => {
  return dispatch => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      email: email,
      token: token
    });
  };
};

export const update = (userId, token, email, displayName) => {
  return dispatch => {
    dispatch({
      type: UPDATE_USER,
      userId: userId,
      email: email,
      token: token,
      displayName: displayName
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
      dispatch(authenticate(resData.localId, resData.idToken, resData.email));
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
      dispatch(authenticate(resData.localId, resData.idToken, resData.email));
    } catch (err) {
      console.log('An error has occured', err);
      dispatch(errorActionClear());
    }
  };
};

export const updateWithPushToken = pushToken => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userEmail = getState().auth.userEmail;

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLzmiufN5pNv8E3A_CHPgJCVt_49Q_xnA',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idToken: token,
            displayName: pushToken,
            email: userEmail,
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
        update(
          resData.localId,
          resData.idToken,
          resData.email,
          resData.displayName
        )
      );
    } catch (err) {
      console.log('An error has occured', err);
      dispatch(errorActionClear());
    }
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
