import React from 'react';
import { View, Text, Button, Platform, Image } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

const HomeScreen = props => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="go to about"
        onPress={() => props.navigation.navigate('About Me')}
      />
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Bogdan.Digital',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          color="white"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          color="white"
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate('Blog')}
        />
      </HeaderButtons>
    )
  };
};

export default HomeScreen;
