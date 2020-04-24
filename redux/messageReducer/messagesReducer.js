import { messageActions } from './message-action';
import Message from '../../models/messageModel';

const INITIAL_STATE = {
  messages: []
};

//const userId = 'u4';
const messagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messageActions.CREATE_MESSAGE:
      const newMessage = new Message(
        action.payload.messageBody,
        action.payload.userId,
        action.payload.userEmail
      );
      const messageCreated = {
        [action.payload.userId]: newMessage
      };

      return {
        ...state,
        messages: state.messages.concat(messageCreated)
      };

    case messageActions.UPDATE_MESSAGE:
      //find the index of the message that needs to be updated, take all the state array and find the index using the message id passed in action
      const messageIndex = state.messages.findIndex(message => {
        let mess;
        for (const key in message) {
          if (message[key].id === action.payload.id) {
            mess = message[key].id;
          }
        }
        return mess === action.payload.id;
      });

      //create a new message model with the values arrived in action

      const updatedMessage = new Message(
        action.payload.messageBody,
        action.payload.userId,
        action.payload.userEmail
      );
      //here take care to formate the new message in the way the component expects, by example setting the user id key
      const newUpdatedMessage = {
        [action.payload.userId]: updatedMessage
      };

      // make a new copy of the state array and then update the propities in the object for that index found earlier here up
      const messagesArray = [...state.messages];
      messagesArray[messageIndex] = newUpdatedMessage;

      // just return here, weel done, job completed
      return {
        ...state,
        messages: messagesArray
      };

    case messageActions.DELETE_MESSAGE:
      const message = state.messages.findIndex(element => {
        let helperVar;

        for (const key in element) {
          helperVar = element[key].id;
        }

        return helperVar === action.payload.id;
      });

      return {
        ...state,
        messages: state.messages.filter((mes, i) => i !== message)
      };

    case messageActions.FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };

    default:
      return state;
  }
};

export default messagesReducer;
