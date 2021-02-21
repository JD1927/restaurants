import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignUpForm from '../../components/account/SignUpForm';

export default function SignUp() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('./../../assets/restaurant-logo.png')}
        resizeMode='contain'
        style={styles.image}>
      </Image>
      <SignUpForm></SignUpForm>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height:150,
    width: '100%',
    marginBottom: 20,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  }
});
