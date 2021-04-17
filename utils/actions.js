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

export const signUpWithEmailAndPassword = async ({ email, password }) => {
  const result = { status: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.status = false;
    result.error = 'This email is already registered.';
  }
  return result;
};

export const signInWithEmailAndPassword = async ({ email, password }) => {
  const result = { status: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.status = false;
    result.error = 'Incorrect email or password.';
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
    const url = await firebase
      .storage()
      .ref(`${path}/${name}`)
      .getDownloadURL();
    result.status = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateProfile = async ({ data }) => {
  const result = { status: true, error: undefined, url: undefined };
  try {
    await firebase.auth().currentUser.updateProfile({ ...data });
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const refreshAuthentication = async (password) => {
  const result = { status: true, error: undefined };
  const user = getCurrentUser();
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  try {
    await user.reauthenticateWithCredential(credentials);
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const updateEmail = async (email) => {
  const result = { status: true, error: undefined };
  try {
    await firebase.auth().currentUser.updateEmail(email);
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const updatePassword = async (password) => {
  const result = { status: true, error: undefined };
  try {
    await firebase.auth().currentUser.updatePassword(password);
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const addDocumentWithoutID = async ({ collection, data }) => {
  const result = { status: true, error: undefined };
  try {
    await db.collection(collection).add(data);
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const getRestaurantsByLimit = async (restaurantLimit) => {
  const result = {
    status: true,
    error: undefined,
    restaurants: [],
    startRestaurant: undefined,
  };
  try {
    const response = await db
      .collection('restaurants')
      .orderBy('createdAt', 'desc')
      .limit(restaurantLimit)
      .get();

    if (response.docs.length > 0) {
      result.startRestaurant = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const restaurant = doc.data();
      restaurant.id = doc.id;
      result.restaurants.push(restaurant);
    });
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const getMoreRestaurantsByLimit = async (restaurantLimit, startRestaurant) => {
  const result = {
    status: true,
    error: undefined,
    restaurants: [],
    startRestaurant: undefined,
  };
  try {
    const response = await db
      .collection('restaurants')
      .orderBy('createdAt', 'desc')
      .startAfter(startRestaurant.data().createdAt)
      .limit(restaurantLimit)
      .get();

    if (response.docs.length > 0) {
      result.startRestaurant = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const restaurant = doc.data();
      restaurant.id = doc.id;
      result.restaurants.push(restaurant);
    });
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const getDocumentByID = async (collection, id) => {
  const result = { status: true, error: undefined, doc: undefined };
  try {
    const response = await db.collection(collection).doc(id).get();
    result.doc = response.data();
    result.doc.id = response.id;
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};
export const updateDocument = async (collection, id, data) => {
  const result = { status: true, error: undefined };
  try {
    await db.collection(collection).doc(id).update(data);
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};

export const getRestaurantReviews = async (id) => {
  const result = {
    status: true,
    error: undefined,
    reviews: [],
  };
  try {
    const response = await db
      .collection('reviews')
      // .orderBy('createdAt', 'desc')
      .where('restaurantID', '==', id)
      .get();

    response.forEach((doc) => {
      const review = doc.data();
      review.id = doc.id;
      result.reviews.push(review);
    });
  } catch (error) {
    result.status = false;
    result.error = error;
  }
  return result;
};