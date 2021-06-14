import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BoxOfficeNavigator from './BoxOfficeNavigator';
import SearchNavigator from './SearchNavigator';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BoxOfficeNavigator"
        component={BoxOfficeNavigator}
        options={{drawerLabel: 'BoxOffice'}}
      />
      <Drawer.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{drawerLabel: 'Search'}}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
