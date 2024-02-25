import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfigLeg = {
    apiKey: "AIzaSyCx6vB8CJmUTWxwGEGVxUps6MepFcRY0s8",
    authDomain: "legdaydaten.firebaseapp.com",
    projectId: "legdaydaten",
    storageBucket: "legdaydaten.appspot.com",
    messagingSenderId: "240226788398",
    appId: "1:240226788398:web:dcc0d1c6708e034a986bbf"
};

    const firebaseLeg = firebase.initializeApp(firebaseConfigLeg, 'LegDB')

    const firestoreLeg = firebaseLeg.firestore()


export { firebaseLeg, firestoreLeg };
