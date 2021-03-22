import { isEmpty, size } from 'lodash';
import React, { useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { refreshAuthentication, updatePassword } from '../../utils/actions';
import { ORANGE } from '../../utils/global.colors';
import { hasValidEmail, } from '../../utils/helpers';

export default function UpdatePasswordForm({ setShowModal, toast }) {
  const [newPassword, setNewPassword] = useState(undefined);
  const [currentPassword, setCurrentPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [newPasswordError, setNewPasswordError] = useState(undefined);
  const [currentPasswordError, setCurrentPasswordError] = useState(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasValidForm = () => {
    let isValid = true;
    setNewPasswordError(undefined);
    setCurrentPasswordError(undefined);
    setConfirmPasswordError(undefined);

    if(isEmpty(currentPassword)) {
      setCurrentPasswordError('You must enter your current password.');
      isValid = false;
    }
    if(size(newPassword) < 6) {
      setNewPasswordError('You must enter a new password with at least 6 characters.');
      isValid = false;
    }

    if(size(confirmPassword) < 6) {
      setConfirmPasswordError('You must enter a confirm password with at least 6 characters.');
      isValid = false;
    }
    if(newPassword !== confirmPassword) {
      setNewPasswordError('Your password must match with the confirm password');
      setConfirmPasswordError('Your password must match with the new password.');
      isValid = false;
    }
    if(newPassword === currentPassword) {
      setCurrentPasswordError('Your password must be different from the current one.');
      setConfirmPasswordError('Your password must be different from the current one.');
      setNewPasswordError('Your password must be different from the current one.');
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async () => {
    if (!hasValidForm()) {
      return;
    }
    setLoading(true);

    const hasValidAuth = await refreshAuthentication(currentPassword);

    if (!hasValidAuth.status) {
      setLoading(false);
      setCurrentPasswordError('Incorrect password.');
      return;
    }
    const isUpdatedPassword = await updatePassword(newPassword);
    if (!isUpdatedPassword.status) {
      setLoading(false);
      setCurrentPasswordError('Something went wrong updating your password.');
      return;
    }
    setLoading(false);
    toast.current.show('Your password has been updated.', 3000);
    setShowModal(false);
  };

  return (
    <View style={styles.form}>
      <Input 
        placeholder='Enter your current password'
        containerStyle={styles.input}
        defaultValue={currentPassword}
        onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
        errorMessage={currentPasswordError}
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
      <Input 
        placeholder='Enter your new password'
        containerStyle={styles.input}
        defaultValue={newPassword}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        errorMessage={newPasswordError}
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
      <Input 
        placeholder='Enter your confirm password'
        containerStyle={styles.input}
        defaultValue={confirmPassword}
        onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
        errorMessage={confirmPasswordError}
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
        title='Update Password'
        containerStyle={styles.btnContainter}
        buttonStyle={styles.button}
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
  input: {
    marginBottom: 15,
  },
  btnContainter: {
    width: '95%'
  },
  button: {
    backgroundColor: `${ORANGE}`,
    borderRadius: 20,
  }
});
