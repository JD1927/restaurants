import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { getCurrentUser } from '../../utils/actions';
import { ORANGE } from '../../utils/global.colors';
import firebase from 'firebase/app';

export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo ? true : false);
    });
  }, []);

  return (
    <View style={styles.content}>
      <Text>Restaurants</Text>
      {
        user && (
          <Icon
            type='material-community'
            name='plus'
            color={`${ORANGE}`}
            reverse
            containerStyle={styles.icon}
            onPress={() => navigation.navigate('add-restaurant')}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  icon: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5
  }
});
