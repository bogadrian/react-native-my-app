import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView, StyleSheet, Linking } from 'react-native';
import { Layout, Card, Button, Icon } from '@ui-kitten/components';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';

import PortfolioCard from '../components/PortfolioCard';

const PortfolioScreen = props => {
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
      <ScrollView>
        <View>
          <PortfolioCard
            img={require('../assets/pyt.png')}
            title="Park Your Tir"
            text="An app to create and find parkingfor lorry drivers"
            url={'https://park-your-tir.herokuapp.com/'}
          />
          <PortfolioCard
            img={require('../assets/node.png')}
            title="NodeJs Chat App"
            text="An app build with Websocket and NodeJs"
            url={'https://bogdan-v1-node-chat-app.herokuapp.com/'}
          />
          <PortfolioCard
            img={require('../assets/react.png')}
            title="E-commerce with React"
            text="An app for e-commerce"
            url={'https://bogdan-ecommerce-react-app.herokuapp.com/'}
          />
          <PortfolioCard
            img={require('../assets/firebase.png')}
            title="To do with Firebase"
            text="A todo app with Firebase and Vanilla Javascript"
            url={'https://apps.bogdan.digital/firebase-todo/'}
          />
          <PortfolioCard
            img={require('../assets/babel.png')}
            title="Exchenge currency app"
            text="An app to calculate currenncy with BCE api"
            url={'http://apps.bogdan.digital/exchange/'}
          />
          <PortfolioCard
            img={require('../assets/git.png')}
            title="Quiz game app"
            text="A dummy quiz app with Vanilla Javascript"
            url={'https://apps.bogdan.digital/quiz-game/'}
          />
          <PortfolioCard
            img={require('../assets/weather.png')}
            title="Weather app"
            text="A weather app with Vanilla Javascript and geolocation"
            url={'https://apps.bogdan.digital/my-weather-app/'}
          />
        </View>
        <Card>
          <View style={styles.bottomButton}>
            {theme === 'light' ? (
              <Button
                style={styles.button}
                status="primary"
                accessoryLeft={renderPulseIcon}
                onPress={handleLink.bind(
                  this,
                  'https://bogdan.digital/portfolio/'
                )}
              >
                See all Portfolio
              </Button>
            ) : (
              <Button
                style={styles.button}
                status="primary"
                appearance="outline"
                accessoryLeft={renderPulseIcon}
                onPress={handleLink.bind(
                  this,
                  'https://bogdan.digital/portfolio/'
                )}
              >
                See all Portfolio
              </Button>
            )}
          </View>
        </Card>
      </ScrollView>
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Portfolio',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === 'android'
              ? 'md-arrow-dropleft-circle'
              : 'ios-arrow-dropleft-circle'
          }
          onPress={() => navData.navigation.navigate('Home')}
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
  button: {
    margin: 0,
    width: 200
  },

  bottomButton: {
    marginVertical: 30,
    alignItems: 'center'
  },
  buttonFooter: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: '25%',
    alignItems: 'center'
  }
});
export default PortfolioScreen;
