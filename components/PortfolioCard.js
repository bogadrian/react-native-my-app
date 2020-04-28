import React from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import {
  Layout,
  Text,
  Card,
  Icon,
  Button,
  Divider
} from '@ui-kitten/components';

import UserImage from './UI/UserImage';

const PortfolioCard = props => {
  const theme = useSelector(state => state.theme.theme);
  const zoomIconRef = React.useRef();

  React.useEffect(() => {
    zoomIconRef.current.startAnimation();
  }, []);

  const handleLink = async url => {
    if (url) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderZoomIcon = props => (
    <Icon
      {...props}
      ref={zoomIconRef}
      animationConfig={{ cycles: Infinity }}
      animation="zoom"
      name="maximize-outline"
    />
  );

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <View style={styles.textBlock}>
          <Text category="h6">{props.title}</Text>
        </View>
        <View>
          <Text category="s2">{props.text}</Text>
        </View>
      </Card>
      <Card>
        <TouchableOpacity onPress={handleLink.bind(this, props.url)}>
          <View style={styles.image}>
            <UserImage img={props.img} style={{ marginTop: 50 }} />
          </View>
        </TouchableOpacity>
      </Card>

      <View
        style={{
          justifyContent: 'flex-end',
          marginVertical: 10
        }}
      >
        {theme === 'light' ? (
          <Button
            style={styles.button}
            status="danger"
            accessoryLeft={renderZoomIcon}
            size="small"
            onPress={handleLink.bind(this, props.url)}
          >
            Read More
          </Button>
        ) : (
          <Button
            style={styles.button}
            appearance="outline"
            status="danger"
            accessoryLeft={renderZoomIcon}
            size="small"
            onPress={handleLink.bind(this, props.url)}
          >
            Read More
          </Button>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '40%',
    marginTop: 10
  },
  textBlock: {
    marginVertical: 10,
    textAlign: 'center',
    alignItems: 'center'
  },
  image: { height: 200, width: 300 }
});

export default PortfolioCard;
