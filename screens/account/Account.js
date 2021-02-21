import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import { getCurrentUser } from './../../utils/actions';
import Loading from './../../components/Loading';


export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setLogin(user ? true : false);
  }, []);

  if (login == null) {
    return <Loading isVisible={true} text='Loading...'></Loading>
  }

  return login ? <UserLogged></UserLogged> : <UserGuest></UserGuest>;
};

const styles = StyleSheet.create({});
