import { firebaseApp } from './firebase.conf';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { fileToBlob } from './helpers';

export const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
  let isLogged = false;
  firebase.auth().onAuthStateChanged((user) => {
    user && (isLogged = true);
  });
  return isLogged;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const signUpWithEmailAndPassword = async ({email, password}) => {
  const result = { status: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.status = false;
    result.error = 'This email is already registered.'
  }
  return result;
};

export const signInWithEmailAndPassword = async ({email, password}) => {
  const result = { status: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.status = false;
    result.error = 'Incorrect email or password.'
  }
  return result;
};

export const signOut = async () => {
  await firebase.auth().signOut();
};

export const uploadImage = async ({ image, path, name }) => {
  const result = { status: false, error: undefined, url: undefined };
  const ref = firebase.storage().ref(path).child(name);
  const blob = await fileToBlob(image);

  try {
    await ref.put(blob);
    const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL();
    result.status = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateProfilePicture = async ({ data }) => {
  const result = { status: true, error: undefined, url: undefined };
  try {
    await firebase.auth().currentUser.updateProfile({ ...data});
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};