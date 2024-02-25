import React from "react";
import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import CustomButton from "../../CustomComponents/ChooseTrainDay";
import {authMain, firebaseMain} from "../../Database/firebaseConfig";
import {useMyLoginContext} from "../../Provider/LoginProvider";
import {firebaseUser} from "../../Database/firebaseConfig-User";
import {firebasePush} from "../../Database/firebaseConfig-Push";
import {firebasePull} from "../../Database/firebaseConfig-Pull";
import {firebaseLeg} from "../../Database/firebaseConfig-Leg";
import firebase from "firebase/compat/app";


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

    const handleSignOut = () => {
        authMain.signOut().then(() => {
            console.log('Abmeldung erfolgreich');
            setLoggedIn(false)
        })
            .catch((error) => {
                console.error('Fehler beim Abmelden:', error);
            });
    };

    const deleteCollection = async (collectionPath: string) => {
        try {
            const collectionRef = firebasePush.firestore().collection(collectionPath);
            const querySnapshot = await collectionRef.get();

            querySnapshot.forEach((documentSnapshot) => {
                documentSnapshot.ref.delete();
            });

            console.log('Alle Dokumente in der Sammlung gelöscht.');

            // Jetzt löschen wir die Sammlung selbst
            await firebasePush.firestore().collection(collectionPath).parent.doc(collectionRef.id).delete();
            console.log('Die Sammlung wurde gelöscht.');
        } catch (error) {
            console.error('Fehler beim Löschen der Sammlung:', error);
        }
    }


    const deleteAllAccountDBInformations = async (collection: firebase.firestore.CollectionReference, dataBaseName: string) => {
        collection.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
    }

    const deleteAccount = () => {
        const user = firebaseMain.auth().currentUser;
        if (user) {
            const userID = firebaseMain.auth().currentUser?.uid;

            try {
                user.delete().then(async () => {

                    console.log("UID: " + userID)
                    console.log("username: " + username)
                    const userDB = firebaseUser.firestore().collection("User").doc(userID);
                    firebasePush.firestore().collection(username).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            doc.ref.delete();
                        });
                    });
                    const pullDB = firebasePull.firestore().collection(username);
                    const legDB = firebaseLeg.firestore().collection(username);

                    console.log("try PushDB Löschen")
                    // await deleteAllAccountDBInformations(pushDB, "Push")
                    console.log("PushDB gelöscht")
                    console.log("Try PullDB löschen")
                    await deleteAllAccountDBInformations(pullDB, "Pull")
                    console.log("Pull gelöscht")
                    console.log("try Leg Löschen")
                    await deleteAllAccountDBInformations(legDB, "Leg")
                    console.log("LegDB gelöscht")

                    await userDB.delete();

                    setLoggedIn(false)
                    console.log("Account gelöscht")
                }).catch((error) => {
                    // An error occurred
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
