import React from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';

//import Card from './Card';

const Message = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View style={{ marginVertical: 10 }}>
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
                <View style={styles.actions} pushFunc={props.pushFun}>
                  {props.children}
                </View>
              </View>
            </TouchableCmp>
          </View>
        </Card>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  message: {
    height: '100%',
    width: 350
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
    alignItems: 'center'
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
    marginTop: '15%',
    height: '25%',
    paddingHorizontal: 20
  }
});

export default Message;
