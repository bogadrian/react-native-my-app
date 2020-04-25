import React from 'react';
import { View, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Colors from '../../constants/Colors';
const UserImage = props => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        <Image
          source={require('../../assets/me.png')}
          style={{ ...props.style, borderRadius: 20 }}
        />
      </View>
    </Layout>
  );
};

export default UserImage;
