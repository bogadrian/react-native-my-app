import React from 'react';
import { View, Text } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

const PortfolioScreen = props => {
  return (
    <View>
      <Text>PortfolioScreen</Text>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Portfolio',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          color="white"
          iconName={
            Platform.OS === 'android'
              ? 'md-arrow-dropleft-circle'
              : 'ios-arrow-dropleft-circle'
          }
          onPress={() => navData.navigation.navigate('Home')}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Cart"
          color="white"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate('Blog')}
        />
      </HeaderButtons>
    )
  };
};

export default PortfolioScreen;
