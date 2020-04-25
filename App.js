import React, { useState } from 'react';
import { Provider } from 'react-redux';
import * as eva from '@eva-design/eva';

import { ThemeContext } from './theme-context';

import {
  ApplicationProvider,
  IconRegistry,
  Button,
  Text
} from '@ui-kitten/components';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import store from './redux/root-reducer';

import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <AppNavigator theme={theme} />
          <Button
            style={{
              marginTop: -1,
              marginBottom: 0,
              borderColor: Colors.primary,
              backgroundColor: Colors.primary
            }}
            onPress={toggleTheme}
          >
            {theme === 'light' ? (
              <Text
                style={{
                  color: 'white',
                  fontSize: 16
                }}
              >
                GO DARK{' '}
              </Text>
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontSize: 16
                }}
              >
                GO LIGHT
              </Text>
            )}
          </Button>
        </ThemeContext.Provider>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
