import { useNavigation } from '@react-navigation/core';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { signInWithEmailAndPassword } from '../../utils/actions';
import { ORANGE, ORANGE_50 } from '../../utils/global.colors';
import { hasValidEmail } from '../../utils/helpers';
import Loading from '../Loading';

const defaultFormValues = () => ({ email: '', password: '' });

export default function SignInForm() {
  const router = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onValueChanges = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const validateData = () => {
    setErrorEmail('');
    setErrorPassword('');

    let isValid = true;

    if (!hasValidEmail(formData.email)) {
      setErrorEmail('You must enter a valid email.');
      isValid = false;
    }
    if (isEmpty(formData.password)) {
      setErrorPassword('You must enter a valid password.');
      isValid = false;
    }

    return isValid;
  };


  const signIn = async () => {
    if (!validateData()) {
      return;
    }
    const { email, password } = formData;
    setLoading(true);
    const result = await signInWithEmailAndPassword({ email, password });
    setLoading(false);
  
    if (!result.status) {
      setErrorEmail(result.error);
      setErrorPassword(result.error);
      return;
    }
    router.navigate('account');
  };

  return (
    <View style={styles.container}>
      <Loading isVisible={loading} text='Signing in...'></Loading>
      <Input
        keyboardType='email-address'
        placeholder='Enter your email...'
        containerStyle={styles.input}
        style={styles.textForm}
        onChange={(e) => onValueChanges(e, 'email')}
        errorMessage={errorEmail}
        defaultValue={formData.email}>
      </Input>
      <Input
        placeholder='Enter your password...'
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onValueChanges(e, 'password')}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        containerStyle={styles.input}
        style={styles.textForm}
        rightIcon={
          <Icon
            type='material-community'
            name={ showPassword ? 'eye-outline' : 'eye-off-outline' }
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}>
          </Icon>
        }>
      </Input>
      <Button
        title='SIGN IN'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        titleStyle={styles.textForm}
        onPress={() => signIn()}>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 16,
    width: '100%',
  },
  textForm: {
    fontFamily: 'Poppins',
  },
  btnContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center'
  },
  button: {
    fontFamily: 'Poppins',
    backgroundColor: `${ORANGE}`,
    borderRadius: 20,
  },
  icon: {
    color: `${ORANGE_50}`
  }
});
