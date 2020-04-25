export const messageActions = {
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  DELETE_MESSAGE: 'DELETE_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  FETCH_MESSAGES: 'FETCH_MESSAGES'
};

export const fetchMessageAction = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://rn-bogdan-digital.firebaseio.com/messages.json?auth=${token}`,
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      let loadedMessages = [];

      for (let key in resData) {
        loadedMessages.push({
          [resData[key].userId]: {
            id: key,
            messageBody: resData[key].messageBody,
            userEmail: resData[key].userEmail
          }
        });

        dispatch({
          type: messageActions.FETCH_MESSAGES,
          payload: loadedMessages
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const messageActionDelete = id => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-bogdan-digital.firebaseio.com/messages/${id}.json?auth=${token}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      dispatch({
        type: messageActions.DELETE_MESSAGE,
        payload: { id, userId }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const messageActionCreate = messageBody => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const userEmail = getState().auth.email;

    try {
      const response = await fetch(
        `https://rn-bogdan-digital.firebaseio.com/messages.json?auth=${token}`,
        {
          method: 'POST',
          headers: { contentType: 'application/json' },
          body: JSON.stringify({ messageBody, userId, userEmail })
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong. Please try agian!');
      }

      const resData = await response.json();

      dispatch({
        type: messageActions.CREATE_MESSAGE,
        payload: { id: resData.name, messageBody, userId, userEmail }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const messageActionUpdate = (id, messageBody) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const userEmail = getState().auth.email;
    try {
      const response = await fetch(
        `https://rn-bogdan-digital.firebaseio.com/messages/${id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: { contentType: 'application/json' },
          body: JSON.stringify({ messageBody })
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = response.json();

      dispatch({
        type: messageActions.UPDATE_MESSAGE,
        payload: { id, messageBody, userId, userEmail }
      });
    } catch (err) {
      console.log(err);
    }
  };
};
