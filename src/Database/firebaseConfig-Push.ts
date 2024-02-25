import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfigPush = {
    apiKey: "AIzaSyBqSkNwYKdnXp1DiErJdZRlbN62BI-1wmc",
    authDomain: "pushdaydaten.firebaseapp.com",
    projectId: "pushdaydaten",
    storageBucket: "pushdaydaten.appspot.com",
    messagingSenderId: "991307378219",
    appId: "1:991307378219:web:80c2bea58712c47adc446e",
    measurementId: "G-ZHQ0XC59DZ"
};

    const firebasePush = firebase.initializeApp(firebaseConfigPush, 'PushDB')

    const firestorePush = firebasePush.firestore()

export { firebasePush, firestorePush };
