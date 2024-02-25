import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {initializeApp} from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth   } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfigUser = {
    apiKey: "AIzaSyAGmvR6TbPhGoXUcknBn_ED_qW1Bmxi2u0",
    authDomain: "user-4b7aa.firebaseapp.com",
    projectId: "user-4b7aa",
    storageBucket: "user-4b7aa.appspot.com",
    messagingSenderId: "777490432178",
    appId: "1:777490432178:web:eb8b2dd783d9909cab09ab"
};

const config = {
    name: 'firebaseConfigUser',
};


const firebaseUser = firebase.initializeApp(firebaseConfigUser, 'firebaseConfigUser');

const firestoreUser = firebaseUser.firestore()
const appUser = initializeApp(firebaseConfigUser, 'firebaseConfigUser');

const authUser = initializeAuth(appUser,  {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export {firebaseUser, authUser, appUser, firestoreUser};
