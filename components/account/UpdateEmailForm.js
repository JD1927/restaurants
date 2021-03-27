import { isEmpty } from 'lodash';
import React, { useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { refreshAuthentication, updateEmail } from '../../utils/actions';
import { ORANGE } from '../../utils/global.colors';
import { hasValidEmail, } from '../../utils/helpers';

export default function UpdateEmailForm({ email, setShowModal, toast, setReloadUser }) {
  const [newEmail, setNewEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasValidForm = () => {
    let isValid = true;
    setEmailError(undefined);
    setPasswordError(undefined);

    if(!hasValidEmail(newEmail) || isEmpty(newEmail)) {
      setEmailError('You must enter a valid email.');
      isValid = false;
    }

    if(newEmail === email) {
      setEmailError('You must enter a different email from the current one.');
      return false;
    }

    if(isEmpty(password)) {
      setPasswordError('You must enter your password.');
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async () => {
    if (!hasValidForm()) {
      return;
    }
    setLoading(true);

    const hasValidAuth = await refreshAuthentication(password);

    if (!hasValidAuth.status) {
      setLoading(false);
      setPasswordError('Incorrect password.');
      return;
    }
    const isUpdatedEmail = await updateEmail(newEmail);
    setLoading(false);
    if (!isUpdatedEmail.status) {
      setPasswordError('This email is not valid for this action.');
      return;
    }

    setReloadUser(true);
    toast.current.show('Your email has been updated.', 3000);
    setShowModal(false);
  };

  return (
    <View style={styles.form}>
      <Input 
        placeholder='Enter your new email'
        containerStyle={styles.inputContainer}
        style={styles.input}
        defaultValue={email}
        keyboardType='email-address'
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        errorMessage={emailError}
        rightIcon={
          {
            type: 'material-community',
            name: 'at',
            color: `${ORANGE}`
          }
        }
      />
      <Input 
        placeholder='Enter your password'
        containerStyle={styles.inputContainer}
        style={styles.input}
        defaultValue={password}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        errorMessage={passwordError}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={
          {
            type: 'material-community',
            name: showPassword ? 'eye-outline' : 'eye-off-outline',
            color: `${ORANGE}`,
            onPress: () => setShowPassword(!showPassword)
          }
        }
      />
      <Button
        title='UPDATE'
        containerStyle={styles.btnContainter}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={onSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    paddingVertical: 10
  },
  inputContainer: {
    marginBottom: 15,
  },
  btnContainter: {
    width: '95%'
  },
  button: {
    backgroundColor: `${ORANGE}`,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Poppins',
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 16,
    width: '100%',
  },
})
