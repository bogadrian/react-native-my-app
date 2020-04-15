import React from 'react';
import { View, Image } from 'react-native';

const UserImage = props => {
  return (
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
  );
};

export default UserImage;
