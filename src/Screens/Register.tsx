import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import CustomButton from "../CustomComponents/ChooseTrainDay";
import React, { useEffect, useState } from "react";
import { moderateScale } from "react-native-size-matters";
import { authMain } from "../Database/firebaseConfig";
import { firebaseUser, firestoreUser } from "../Database/firebaseConfig-User";
import { firebasePull, firestorePull } from "../Database/firebaseConfig-Pull";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginPage } from "../Types/StackScreens";
import ToastMessage from "../Functions/ToastMessage";
import firebase from "firebase/compat";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useMyLoginContext } from "../Provider/LoginProvider";
import { firebasePush, firestorePush } from "../Database/firebaseConfig-Push";
import { firebaseLeg, firestoreLeg } from "../Database/firebaseConfig-Leg";
import { firestoreMain } from "../Database/firebaseConfig";
import Exercises from "../Json/Exercises.json";

type SignIn = StackNavigationProp<LoginPage, "LoginPage">;

type Props = {
  navigation: SignIn;
};

const Register: React.FC<Props> = ({ navigation }) => {
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
  const { height, width, scale, fontScale } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerAge, setRegisterAge] = useState<string>("");
  const [registerUsername, setRegisterUsername] = useState<string>("user");
  const [registerFirstname, setRegisterFirstname] = useState<string>("");
  const [registerLastname, setRegisterLastname] = useState<string>("");
  const todoRefForUser = firebaseUser.firestore().collection("User");
  const todoRefForPushUser = firebasePush
    .firestore()
    .collection(registerUsername);
  const todoRefForPullUser = firebasePull
    .firestore()
    .collection(registerUsername);
  const todoRefForLegUser = firebaseLeg
    .firestore()
    .collection(registerUsername);
  const [currentTimeStamp, setCurrentTimeStamp] = useState<any>();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(
    null
  );

  const createAccount = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      registerUsername === "" ||
      registerEmail === "" ||
      password === "" ||
      registerFirstname === "" ||
      registerLastname === ""
    ) {
      ToastMessage("Es muss alles ausgefüllt sein");
    } else {
      if (await checkUsername(registerUsername)) {
        if (password.length < 6) {
          ToastMessage("Das Passwort muss mehr als 6 Zeichen haben");
        } else {
          if (emailRegex.test(registerEmail)) {
            try {
              const userCredential = await createUserWithEmailAndPassword(
                authMain,
                registerEmail,
                password
              );
              await safeUserInformations(userCredential.user.uid);
              createAccountForAllDatabase();
              ToastMessage("Account erstellt");
              navigateToLogin();
            } catch (e) {
              console.log(e);
              ToastMessage("Fehler bei der erstellung");
            }
          } else {
            ToastMessage("ungültige Email");
          }
        }
      } else {
        ToastMessage("Der Benutzername ist bereits vergeben");
      }
    }
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const date = `${currentDay}:${currentMonth}:${currentYear}`;

  const safeUserInformations = async (userID: string) => {
    const data = {
      firstname: registerFirstname,
      lastname: registerLastname,
      username: registerUsername,
      email: registerEmail,
      birthdate: selectedDate,
      userID: userID,
      time: date,
      timestampField: firebase.firestore.FieldValue.serverTimestamp(),
    };
    setCurrentTimeStamp(data.timestampField);
    // Wait for the userID to be updated before proceeding
    // await todoRefForUser.add(data);
    await todoRefForUser.doc(userID).set(data);

    Keyboard.dismiss;
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChangeDate = (
    type: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    console.log(type);
    if (type.type === "set") {
      const currentDate = selectedDate;
      console.log("set: " + currentDate);
      setSelectedDate(currentDate);
      // setShowDatePicker(false)
    } else if (type.type === "neutralButtonPressed") {
      console.log("dismissed");
    } else {
      toggleDatePicker();
      console.log("Fehler");
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("LoginPage");
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  let tempDoc: any;

  const getAllRegisteredUser = async () => {
    const assistance = todoRefForUser;
    const querySnapshot = await assistance
      .orderBy("timestampField", "asc")
      .get();
    tempDoc = querySnapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
  };

  const checkUsername = async (username: string): Promise<boolean> => {
    const querySnapshot = await todoRefForUser
      .orderBy("timestampField", "asc")
      .get();
    tempDoc = querySnapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });

    for (let i = 0; i < tempDoc.length; i++) {
      if (username === tempDoc[i].username) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    getAllRegisteredUser();
  }, []);

  async function createAccountForAllDatabase() {
    try {
      // Pfad zur Sammlung
      const collectionPath = registerUsername;

      // Daten, die Sie in die Sammlung einfügen möchten
      const dataForPush = {
        document1: { field1: "value1", field2: "value2" },
        document2: { field1: "value3", field2: "value4" },
        // Fügen Sie weitere Dokumente hinzu, falls gewünscht
      };
      //await firestorePull.collection(collectionPath).add(dataForPush);
      //await firestorePush.collection(collectionPath).add(dataForPush);
      //await firestoreLeg.collection(collectionPath).add(dataForPush);
      //await firestoreMain.collection(collectionPath).add(dataForPush);

      createExercisesForAccount();

      console.log("Sammlung erfolgreich erstellt!");
    } catch (error) {
      console.error("Fehler beim Erstellen der Sammlung:", error);
    }
  }

  const createExercisesForAccount = async () => {
    // Definiere ein leeres Objekt, das später erweitert wird
    let document1: { [key: string]: string } = {};

    // Definiere die Felder und ihre Werte
    const fieldsAndValues: { [key: string]: string } = {
      field1: "value12",
      field2: "value2",
    };

    //create all documents for Push Exercises
    for (let i = 0; i < Exercises.Push[0].Exercises.length; i++) {
      await todoRefForPushUser
        .doc(Exercises.Push[0].Exercises[i])
        .set(fieldsAndValues);
    }

    //create all documents for Pull Exercises
    for (let i = 0; i < Exercises.Pull[0].Exercises.length; i++) {
      await todoRefForPullUser
        .doc(Exercises.Pull[0].Exercises[i])
        .set(fieldsAndValues);
    }

    //create all documents for Leg Exercises
    for (let i = 0; i < Exercises.Leg[0].Exercises.length; i++) {
      await todoRefForLegUser
        .doc(Exercises.Leg[0].Exercises[i])
        .set(fieldsAndValues);
    }
  };

  return (
    <KeyboardAvoidingView
      // @ts-ignore
      behavior={"behaviour"}
      style={styles.container}
    >
      <View style={styles.BackGroundCanvas}>
        <View
          style={[styles.contentContainer, { marginBottom: height * 0.001 }]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode={"tail"}>
              Registrieren
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.echteNamenInputContainer}>
              <TextInput
                style={[
                  styles.usernameInput,
                  {
                    height: height * 0.04,
                    width: width * 0.33,
                    // marginTop: height * 0.08,
                    // marginRight: 0.1,
                    marginRight: width * 0.04,
                    color: "white",
                  },
                ]}
                placeholder={"Vorname"}
                placeholderTextColor={"white"}
                onChangeText={(text) => setRegisterFirstname(text)}
              />
              <TextInput
                style={[
                  styles.usernameInput,
                  {
                    height: height * 0.04,
                    width: width * 0.33,
                    // marginTop: '5%',
                    color: "white",
                  },
                ]}
                placeholder={"Nachname"}
                placeholderTextColor={"white"}
                onChangeText={(text) => setRegisterLastname(text)}
              />
            </View>
            <TextInput
              style={[
                styles.usernameInput,
                {
                  height: height * 0.04,
                  width: width * 0.7,
                  marginTop: "5%",
                  color: "white",
                },
              ]}
              placeholder={"Benutzernamen"}
              placeholderTextColor={"white"}
              onChangeText={(text) => setRegisterUsername(text)}
            />
            {showDatePicker && (
              <View style={styles.datePicker}>
                <RNDateTimePicker
                  mode={"date"}
                  display={"spinner"}
                  value={dateOfBirth}
                  onChange={(event, selectedDatePicked) =>
                    onChangeDate(event, selectedDatePicked)
                  }
                />
              </View>
            )}
            <Pressable
              onPress={toggleDatePicker}
              style={[
                styles.ageContainer,
                {
                  height: height * 0.04,
                  width: width * 0.7,
                  marginTop: "5%",
                },
              ]}
            >
              <Text style={styles.ageLabel}>
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "Geburtsdatum auswählen"}
              </Text>
            </Pressable>
            <TextInput
              style={[
                styles.usernameInput,
                {
                  height: height * 0.04,
                  width: width * 0.7,
                  marginTop: "5%",
                  color: "white",
                },
              ]}
              placeholder={"Email"}
              placeholderTextColor={"white"}
              onChangeText={(text) => setRegisterEmail(text)}
            />
            <TextInput
              style={[
                styles.passwordInput,
                {
                  height: height * 0.04,
                  width: width * 0.7,
                  color: "white",
                },
              ]}
              secureTextEntry={showPassword}
              placeholder={"Passwort"}
              placeholderTextColor={"white"}
              onChangeText={(text) => setPassword(text)}
            >
              {/*<Icon name={'eye'} size={22}/>*/}
            </TextInput>
          </View>
          {!showDatePicker && (
            <View
              style={[
                styles.buttonContainer,
                { height: height * 0.1, width: width * 0.7 },
              ]}
            >
              <CustomButton title={"Registrieren"} onPress={createAccount} />
              <CustomButton
                title={"Zurück zu Login"}
                onPress={navigateToLogin}
              />
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2b3340",
  },
  BackGroundCanvas: {
    flex: 1,
    backgroundColor: "#2d3b55",
    padding: 20,
    borderRadius: 40,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25%",
  },
  title: {
    flex: 1,
    fontSize: moderateScale(30),
    color: "white",
  },
  titleContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  usernameInput: {
    borderWidth: 1.2,
    justifyContent: "center",
  },
  passwordInput: {
    borderWidth: 1.2,
    marginTop: "5%",
  },
  inputContainer: {
    // marginTop: '20%'
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {},
  test: {
    backgroundColor: "green",
  },
  ageContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: "center",
    marginTop: "5%",
    borderWidth: 1.2,
  },
  ageLabel: {
    marginRight: "5%",
    color: "white",
  },
  echteNamenInputContainer: {
    flexDirection: "row",
    // position: 'relative'
  },
});
