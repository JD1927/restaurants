import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBeRJP-59Cc07arxhhXQvNLgTpQ2qsc9RE',
  authDomain: 'restaurants-4805d.firebaseapp.com',
  projectId: 'restaurants-4805d',
  storageBucket: 'restaurants-4805d.appspot.com',
  messagingSenderId: '285114546042',
  appId: '1:285114546042:web:f03d9ac7c12658514148c3'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);