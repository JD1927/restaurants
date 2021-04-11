import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../screens/restaurants/Restaurants';
import AddRestaurant from '../screens/restaurants/AddRestaurant';
import Restaurant from '../screens/restaurants/Restaurant';

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='restaurants'
        component={Restaurants}
        options={
          {
            title: 'Restaurants',
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }
        }>
      </Stack.Screen>
      <Stack.Screen
        name='add-restaurant'
        component={AddRestaurant}
        options={
          {
            title: 'Add Restaurant',
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }
        }>
      </Stack.Screen>
      <Stack.Screen
        name='restaurant'
        component={Restaurant}
        options={
          {
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }
        }>
      </Stack.Screen>
    </Stack.Navigator>
  );
}
