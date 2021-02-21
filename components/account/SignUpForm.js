import { size } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';

import { ORANGE, ORANGE_50 } from '../../utils/global.colors';
import { hasValidEmail } from '../../utils/helpers';

const defaultFormValues = () => ({email: '', password: '', confirm: '' });

export default function SignUpForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');

  const onValueChanges = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const signUpUser = () => {
    if (!validateData()) {
      return;
    }
    console.log('Form is valid');
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
      <Input
        keyboardType='email-address'
        placeholder='Enter your email...'
        containerStyle={styles.input}
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
    width: '100%',
  },
  btnContainer: {
    marginTop: 20,
    width: '80%',
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
