import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Linking } from 'react-native';
import { Layout, Card, Text, Icon, Button } from '@ui-kitten/components';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';
import UserImage from '../components/UI/UserImage';

const Header = props => (
  <View {...props}>
    <Card
      style={{
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
      }}
    >
      <View style={styles.imageCard}>
        <UserImage
          style={{ height: 100, width: 80, marginTop: 50 }}
          img={require('../assets/me.png')}
        />
        <View style={{ marginTop: 10 }}>
          <Text category="h6">About Me</Text>
          <Text category="s2" appearance="hint">
            Full-Stack developer, Javascript, CSS, SASS, Node Js, React Js,
            React Native, Express, MongoDb, Mongoose, Gatsby, NextJs, WebPack,
            npm, Git.
          </Text>
        </View>
      </View>
    </Card>
  </View>
);

const AboutMeScreen = props => {
  const theme = useSelector(state => state.theme.theme);
  const pulseIconRef = React.useRef();

  useEffect(() => {
    pulseIconRef.current.startAnimation();
  }, []);

  const handleLink = async url => {
    if (url) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderPulseIcon = props => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animationConfig={{ cycles: Infinity }}
      animation="pulse"
      name="rewind-right-outline"
    />
  );

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card style={styles.card} header={Header}>
        <Text category="s2">
          I am a self-taught web developer. I know Javascript, NodeJs,
          ExpressJs, MongoDb and Mongoose, ReactJs. I can use all of this
          technologies in production applications to build intresting thinghs. I
          know JavaScript good enough so far, even though I have not mastered it
          perfectly - yet! I am a humble person willing to learn and take orders
          from younger people.
        </Text>
      </Card>
      <Card style={styles.card}>
        {theme === 'light' ? (
          <Button
            status="primary"
            accessoryLeft={renderPulseIcon}
            onPress={handleLink.bind(this, 'https://bogdan.digital/about/')}
          >
            Read More
          </Button>
        ) : (
          <Button
            status="primary"
            appearance="outline"
            accessoryLeft={renderPulseIcon}
            onPress={handleLink.bind(this, 'https://bogdan.digital/about/')}
          >
            Read More
          </Button>
        )}
      </Card>
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'AboutMe',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === 'android'
              ? 'md-arrow-dropleft-circle'
              : 'ios-arrow-dropleft-circle'
          }
          onPress={() => navData.navigation.goBack()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Blog"
          iconName={
            Platform.OS === 'android' ? 'ios-bookmarks' : 'ios-bookmarks'
          }
          onPress={() => navData.navigation.navigate('Blog')}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  card: { margin: 1, alignItems: 'center', borderWidth: 0 },

  imageCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default AboutMeScreen;
