import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/search/Search';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='search'
        component={Search}
        options={{ title: 'Search' }}>
      </Stack.Screen>
    </Stack.Navigator>
  );
}
