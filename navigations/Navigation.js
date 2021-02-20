import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
// Screens
import RestaurantsStack from './RestaurantsStack';
import AccountStack from './AccountStack';
import FavoritesStack from './FavoritesStack';
import TopRestaurantsStack from './TopRestaurantsStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = ({ route, color }) => {
    let iconName;
    switch (route.name) {
      case 'restaurants':
        iconName = 'compass-outline';
        break;
      case 'favorites':
        iconName = 'heart-outline';
        break;
      case 'top-restaurants':
        iconName = 'star-outline';
        break;
      case 'search':
        iconName = 'magnify';
        break;
      case 'account':
        iconName = 'account-outline';
        break;
    
      default:
        break;
    }
    return (
      <Icon 
        type='material-community'
        name={iconName}
        size={22}
        color={color}>
      </Icon>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='restaurants'
        tabBarOptions={{
          inactiveTintColor: '#F4AA90',
          activeTintColor: '#E95420',
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({ color }) => screenOptions({ route, color })
        })}
        >
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
