import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  FlatList,
  View,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { DrawerActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonCustom from '../components/UI/HeaderButtonCustom';
import Message from '../components/UI/Message';

import {
  messageActionDelete,
  fetchMessageAction
} from '../redux/messageReducer/message-action';
import Colors from '../constants/Colors';
const abortController = new AbortController();
const UserMessageContainer = props => {
  const theme = useSelector(state => state.theme.theme);
  let userId = useSelector(state => state.auth.userId);
  const currentUserEmail = useSelector(state => state.auth.email);

  const admin = '2YNdUbFITsYhmzJfbNYBDgFbgpM2';
  const adminEmail = 'bogdan4adrian4tech';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const messages = useSelector(state => {
    let mes = [];
    const element = state.messages.messages;

    element.forEach(el => {
      for (const key in el) {
        const id = el[key].id;
        const messageBody = el[key].messageBody;
        const email = el[key].userEmail;
        const userEmail = email;

        const messageRe = { id, messageBody, userId, userEmail };

        if (
          key === userId ||
          userId === admin ||
          email === adminEmail ||
          key === admin
        ) {
          mes.push(messageRe);
        }
      }
    });

    return mes;
  });

  const dispatch = useDispatch();

  const fetchFunc = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(fetchMessageAction());
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    props.navigation.addListener('willFocus', fetchFunc());

    return () => {
      abortController.abort();
    };
  }, [fetchFunc]);

  useEffect(() => {
    fetchFunc();
    return () => {
      abortController.abort();
    };
  }, [dispatch, fetchFunc]);

  const editMessagesHandler = id => {
    props.navigation.navigate('Create/Edit Message', {
      mesId: id
    });
  };

  const answerMessage = email => {
    props.navigation.navigate('Create/Edit Message', {
      email
    });
  };

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(messageActionDelete(id));
        }
      }
    ]);
  };

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>An error occurd!</Text>
        <Button title="Try Again!" onPress={fetchFunc} color={Colors.primary} />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme === 'light' ? 'white' : Colors.primary
        }}
      >
        <ActivityIndicator
          size="large"
          color={theme === 'light' ? Colors.primary : 'white'}
        />
      </View>
    );
  }

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {messages.length > 0 ? (
        <FlatList
          onRefresh={fetchFunc}
          refreshing={isLoading}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Message
              title={item.userEmail}
              messageBody={item.messageBody}
              onSelect={() => {
                item.userEmail === currentUserEmail
                  ? editMessagesHandler(item.id)
                  : null;
              }}
              it={item}
            >
              {currentUserEmail !== item.userEmail ? (
                <TouchableOpacity
                  onPress={answerMessage.bind(this, item.userEmail)}
                >
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-mail' : 'ios-mail'}
                    color={theme === 'light' ? Colors.primary : 'white'}
                    size={40}
                  />
                </TouchableOpacity>
              ) : null}

              {currentUserEmail === item.userEmail ? (
                <TouchableOpacity onPress={() => editMessagesHandler(item.id)}>
                  <Ionicons
                    name={
                      Platform.OS === 'android' ? 'md-create' : 'ios-create'
                    }
                    color={theme === 'light' ? 'blue' : 'yellow'}
                    size={40}
                  />
                </TouchableOpacity>
              ) : null}
              {item.userEmail === currentUserEmail ? (
                <TouchableOpacity onPress={deleteHandler.bind(this, item.id)}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    color="red"
                    size={40}
                  />
                </TouchableOpacity>
              ) : null}
            </Message>
          )}
        />
      ) : (
        <View>
          <Text>No messages found, maybe start creating some?</Text>
        </View>
      )}
    </Layout>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'My Messages',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === 'android'
              ? 'md-arrow-dropleft-circle'
              : 'ios-arrow-dropleft-circle'
          }
          onPress={() =>
            navData.navigation.dispatch(DrawerActions.openDrawer())
          }
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCustom}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navData.navigation.push('Create/Edit Message')}
        />
      </HeaderButtons>
    )
  };
};

export default UserMessageContainer;
