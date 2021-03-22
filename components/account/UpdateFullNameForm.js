import { isEmpty } from 'lodash';
import React, { useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { updateEmail } from '../../utils/actions';
import { ORANGE } from '../../utils/global.colors';

export default function UpdateFullNameForm({ name, setShowModal, toast, setReloadUser }) {

  const [newName, setNewName] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const hasValidForm = () => {
    setError(undefined);
    if(isEmpty(newName)) {
      setError('You must enter your full name.');
      return false;
    }
    if(newName === name) {
      setError('You must enter different names from the current ones.');
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!hasValidForm()) {
      return;
    }
    setLoading(true);

    const data = { displayName: newName };
    const result = await updateEmail({ data });

    if (!result.status) {
      setLoading(false);
      setError('Something went wrong updating your profile.');
      return;
    }
    setLoading(false);
    setReloadUser(true);
    toast.current.show('Your full name has been updated.', 3000);
    setShowModal(false);
  };

  return (
    <View style={styles.form}>
      <Input 
        placeholder='Enter your full name'
        containerStyle={styles.input}
        defaultValue={name}
        onChange={(e) => setNewName(e.nativeEvent.text)}
        errorMessage={error}
        rightIcon={
          {
            type: 'material-community',
            name: 'account-circle-outline',
            color: `${ORANGE}`
          }
        }
      />
      <Button
        title='Update full name'
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
})
