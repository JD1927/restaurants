import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Button } from 'react-native-elements';
import AccountOptions from '../../components/account/AccountOptions';
import UserInfo from '../../components/account/UserInfo';
import Loading from '../../components/Loading';
import { getCurrentUser, signOut } from '../../utils/actions';
import { ORANGE, ORANGE_80 } from '../../utils/global.colors';

export default function UserLogged() {
  const toast = useRef(Toast);
  const router = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [user, setUser] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setReloadUser(false);
  }, [reloadUser]);

  return (
    <View style={styles.container}>
      {
        user && 
          <View>
            <UserInfo
              user={user}
              setLoading={setLoading}
              setLoadingText={setLoadingText}
            />
            <AccountOptions 
              user={user}
              toast={toast}
              setReloadUser={setReloadUser}
            />
          </View>
      }
      <Button
        title='SIGN OUT'
        buttonStyle={styles.btnSignOut}
        titleStyle={styles.btnSignOutText}
        type='outline'
        onPress={async () => {
          await signOut();
          router.navigate('restaurants');
        }}>
      </Button>
      <Toast ref={toast} position='center' opacity={0.9}></Toast>
      <Loading isVisible={loading} text={loadingText}></Loading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    minHeight: '100%',
    color: `${ORANGE_80}`,
  },
  btnSignOut: {
    marginTop: 20,
    backgroundColor: `#FFFFFF`,
    borderRadius: 20,
    marginHorizontal: 20,
    borderColor: `${ORANGE}`,
    borderWidth: 1,
  },
  btnSignOutText: {
    fontFamily: 'Poppins',
    color: `${ORANGE}`,
  }
});
