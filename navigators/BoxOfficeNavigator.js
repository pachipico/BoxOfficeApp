import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BoxOffice from '../pages/BoxOffice';
import Details from '../pages/Details';

const Stack = createStackNavigator();

const BoxOfficeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BoxOffice" component={BoxOffice} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default BoxOfficeNavigator;
