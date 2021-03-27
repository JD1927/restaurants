import { size } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import { ORANGE, ORANGE_50 } from '../../utils/global.colors';
import { hasValidEmail } from '../../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { signUpWithEmailAndPassword } from '../../utils/actions';
import Loading from '../Loading';

const defaultFormValues = () => ({email: '', password: '', confirm: '' });

export default function SignUpForm() {
  const router = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const onValueChanges = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const signUpUser = async() => {
    if (!validateData()) {
      return;
    }
    const { email, password } = formData;
    setLoading(true);
    const result = await signUpWithEmailAndPassword({ email, password });
    setLoading(false);
    if (!result.status) {
      setErrorEmail(result.error);
      return;
    }
    router.navigate('account');
  };

  const validateData = () => {
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirm('');

    let isValid = true;

    if (!hasValidEmail(formData.email)) {
      setErrorEmail('You must enter a valid email.');
      isValid = false;
    }
    if (size(formData.password) < 6) {
      setErrorPassword('You must enter a password with at least 6 characters.');
      isValid = false;
    }
    if (formData.password !== formData.confirm) {
      setErrorPassword('Your password does not match with confirm password.');
      setErrorConfirm('Your password does not match with confirm password.');
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.form}>
      <Loading isVisible={loading} text='Creating account...'></Loading>
      <Input
        keyboardType='email-address'
        placeholder='Enter your email...'
        containerStyle={styles.input}
        style={styles.buttonText}
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
        style={styles.buttonText}
        rightIcon={
          <Icon
            type='material-community'
            name={ showPassword ? 'eye-outline' : 'eye-off-outline' }
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}>
          </Icon>
        }>
      </Input>
      <Input
        placeholder='Confirm your password...'
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onValueChanges(e, 'confirm')}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        containerStyle={styles.input}
        style={styles.buttonText}
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
        title='REGISTER'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => signUpUser()}>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 16,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins',
  },
  btnContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: `${ORANGE}`,
    borderRadius: 20,
  },
  icon: {
    color: `${ORANGE_50}`
  }
});
