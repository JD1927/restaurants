import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignInForm from '../../components/account/SignInForm';
import { ORANGE } from '../../utils/global.colors';

export default function SignIn() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('./../../assets/restaurant-logo.png')}
        resizeMode='contain'
        style={styles.image}>
      </Image>
      <View style={styles.container}>
        <SignInForm></SignInForm>
        <CreateAccount></CreateAccount>
      </View>
      <Divider style={styles.divider}></Divider>
    </KeyboardAwareScrollView>
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
    marginHorizontal: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 20
  },
  divider: {
    backgroundColor: `${ORANGE}`,
    margin: 40,
  },
  question: {
    fontFamily: 'Poppins',
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
