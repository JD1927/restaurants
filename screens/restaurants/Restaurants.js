import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ORANGE } from '../../utils/global.colors';
import { isUserLogged } from '../../utils/actions';
import { Loading } from '../../components/Loading';

export default function Restaurants() {
  const [user, setUser] = useState(undefined);
  // useEffect(() => {
  //   setUser(isUserLogged(user));
  // }, []);

  // if (user === undefined) {
  //   return <Loading isVisible={true} text='Loading...'></Loading>;
  // }

  return (
    <View style={styles.content}>
      <Text>Restaurants</Text>
      <Icon
        type='material-community'
        name='plus'
        color={`${ORANGE}`}
        reverse
        containerStyle={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: -10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5
  }
});
