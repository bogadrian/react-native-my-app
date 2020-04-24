import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';
const Card = props => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          ...styles.card,
          ...props.style
        }}
      >
        {props.children}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1
  }
});

export default Card;
