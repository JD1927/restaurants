import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/account/Account';
import Login from '../screens/account/Login';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='account'
        component={Account}
        options={{ title: 'Account' }}>
      </Stack.Screen>
      <Stack.Screen
        name='login'
        component={Login}
        options={{ title: 'Sign In' }}>
      </Stack.Screen>
    </Stack.Navigator>
  );
}
