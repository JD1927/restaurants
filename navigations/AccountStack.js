import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/account/Account';
import LogIn from '../screens/account/LogIn';
import SignUp from '../screens/account/SignUp';

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
        component={LogIn}
        options={{ title: 'Sign In' }}>
      </Stack.Screen>
      <Stack.Screen
        name='signup'
        component={SignUp}
        options={{ title: 'Sign Up Form' }}>
      </Stack.Screen>
    </Stack.Navigator>
  );
}
