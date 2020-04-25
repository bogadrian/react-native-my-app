import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Platform,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Layout, Button, Modal, Text, Icon, Card } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';
import UserImage from '../components/UI/UserImage';

import Colors from '../constants/Colors';
const Header = props => (
  <View {...props}>
    <Card
      style={{
        height: 250,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View style={{ marginTop: 30, marginRight: 150 }}>
        <Text category="h6">Bogdan_Dev</Text>
        <Text category="s1">bogdan.digital</Text>
      </View>
      <View style={{ marginTop: 0 }}>
        <TouchableOpacity>
          <UserImage style={{ height: 180, width: 150, marginTop: 10 }} />
        </TouchableOpacity>
      </View>
    </Card>
  </View>
);
const Footer = props => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
      style={styles.footerControl}
      appearance="outline"
      status="success"
      size="small"
    >
      ACCEPT
    </Button>
    <Button
      style={styles.footerControl}
      appearance="outline"
      status="primary"
      size="small"
      status="basic"
    >
      CANCEL
    </Button>
    <Button
      style={styles.footerControl}
      appearance="outline"
      status="primary"
      size="small"
    >
      ACCEPT
    </Button>
  </View>
);
const StarIcon = props => <Icon {...props} name="star" />;
const HomeScreen = props => {
  const pulseIconRef = React.useRef();
  useEffect(() => {
    pulseIconRef.current.startAnimation();
  }, []);

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
        <Card style={styles.card} header={Header} footer={Footer}>
          <Text>
            The Maldives, officially the Republic of Maldives, is a small
            country in South Asia,
          </Text>
        </Card>
        <Card style={{ alignItems: 'center' }}>
          <Button
            style={styles.button}
            status="danger"
            appearance="outline"
            accessoryLeft={renderPulseIcon}
          >
            PRIMARY
          </Button>
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
          // color={colorTheme === 'light' ? Colors.accent : 'white'}
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navData.navigation.navigate('Blog')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: {
    margin: 2,
    width: 200
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    flex: 1,
    margin: 2
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerControl: {
    marginHorizontal: 2,
    width: 100
  }
});
export default HomeScreen;
