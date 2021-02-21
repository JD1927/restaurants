import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { ORANGE } from '../../utils/global.colors';

export default function Login() {
  return (
    <ScrollView>
      <Image
        source={require('./../../assets/restaurant-logo.png')}
        resizeMode='contain'
        style={styles.image}>
      </Image>
      <View style={styles.container}>
        <Text>Sign In</Text>
        <CreateAccount></CreateAccount>
      </View>
      <Divider style={styles.divider}></Divider>
    </ScrollView>
  );
}

function CreateAccount({props}) {
  const navigation = useNavigation();
  return (
    <Text 
      onPress={() => navigation.navigate('signup')}
      style={styles.question}>
      Don't you have an account yet?{" "}
      <Text style={styles.signUp}>Sign up!</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    height:150,
    width: '100%',
    marginBottom: 20,
  },
  container: {
    marginHorizontal: 40,
  },
  divider: {
    backgroundColor: `${ORANGE}`,
    margin: 40,
  },
  question: {
    marginTop: 15,
    marginHorizontal: 10,
    textAlign: 'center',
    padding: 10,
  },
  signUp: {
    color: `${ORANGE}`,
    fontWeight: 'bold',
  },
});
