import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import RestaurantsStack from './RestaurantsStack';
import AccountStack from './AccountStack';
import FavoritesStack from './FavoritesStack';
import TopRestaurantsStack from './TopRestaurantsStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='restaurants'
          component={RestaurantsStack}
          options={{ title: 'Restaurants' }}>
        </Tab.Screen>
        <Tab.Screen
          name='favorites'
          component={FavoritesStack}
          options={{ title: 'Favorites' }}>
        </Tab.Screen>
        <Tab.Screen
          name='top-restaurants'
          component={TopRestaurantsStack}
          options={{ title: 'Top 5' }}>
        </Tab.Screen>
        <Tab.Screen 
          name='search'
          component={SearchStack}
          options={{ title: 'Search' }}>
        </Tab.Screen>
        <Tab.Screen
          name='account'
          component={AccountStack}
          options={{ title: 'Account' }}>
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
