import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Linking } from 'react-native';
import {
  Layout,
  Text,
  Card,
  Icon,
  Button,
  Divider
} from '@ui-kitten/components';

const BlogCard = props => {
  const theme = useSelector(state => state.theme.theme);
  const infiniteAnimationIconRef = React.useRef();

  useEffect(() => {
    infiniteAnimationIconRef.current.startAnimation();
  }, []);

  const handleLink = async url => {
    if (url) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderShakeIcon = props => (
    <Icon
      {...props}
      ref={infiniteAnimationIconRef}
      animationConfig={{ cycles: Infinity }}
      animation="shake"
      name="corner-down-right-outline"
    />
  );
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card style={styles.card}>
        <View style={{ marginVertical: 10 }}>
          <Text category="h6">{props.title}</Text>
        </View>
        <Divider size="large" />
        <Text category="s2">{props.text}</Text>
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
              accessoryLeft={renderShakeIcon}
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
              accessoryLeft={renderShakeIcon}
              size="small"
              onPress={handleLink.bind(this, props.url)}
            >
              Read More
            </Button>
          )}
        </View>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 1,
    alignItems: 'center',
    borderWidth: 2,
    height: 250
  },
  button: {
    width: '40%'
  }
});

export default BlogCard;
