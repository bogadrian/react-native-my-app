import React, { useEffect, useCallback, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Button,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Vibration
} from 'react-native';
import { updateWithPushToken } from '../redux/authReducer/auth-actions';
import * as Permissions from 'expo-permissions';
import { Layout } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';
import { Notifications } from 'expo';
import {
  messageActionCreate,
  messageActionUpdate
} from '../redux/messageReducer/message-action';
import InputComponenet from '../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const UserMessage = props => {
  const [notification, setNotification] = useState(notification);

  const theme = useSelector(state => state.theme.theme);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [error, setError] = useState();

  let messageId;
  if (props.route && props.route.params && props.route.params.mesId) {
    messageId = props.route.params.mesId;
  }

  const editedMessage = useSelector(state => {
    const element = state.messages.messages;
    let mess;
    element.forEach(me => {
      for (const key in me) {
        if (me[key].id === messageId) {
          mess = me[key];
        }
      }
    });
    return mess;
  });

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      messageBody: editedMessage ? editedMessage.messageBody : ''
    },
    inputValidities: {
      messageBody: editedMessage ? true : false
    },
    formIsValid: editedMessage ? true : false
  });

  useEffect(() => {
    let canc = true;
    if (error && canc) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
    return () => {
      canc = false;
    };
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedMessage) {
        await dispatch(
          messageActionUpdate(
            editedMessage.id,
            formState.inputValues.messageBody
          )
        );
      } else {
        await dispatch(messageActionCreate(formState.inputValues.messageBody));
      }
      props.navigation.push('Messages');
    } catch (err) {
      setError(err.message);
    }
    sendPushNotification();
    setIsLoading(false);
  }, [dispatch, messageId, formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    let isSubscribed = true;
    const callPerm = async () => {
      if (isSubscribed) {
        await registerForPushNotificationsAsync();
      }
    };
    callPerm();
    let notificationSubscription = Notifications.addListener(
      handleNotification
    );
    return () => {
      isSubscribed = false;
      notificationSubscription = null;
    };
  }, [registerForPushNotificationsAsync]);

  const handleNotification = notification => {
    Vibration.vibrate(100);
    console.log(notification);
    setNotification(notification);
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        'You have to grant permission in order to recive notifications from us'[
          { text: 'Okay' }
        ]
      );
      return;
    }

    const newToken = await Notifications.getExpoPushTokenAsync();
    if (newToken) {
      setToken(newToken);
    }

    dispatch(updateWithPushToken(newToken));
  };

  const sendPushNotification = async () => {
    const message = {
      to: token,
      sound: 'default',
      title: 'Bogdan.Digital Notification',
      body: formState.inputValues.messageBody,
      data: { data: formState.inputValues.messageBody },
      _displayInForeground: true
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  };

  if (isLoading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            ...styles.centered,
            backgroundColor: theme === 'light' ? 'white' : Colors.primary
          }}
        >
          <ActivityIndicator
            size="large"
            color={theme === 'light' ? Colors.primary : 'white'}
          />
        </View>
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={5}
        >
          <ScrollView>
            <View style={styles.form}>
              <InputComponenet
                id="messageBody"
                label="Message"
                errorText="Please enter a valid text!"
                keyboardType="default"
                color={theme === 'light' ? Colors.primary : 'white'}
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                initialValue={editedMessage ? editedMessage.messageBody : ''}
                initiallyValid={!!editedMessage}
                multiline
                numberOfLines={3}
                required
                minLength={5}
              />
              <TouchableOpacity onPress={submitHandler}>
                <View style={styles.saveButton}>
                  <Ionicons
                    name={
                      Platform.OS === 'android'
                        ? 'md-checkmark-circle-outline'
                        : 'ios-checkmark-circle-outline'
                    }
                    color={theme === 'light' ? Colors.primary : 'yellow'}
                    size={60}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Layout>
  );
};
export const screenOptions = navData => {
  return {
    headerTitle: 'Create/Edit Message',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === 'android'
              ? 'md-arrow-dropleft-circle'
              : 'ios-arrow-dropleft-circle'
          }
          onPress={() => navData.navigation.navigate('Messages')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    marginTop: 100
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButton: {
    height: 400,
    width: 400,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});

export default UserMessage;
