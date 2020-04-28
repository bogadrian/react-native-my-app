import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  Platform,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { Layout, Button, Text, Icon, Card } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';
import UserImage from '../components/UI/UserImage';

import Colors from '../constants/Colors';

const Header = props => (
  <View {...props}>
    <Card
      style={{
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View style={{ marginTop: 30, marginRight: 150 }}>
        <Text category="h6">Bogdan_Dev</Text>
        <Text category="s1">bogdan.digital</Text>
      </View>
      <View style={styles.imageCard}>
        <UserImage
          style={{ height: 120, width: 100, marginTop: -30, borderRadius: 20 }}
          img={require('../assets/me.png')}
        />
        <Text style={styles.textImage}>
          /*const theme = useSelector(state => state.theme.theme); const isAuth
          = useSelector(state => !!state.auth.token); const pulseIconRef =
          React.useRef(); useEffect(() =>{' '}
          {
            //pulseIconRef.current.startAnimation();
          }
          , [isAuth]) */
        </Text>
      </View>
    </Card>
  </View>
);

const HomeScreen = props => {
  const theme = useSelector(state => state.theme.theme);
  const isAuth = useSelector(state => !!state.auth.token);

  const pulseIconRef = React.useRef();
  useEffect(() => {
    pulseIconRef.current.startAnimation();
  }, []);

  useEffect(() => {
    if (isAuth) {
      props.navigation.navigate('Messages');
    }
  }, [isAuth]);

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
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ScrollView>
        <View style={styles.socialIcons}>
          <TouchableOpacity
            onPress={handleLink.bind(
              this,
              'https://linkedin.com/in/adrian-bogdan-b52348181'
            )}
          >
            <Ionicons
              name="logo-linkedin"
              size={30}
              color={theme === 'light' ? '#003399' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLink.bind(this, 'https://twitter.com/dev_bogdan')}
          >
            <Ionicons
              name="logo-twitter"
              size={30}
              color={theme === 'light' ? 'blue' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLink.bind(this, 'https://github.com/bogadrian')}
          >
            <Ionicons
              name="logo-github"
              size={30}
              color={theme === 'light' ? Colors.primary : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLink.bind(this, 'https://bogdan.digital')}
          >
            <Ionicons
              name="logo-google"
              size={30}
              color={theme === 'light' ? '#e91e63' : 'white'}
            />
          </TouchableOpacity>
        </View>
        <Card style={styles.card} header={Header}>
          <Text style={styles.textCorp}>
            Full-Stack developer, Javascript, CSS, SASS, Node Js, React Js,
            React Native, Express, MongoDb, Mongoose, Gatsby, WebPack, npm, Git.
          </Text>
        </Card>
        <View style={styles.footerContainer}>
          {theme === 'light' ? (
            <Button
              style={styles.buttonFooter}
              status="success"
              size="small"
              onPress={() => props.navigation.navigate('Blog')}
            >
              BLOG
            </Button>
          ) : (
            <Button
              style={styles.buttonFooter}
              appearance="outline"
              status="success"
              size="small"
              onPress={() => props.navigation.navigate('Blog')}
            >
              BLOG
            </Button>
          )}
          {theme === 'light' ? (
            <Button
              style={styles.buttonFooter}
              status="warning"
              size="small"
              onPress={() => props.navigation.navigate('AboutMe')}
            >
              ABOUT
            </Button>
          ) : (
            <Button
              style={styles.buttonFooter}
              appearance="outline"
              status="warning"
              size="small"
              onPress={() => props.navigation.navigate('AboutMe')}
            >
              ABOUT
            </Button>
          )}
          {theme === 'light' ? (
            <Button
              style={styles.buttonFooter}
              status="danger"
              size="small"
              onPress={handleLink.bind(
                this,
                'mailto: bogdan4adrian4tech@gmail.com'
              )}
            >
              EMAIL
            </Button>
          ) : (
            <Button
              style={styles.buttonFooter}
              appearance="outline"
              status="danger"
              size="small"
              onPress={handleLink.bind(
                this,
                'mailto: bogdan4adrian4tech@gmail.com'
              )}
            >
              EMAIL
            </Button>
          )}
        </View>
        <Card style={styles.card}>
          <Text style={styles.textCorp}>
            My name is Adrian. I am a full stack web developer. I start learning
            to code at the end of 2017. Before that I only used Wordpress to
            build websites.
          </Text>
        </Card>
        <Card style={styles.card}>
          {theme === 'light' ? (
            <Button
              style={styles.button}
              status="primary"
              accessoryLeft={renderPulseIcon}
              onPress={handleLink.bind(
                this,
                'https://bogdan.digital/when-i-started/'
              )}
            >
              Read More
            </Button>
          ) : (
            <Button
              style={styles.button}
              status="primary"
              appearance="outline"
              accessoryLeft={renderPulseIcon}
              onPress={handleLink.bind(
                this,
                'https://bogdan.digital/when-i-started/'
              )}
            >
              Read More
            </Button>
          )}
        </Card>
      </ScrollView>
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Bogdan.Digital',
    headerLeft: props => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() =>
            navData.navigation.dispatch(DrawerActions.openDrawer())
          }
        />
      </HeaderButtons>
    ),
    headerRight: props => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Portfolio"
          iconName={Platform.OS === 'android' ? 'md-albums' : 'ios-albums'}
          onPress={() => navData.navigation.push('Portfolio')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  button: {
    margin: 0,
    width: 200
  },
  imageCard: {
    flexDirection: 'row'
  },

  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  textCorp: {
    fontFamily: 'open-sans',
    fontSize: 12,
    marginTop: -20
  },
  textImage: { height: 180, width: 120, fontSize: 8 },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    flex: 1,
    margin: 1,
    alignItems: 'center',
    borderWidth: 0
  },
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonFooter: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: '25%',
    alignItems: 'center'
  }
});
export default HomeScreen;
