import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const HeaderButtonCustom = props => {
  return (
    <HeaderButton
      {...props}
      iconSize={23}
      IconComponent={Ionicons}
      color="white" //{Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

export default HeaderButtonCustom;
