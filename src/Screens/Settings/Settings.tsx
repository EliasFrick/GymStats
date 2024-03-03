import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Modal,
  TextInput,
} from "react-native";
import CustomButton from "../../CustomComponents/ChooseTrainDay";
import { authMain, firebaseMain } from "../../Database/firebaseConfig";
import { useMyLoginContext } from "../../Provider/LoginProvider";
import { firebaseUser } from "../../Database/firebaseConfig-User";
import {
  firebasePull,
  firestorePull,
} from "../../Database/firebaseConfig-Pull";
import firebase from "firebase/compat/app";
import { TrainWeightSaver } from "../../Class/SaveTrainData";
import ToastMessage from "../../Functions/ToastMessage";
import { firestorePush } from "../../Database/firebaseConfig-Push";
import { firestoreLeg } from "../../Database/firebaseConfig-Leg";

const Settings = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();
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
      { kg: "", wdh: "" },
      { kg: "", wdh: "" },
      { kg: "", wdh: "" },
      { kg: "", wdh: "" },
    ],
    timestampField: firebase.firestore.FieldValue.serverTimestamp(),
  });
  const todoRefForUser = firebasePull.firestore().collection(username);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSearchForFriendModalVisible, setSearchForFriendModalVisible] =
    useState(false);
  const [nameOfFriend, setNameOfFriend] = useState<any>();

  const handleSignOut = () => {
    authMain
      .signOut()
      .then(() => {
        console.log("Abmeldung erfolgreich");
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error("Fehler beim Abmelden:", error);
      });
  };

  const deleteCollections = async () => {
    const qryPush: firebase.firestore.QuerySnapshot = await firestorePush
      .collection(username)
      .get();
    console.log(JSON.stringify(qryPush));
    const qryPull: firebase.firestore.QuerySnapshot = await firestorePull
      .collection(username)
      .get();
    console.log(JSON.stringify(qryPull));
    const qryLeg: firebase.firestore.QuerySnapshot = await firestoreLeg
      .collection(username)
      .get();
    console.log(JSON.stringify(qryLeg));

    let i = 0;
    qryPush.forEach(async (doc) => {
      console.log("Start delete");
      await doc.ref.delete();
      console.log("Finish delete");
    });

    i = 0;
    qryPull.forEach((doc) => {
      console.log(i + ": " + JSON.stringify(doc));
      i++;
      doc.ref.delete();
    });

    i = 0;
    qryLeg.forEach((doc) => {
      console.log(i + ": " + JSON.stringify(doc));
      i++;
      doc.ref.delete();
    });
  };

  const showModalWindowForDeleteAccount = () => {
    setModalVisible(true);
  };

  const deleteAccount = () => {
    const user = firebaseMain.auth().currentUser;
    if (user) {
      const userID = firebaseMain.auth().currentUser?.uid;
      try {
        console.log(user);
        user
          .delete()
          .then(async () => {
            console.log("username: " + username);

            const userDB = firebaseUser
              .firestore()
              .collection("User")
              .doc(userID);
            console.log("userDB: " + userDB);

            await deleteCollections();

            await userDB.delete();

            setLoggedIn(false);
            console.log("Account gelöscht");
            ToastMessage("Account gelöscht");
          })
          .catch((error) => {
            // An error occurred
            ToastMessage("Fehler beim löschen: " + error);
          });
      } catch (error) {
        console.log("Fehler: " + error);
      }
    }
  };

  const addFriends = () => {
    setSearchForFriendModalVisible(true);
  };

  const cancelDeleteAccount = () => {
    console.log(isModalVisible);
    setModalVisible(false);
  };

  const cancelSearchForFriends = () => {
    setSearchForFriendModalVisible(false);
  };

  const searchForFriend = () => {
    getAllUsernames();

    const lowerCaseNameOfFriend = nameOfFriend.toLowerCase();
    const foundFriend = allUsernames
      .flat()
      .find(
        (username: string) => username.toLowerCase() === lowerCaseNameOfFriend
      );

    if (foundFriend) {
      // Der Freund wurde gefunden
      ToastMessage("Freund gefunden:" + nameOfFriend);
    } else {
      // Der Freund wurde nicht gefunden
      ToastMessage("Freund nicht gefunden:" + nameOfFriend);
    }

    cancelSearchForFriends();
  };

  const checkForFriend = (username: any) => {};

  const allUsernames: any[][] = [];

  const getAllUsernames = async () => {
    const querySnapshot = await firebaseUser
      .firestore()
      .collection("User")
      .orderBy("timestampField", "asc")
      .get();
    const tempDoc = querySnapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });

    for (let i = 0; i < tempDoc.length; i++) {
      allUsernames[i] = [];
    }

    for (let i = 0; i < tempDoc.length; i++) {
      allUsernames[i] = tempDoc[i].username;
    }

    console.log("All User: " + allUsernames);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { fontSize: fontScale * 30 }]}>
          Einstellungen
        </Text>
      </View>
      <View
        style={[
          styles.buttonContainer,
          { height: height * 0.1, width: width * 0.7 },
        ]}
      >
        <CustomButton title={"Freunde Hinzufügen"} onPress={addFriends} />
        <CustomButton title={"Abmelden"} onPress={handleSignOut} />
        <CustomButton
          title={"Account Löschen"}
          onPress={showModalWindowForDeleteAccount}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={[styles.modalText, { fontSize: fontScale * 30 }]}>
            Bist du dir sicher das du den Account Löschen möchtest
          </Text>
          <View
            style={[
              {
                height: height * 0.08,
                width: width * 0.8,
                marginTop: height * 0.14,
              },
            ]}
          >
            <CustomButton title="Account Löschen" onPress={deleteAccount} />
            <CustomButton title="Abbrechen" onPress={cancelDeleteAccount} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSearchForFriendModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={[styles.modalText, { fontSize: fontScale * 30 }]}>
            Freund hinzufügen
          </Text>
          <TextInput
            style={[
              styles.input,
              { width: width * 0.6, height: height * 0.04 },
            ]}
            placeholder={"Username eingeben"}
            onChangeText={(text) => setNameOfFriend(text)}
            value={nameOfFriend}
            keyboardType="numeric"
          />
          <View
            style={[
              {
                height: height * 0.08,
                width: width * 0.8,
                marginTop: height * 0.14,
              },
            ]}
          >
            <CustomButton title="Suchen" onPress={searchForFriend} />
            <CustomButton title="Abbrechen" onPress={cancelSearchForFriends} />
          </View>
        </View>
      </Modal>
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
    color: "white",
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalText: {
    color: "white",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    backgroundColor: "#2d3b55",
    color: "white",
    marginTop: "5%",
  },
});
