import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../screens/favorites/Favorites';

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='favorites'
        component={Favorites}
        options={
          {
            title: 'Favorites',
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }
        }>
      </Stack.Screen>
    </Stack.Navigator>
  );
}
