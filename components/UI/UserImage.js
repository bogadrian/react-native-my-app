import React from 'react';
import { View, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
const UserImage = props => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1024px-Crystal_Clear_kdm_user_female.svg.png'
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            marginRight: 20
          }}
        />
      </View>
    </Layout>
  );
};

export default UserImage;
