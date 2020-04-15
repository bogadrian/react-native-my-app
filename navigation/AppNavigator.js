import 'react-native-gesture-handler';
import * as React from 'react';
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

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#283E4A' //Platform.OS === 'android' ? Colors.primary : ''
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
        name="About Me"
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

const BlogNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const PortfolioNavigator = createStackNavigator();

const BlogStackNavigator = navData => {
  return (
    <BlogNavigator.Navigator screenOptions={defaultNavOptions}>
      <BlogNavigator.Screen
        name="Blog"
        component={BlogScreen}
        options={blogNavigationOptions}
      />
    </BlogNavigator.Navigator>
  );
};
const AboutStackNavigator = navData => {
  return (
    <AboutNavigator.Navigator screenOptions={defaultNavOptions}>
      <AboutNavigator.Screen
        name="About Me"
        component={AboutMeScreen}
        options={aboutNavigationOptions}
      />
    </AboutNavigator.Navigator>
  );
};

const PortfolioStackNavigator = navData => {
  return (
    <PortfolioNavigator.Navigator screenOptions={defaultNavOptions}>
      <PortfolioNavigator.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={portfolioNavigationOptions}
      />
    </PortfolioNavigator.Navigator>
  );
};

const DrwaerNavigator = createDrawerNavigator();

const DrwaerStackNavigator = navData => {
  return (
    <DrwaerNavigator.Navigator
      initialRouteName="Home"
      // drawerContent={props => {
      //   return (
      //     <View style={{ flex: 1, paddingTop: 20 }}>
      //       <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      //         <DrawerItemList {...props} />
      //         {/*<Button
      //         title="Logout"
      //         color={Colors.primary}
      //         onPress={() => {
      //           dispatch(authActions.logout());
      //           // props.navigation.navigate('Auth');
      //         }}
      //       />*/}
      //       </SafeAreaView>
      //     </View>
      //   );
      //}}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <DrwaerNavigator.Screen
        name="Home"
        component={MainStack}
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
      <DrwaerNavigator.Screen
        name="Blog"
        component={BlogStackNavigator}
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
      <DrwaerNavigator.Screen
        name="About Me"
        component={AboutStackNavigator}
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
      <DrwaerNavigator.Screen
        name="Portfolio"
        component={PortfolioStackNavigator}
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
    </DrwaerNavigator.Navigator>
  );
};

export const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
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
          backgroundColor: '#283E4A'
        },
        bottomTabs: {
          titleDisplayMode: 'alwaysHide'
        },
        showLabel: false,
        showIcon: true,
        inactiveTintColor: 'white',
        activeTintColor: Colors.accent
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrwaerStackNavigator}
        options={{
          tabBarIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={BlogStackNavigator}
        options={{
          tabBarIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default AppNavigator;
