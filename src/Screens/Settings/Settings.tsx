import React, {useState} from "react";
import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import CustomButton from "../../CustomComponents/ChooseTrainDay";
import {authMain, firebaseMain} from "../../Database/firebaseConfig";
import {useMyLoginContext} from "../../Provider/LoginProvider";
import {firebaseUser} from "../../Database/firebaseConfig-User";
import {firebasePull, firestorePull} from "../../Database/firebaseConfig-Pull";
import firebase from "firebase/compat/app";
import {TrainWeightSaver} from "../../Class/SaveTrainData";
import ToastMessage from "../../Functions/ToastMessage";
import {firestorePush} from "../../Database/firebaseConfig-Push";
import {firestoreLeg} from "../../Database/firebaseConfig-Leg";


const Settings = () => {
    const {height, width, scale, fontScale} = useWindowDimensions();
    const {
        loggedIn,
        email,
        age,
        username,
        setLoggedIn,
        setAge,
        setUsername,
        setEmail,
    } = useMyLoginContext();
    const [exerciseData, setExerciseData] = useState({
        exercise: "",
        time: "",
        data: [
            {kg: "", wdh: ""},
            {kg: "", wdh: ""},
            {kg: "", wdh: ""},
            {kg: "", wdh: ""},
        ],
        timestampField: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const todoRefForUser = firebasePull.firestore().collection(username);

    const handleSignOut = () => {
        authMain.signOut().then(() => {
            console.log('Abmeldung erfolgreich');
            setLoggedIn(false)
        })
            .catch((error) => {
                console.error('Fehler beim Abmelden:', error);
            });
    };

    const deleteCollections = async () => {
        const qryPush: firebase.firestore.QuerySnapshot = await firestorePush.collection(username).get();
        console.log(JSON.stringify(qryPush))
        const qryPull: firebase.firestore.QuerySnapshot = await firestorePull.collection(username).get();
        console.log(JSON.stringify(qryPull))
        const qryLeg: firebase.firestore.QuerySnapshot = await firestoreLeg.collection(username).get();
        console.log(JSON.stringify(qryLeg))

        let i = 0
        qryPush.forEach(async doc => {
            console.log("Start delete")
            await doc.ref.delete();
            console.log("Finish delete")
        });

        i = 0
        qryPull.forEach(doc => {
            console.log(i + ": " + JSON.stringify(doc))
            i++
            doc.ref.delete();
        });

        i = 0
        qryLeg.forEach(doc => {
            console.log(i + ": " + JSON.stringify(doc))
            i++
            doc.ref.delete();
        });
    }

    const deleteAccount = () => {
        const user = firebaseMain.auth().currentUser;
        if (user) {
            const userID = firebaseMain.auth().currentUser?.uid;
            try {
                console.log(user)
                user
                    .delete()
                    .then(async () => {
                        console.log("username: " + username)

                        const userDB = firebaseUser.firestore().collection("User").doc(userID);
                        console.log("userDB: " + userDB)

                        await deleteCollections()

                        await userDB.delete();

                        setLoggedIn(false)
                        console.log("Account gelöscht")
                        ToastMessage("Account gelöscht")
                    }).catch((error) => {
                    // An error occurred
                    ToastMessage("Fehler beim löschen: " + error)
                });
            } catch (error) {
                console.log("Fehler: " + error)
            }

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, {fontSize: fontScale * 30}]}>Einstellungen</Text>
            </View>
            <View
                style={[
                    styles.buttonContainer,
                    {height: height * 0.1, width: width * 0.7},
                ]}
            >
                <CustomButton title={"Abmelden"} onPress={handleSignOut}/>
                <CustomButton title={"Account Löschen"} onPress={deleteAccount}/>
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b3340",
        padding: 15,
    },
    titleContainer: {},
    title: {
        color: 'white'
    },
    buttonContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25%",
    },
})
