import Sidebar from "../src/Navigation/Sidebar";
import {useMyLoginContext} from './Provider/LoginProvider'
import {LoginPage} from "./Navigation/ChooseStackScreen";
import {useEffect, useLayoutEffect, useState} from "react";
import {firebaseMain} from "./Database/firebaseConfig";
import {firebaseUser} from "./Database/firebaseConfig-User";
import {useWindowDimensions} from "react-native";
import LoadingScreen from "../src/CheckLogin/LoadingScreen";


export default function CheckLogin() {
    const {loggedIn, email, age, username, setLoggedIn, setAge, setUsername, setEmail} = useMyLoginContext();
    const {height, width, scale, fontScale} = useWindowDimensions();
    const [checkedLogin, setCheckedLogin] = useState(false);
    const [loading, setLoading] = useState(true); // Zustandsvariable für Ladezustand hinzugefügt

    useEffect(() => {
        firebaseMain.auth().onAuthStateChanged(function (user) {
            if (user) {
                setLoggedIn(true);
                getUsername();
            }
            setCheckedLogin(true);
            setLoading(false); // Setzen Sie loading auf false, wenn der useEffect abgeschlossen ist
        });
    }, []); // Leeres Array als Abhängigkeit, um sicherzustellen, dass der useEffect nur einmalig ausgeführt wird

    const getUsername = async () => {
        const userID = firebaseMain.auth().currentUser?.uid;

        const assistance = firebaseUser.firestore().collection("User");
        const querySnapshot = await assistance
            .orderBy("timestampField", "asc")
            .get();
        const tempDoc = querySnapshot.docs.map((doc: any) => {
            return { id: doc.id, ...doc.data() };
        });

        for (let i = 0; i < tempDoc.length; i++) {
            if (tempDoc[i].userID === userID) {
                setUsername(tempDoc[i].username);
            }
        }
    };

    if (loading) {
        return <LoadingScreen />;
    } else if (loggedIn) {
        return <Sidebar />;
    } else {
        return <LoginPage />;
    }
}
