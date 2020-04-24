import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import { Layout, Button, Modal, Text, Card } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

import Colors from '../constants/Colors';

const HomeScreen = props => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Card
        style={{
          flex: 1,
          margin: 2,
          width: 300
        }}
        status="primary"
      >
        <Text>Warning</Text>
      </Card>
      <Button
        title="go to about"
        onPress={() => props.navigation.navigate('AboutMe')}
      />
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Bogdan.Digital',
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
    ),
    headerRight: props => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          // color={colorTheme === 'light' ? Colors.accent : 'white'}
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate('Blog')}
        />
      </HeaderButtons>
    )
  };
};

export default HomeScreen;
