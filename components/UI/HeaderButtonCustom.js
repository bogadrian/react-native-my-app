import React from 'react';

import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '@ui-kitten/components';

const HeaderButtonCustom = props => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
      }}
    >
      <HeaderButton
        {...props}
        iconSize={23}
        IconComponent={Ionicons}
        color={props.color ? props.color : 'white'}
      />
    </Layout>
  );
};

export default HeaderButtonCustom;
