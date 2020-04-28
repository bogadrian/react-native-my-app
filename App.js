import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import * as eva from '@eva-design/eva';

import { ThemeContext } from './theme-context';

import {
  ApplicationProvider,
  IconRegistry,
  Toggle
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
const toggleTheme = () => {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
};

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = useState(initialState);

  let theme;
  if (checked === false) {
    theme = 'light';
  } else {
    theme = 'dark';
  }

  const successToggleState = isChecked => {
    setChecked(isChecked);
  };

  return { checked, onChange: successToggleState, toggleTheme, theme };
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const successToggleState = useToggleState();
  const { theme } = successToggleState;

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
          <Toggle
            style={styles.toggle}
            status="control"
            {...successToggleState}
          ></Toggle>
        </ThemeContext.Provider>
      </ApplicationProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  toggle: {
    margin: 0,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary
  }
});

export default App;
