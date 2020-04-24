import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

const PortfolioScreen = props => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text>PortfolioScreen</Text>
      </View>
    </Layout>
  );
};

export const screenOptions = navData => {
  const theme = useSelector(state => state.theme.theme);
  return {
    headerTitle: 'Portfolio',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
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
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate('Blog')}
        />
      </HeaderButtons>
    )
  };
};

export default PortfolioScreen;
