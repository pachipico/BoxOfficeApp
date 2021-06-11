/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BoxOffice from './BoxOffice';
import Details from './components/Details';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="BoxOffice"
            component={BoxOffice}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
