import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Account from '../screens/account/Account';
import SignIn from '../screens/account/SignIn';
import SignUp from '../screens/account/SignUp';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='account'
        component={Account}
        options={
          {
            title: 'Account',
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }
        }>
      </Stack.Screen>
      <Stack.Screen
        name='signin'
        component={SignIn}
        options={
          {
            title: 'Sign In',
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }
        }>
      </Stack.Screen>
      <Stack.Screen
        name='signup'
        component={SignUp}
        options={
          {
            title: 'Sign Up',
            headerTitleStyle: {
              fontFamily: 'Poppins',
            },
          }
        }>
      </Stack.Screen>
    </Stack.Navigator>
  );
}