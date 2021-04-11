import React from 'react';
import Navigation from './navigations/Navigation';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Navigation></Navigation>
  );
}