import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Loading from './../../components/Loading';
import { isUserLogged, getCurrentUser } from './../../utils/actions';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import { useFocusEffect } from '@react-navigation/native';



export default function Account() {
  const [login, setLogin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const user = getCurrentUser();
      setLogin(user ? true : false);
    }, [])
  );


  if (login === null) {
    return <Loading isVisible={true} text='Loading...'></Loading>
  }

  return login ? <UserLogged></UserLogged> : <UserGuest></UserGuest>;
};

const styles = StyleSheet.create({});
