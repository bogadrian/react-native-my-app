import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

import UserImage from '../components/UI/UserImage';

const BlogScreen = props => {
  return (
    <View>
      <Text>BlogScreen</Text>
      <UserImage />
    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Blog',
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
      <TouchableOpacity>
        <UserImage />
      </TouchableOpacity>
    )
  };
};
export default BlogScreen;
