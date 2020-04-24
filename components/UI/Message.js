import React from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import Card from './Card';

const Message = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card style={styles.message}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.details}>
                <View>
                  <Text style={styles.title}>{props.title}</Text>
                </View>
                <View>
                  <Text style={styles.bodyMessage}>{props.messageBody}</Text>
                </View>
              </View>
              <View style={styles.actions}>{props.children}</View>
            </View>
          </TouchableCmp>
        </View>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  message: {
    height: '100%',
    width: 300,
    margin: 20,
    marginVertical: 20
  },
  bodyMessage: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'open-sans'
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  details: {
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20%',
    height: '20%',
    paddingHorizontal: 20
  }
});

export default Message;
