import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Layout, Icon, Button, Card, Text } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

import Input from '../components/UI/Input';
import Colors from '../constants/Colors';
import * as authActions from '../redux/authReducer/auth-actions';

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

const AuthScreen = props => {
  const error = useSelector(state => state.error.error);

  const [isLoading, setIsLoading] = useState(false);

  const shakeIconRef = React.useRef();

  useEffect(() => {
    shakeIconRef.current.startAnimation();
  }, []);

  const renderShakeIcon = props => (
    <Icon
      {...props}
      ref={shakeIconRef}
      animationConfig={{ cycles: Infinity }}
      animation="shake"
      name="person-done-outline"
    />
  );

  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = () => {
    let action;

    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    try {
      setIsLoading(true);
      dispatch(action);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      props.navigation.navigate('Home');
    }
  };

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
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={2}
        style={styles.screen}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <View style={styles.buttonContainer}>
              <View>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <Button
                    style={styles.button}
                    onPress={authHandler}
                    accessoryRight={renderShakeIcon}
                    appearance="outline"
                    status="success"
                  >
                    {isSignup ? 'Sign Up' : 'Login'}
                  </Button>
                )}
              </View>

              <View style={{ marginTop: 20 }}>
                <Button
                  onPress={() => {
                    setIsSignup(prevState => !prevState);
                  }}
                  style={styles.button}
                  appearance="outline"
                  status="primary"
                >
                  {`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                </Button>
              </View>
            </View>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Authentication',
    headerLeft: props => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() =>
            navData.navigation.dispatch(DrawerActions.openDrawer())
          }
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  authContainer: {
    width: '90%',
    padding: 20,
    margin: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0
  },
  button: {
    width: 250
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
});

export default AuthScreen;
