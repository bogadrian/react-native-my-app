import React from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

import UserImage from '../components/UI/UserImage';

const BlogScreen = props => {
  const theme = useSelector(state => state.theme.theme);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text>BlogScreen</Text>
        <UserImage />
      </View>
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Blog',
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
      <TouchableOpacity>
        <UserImage />
      </TouchableOpacity>
    )
  };
};
export default BlogScreen;
