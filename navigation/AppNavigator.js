import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Platform, SafeAreaView, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { logout } from '../redux/authReducer/auth-actions';
import AuthScreen, {
  screenOptions as authNavigationOptions
} from '../screens/AuthScreen';

import HomeScreen, {
  screenOptions as homeNavigationOptions
} from '../screens/HomeScreen';
import AboutMeScreen, {
  screenOptions as aboutNavigationOptions
} from '../screens/AboutMeScreen';
import BlogScreen, {
  screenOptions as blogNavigationOptions
} from '../screens/BlogScreen';
import PortfolioScreen, {
  screenOptions as portfolioNavigationOptions
} from '../screens/PortfolioScreen';

import UserMessageContainer, {
  screenOptions as userMessageContainerOptions
} from '../screens/UserMessageContainer';

import UserMessage, {
  screenOptions as userMessageOptions
} from '../screens/UserMessage';
import { setThemeAction } from '../redux/themeReducer/action-theme';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary //Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: 'white' //Platform.OS === 'android' ? 'white' : Colors.primary
};

const MainStackNavigator = createStackNavigator();

const MainStack = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MainStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={homeNavigationOptions}
      />
      <MainStackNavigator.Screen
        name="AboutMe"
        component={AboutMeScreen}
        options={aboutNavigationOptions}
      />
      <MainStackNavigator.Screen
        name="Blog"
        component={BlogScreen}
        options={blogNavigationOptions}
      />
      <MainStackNavigator.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={portfolioNavigationOptions}
      />
    </MainStackNavigator.Navigator>
  );
};
const AboutNavigator = createStackNavigator();

const AboutStackNavigator = props => {
  return (
    <AboutNavigator.Navigator screenOptions={defaultNavOptions}>
      <AboutNavigator.Screen
        name="AboutMe"
        component={AboutMeScreen}
        options={aboutNavigationOptions}
      />
    </AboutNavigator.Navigator>
  );
};

const AuthNavigator = createStackNavigator();

const AuthNavigatorStack = props => {
  return (
    <AuthNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthNavigator.Screen
        name="Authentication"
        component={AuthScreen}
        options={authNavigationOptions}
      />
    </AuthNavigator.Navigator>
  );
};

const UserNavigator = createStackNavigator();

const UserStackNavigator = () => {
  return (
    <UserNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserNavigator.Screen
        name="Messages"
        component={UserMessageContainer}
        options={userMessageContainerOptions}
      />
      <UserNavigator.Screen
        name="Create/Edit Message"
        component={UserMessage}
        options={userMessageOptions}
      />
    </UserNavigator.Navigator>
  );
};

export const Tab = createBottomTabNavigator();

const MyTabs = props => {
  return (
    <Tab.Navigator
      headerMode="none"
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
          color: 'white',
          marginBottom: 0
        },
        tabStyle: {
          width: 100
        },
        style: {
          backgroundColor: Colors.primary
        },
        bottomTabs: {
          titleDisplayMode: 'alwaysHide'
        },
        showLabel: false,
        showIcon: true,
        inactiveTintColor: 'white',
        activeTintColor: 'yellow'
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
              size={23}
              color={props.color}
            />
          )
        }}
      />

      <Tab.Screen
        name="AboutMe"
        component={AboutStackNavigator}
        options={{
          tabBarIcon: props => (
            <Ionicons
              name={
                Platform.OS === 'android' ? 'md-briefcase' : 'ios-briefcase'
              }
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const DrwaerNavigator = createDrawerNavigator();

const DrwaerStackNavigator = navData => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <DrwaerNavigator.Navigator
      drawerStyle={{
        backgroundColor: theme === 'light' ? 'white' : Colors.primary,
        marginTop: 30,
        width: 240
      }}
      initialRouteName="Home"
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title={isAuth ? 'Logout' : 'You are logout'}
                color={theme === 'light' ? Colors.primary : 'white'}
                onPress={() => {
                  dispatch(logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: theme === 'light' ? Colors.primary : 'yellow',
        inactiveTintColor: theme === 'light' ? Colors.primary : 'white'
      }}
    >
      <DrwaerNavigator.Screen
        name="Main"
        component={MyTabs}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      {isAuth ? (
        <DrwaerNavigator.Screen
          name="Messages"
          component={UserStackNavigator}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={props.color}
              />
            ),

            color: 'white'
          }}
        />
      ) : (
        <DrwaerNavigator.Screen
          name="Login Message"
          component={AuthNavigatorStack}
          options={{
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={props.color}
              />
            ),

            color: 'white'
          }}
        />
      )}
    </DrwaerNavigator.Navigator>
  );
};

const AppNavigator = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setThemeAction(props.theme));
  });

  return (
    <NavigationContainer>
      <DrwaerStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
