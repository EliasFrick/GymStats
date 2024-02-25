import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {firebaseUser} from "./firebaseConfig-User";

const firebaseConfigPull = {
    apiKey: "AIzaSyD4dY8JxQvJwnMtvIBhJPy1bVWk10lL8-s",
    authDomain: "pulldaydaten.firebaseapp.com",
    projectId: "pulldaydaten",
    storageBucket: "pulldaydaten.appspot.com",
    messagingSenderId: "690292248610",
    appId: "1:690292248610:web:14934bff329876a1fc7a7b",
    measurementId: "G-3QGTYRSR3Q"
};

    const firebasePull = firebase.initializeApp(firebaseConfigPull, 'PullDB')

    const firestorePull = firebasePull.firestore()


export { firebasePull, firestorePull };
