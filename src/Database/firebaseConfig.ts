import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {initializeApp} from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import auth from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfigMain = {
    apiKey: "AIzaSyA8p1Y4dNzN1nF5OMayqQgYIvDSdGjrhOA",
    authDomain: "gymdaten.firebaseapp.com",
    projectId: "gymdaten",
    storageBucket: "gymdaten.appspot.com",
    messagingSenderId: "1073894884333",
    appId: "1:1073894884333:web:41ecb82e9c06c62231dde4"
};

const firebaseMain = firebase.initializeApp(firebaseConfigMain)
const appMain = initializeApp(firebaseConfigMain);

const firestoreMain = firebaseMain.firestore()

const authMain = initializeAuth(appMain, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export {firebaseMain, authMain, appMain, firestoreMain, auth};
