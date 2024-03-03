import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import ChooseExerciseCards from "../../../../CustomComponents/ChooseExerciseCard";
import BenchpressImage from "../../../../assets/Bankdrücken.png";
import ChestPress from "../../../../assets/Brustpresse.png";
import ChestPressSide from "../../../../assets/SchraegbankLanghantel.png";
import Dips from "../../../../assets/Dips.png";
import MilitaryPress from "../../../../assets/MilitaryPress.png";
import ShoulderPress from "../../../../assets/ShoulderPressKurzhantel.png";
import Seitheben from "../../../../assets/Seitheben.png";
import Inclinebenchpress from "../../../../assets/SchraegbankdrückenKurzhantel.png";
import FlysOben from "../../../../assets/FlysVonOben.png";
import FlysUnten from "../../../../assets/FlysUnten.png";
import TricepsDrücken from "../../../../assets/TricpesDrücken.png";
import TricepsOverHead from "../../../../assets/TricepsOverHead.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChooseInput } from "../../../../Types/StackScreens";
import MyLineChart from "../../../../Components/LineChartTraining";
import CustomButton from "../../../../CustomComponents/ChooseTrainDay";
import { ExerciseState } from "../../../../Types/Interface";
import { initialState } from "../../../../Types/States";
import { firebaseMain } from "../../../../Database/firebaseConfig";
import NetInfo from "@react-native-community/netinfo";
import firebase from "firebase/compat/app";
import ToastMessage from "../../../../Functions/ToastMessage";
import { firebasePush } from "../../../../Database/firebaseConfig-Push";
import { useMyLoginContext } from "../../../../Provider/LoginProvider";
import { TrainWeightSaver } from "../../../../Class/SaveTrainData";

type ChooseBlogScreen = StackNavigationProp<ChooseInput, "ChooseInputScreen">;

type Props = {
  navigation: ChooseBlogScreen;
};

const Push: React.FC<Props> = ({ navigation }) => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  // const initialState: ExerciseState = { /* Initialer Zustand */ };
  const [exercises, setExercises] = useState<ExerciseState>(initialState);
  const [currentActive, setCurrentActive] = useState<
    keyof ExerciseState | undefined
  >();
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState("");
  const [checkConnection, setCheckConnection] = useState(false);
  const [exerciseData, setExerciseData] = useState({
    exercise: "",
    time: "",
    data: [
      { kg: "", wdh: "" },
      { kg: "", wdh: "" },
      { kg: "", wdh: "" },
      { kg: "", wdh: "" },
    ], // Initialize with your default values
    timestampField: firebase.firestore.FieldValue.serverTimestamp(),
  });
  const [currentTimeStamp, setCurrentTimeStamp] = useState<any>();
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
  const todoRefForUser = firebasePush.firestore().collection(username);
  // const fetchTodoRefForUser = firebasePush.firestore().collection(username).doc(currentExercise).collection(currentExercise);
  const [benchPressWeightData, setBenchPressWightData] = useState<any>([0]);
  const [chestPressWeightData, setChestPressWightData] = useState<any>([0]);
  const [inclineBarbellWeightData, setInclineBarbellWightData] = useState<any>([
    0,
  ]);
  const [inclineDumbbellWeightData, setInclineDumbbellWightData] =
    useState<any>([0]);
  const [flysObenWeightData, setFlysObenWightData] = useState<any>([0]);
  const [flysUntenWeightData, setFlysUntenWightData] = useState<any>([0]);
  const [dipsWeightData, setDipsWightData] = useState<any>([0]);
  const [militaryPressWeightData, setMilitaryPressWightData] = useState<any>([
    0,
  ]);
  const [shoulderPressWeightData, setShoulderPressWightData] = useState<any>([
    0,
  ]);
  const [sideRaiseWeightData, setSideRaiseWightData] = useState<any>([0]);
  const [tricepsPushWeightData, setTricepsPushWightData] = useState<any>([0]);
  const [katanaExtensionsWeightData, setKatanaExtensionsWightData] =
    useState<any>([0]);
  const [tricepsOverHeadWeightData, setTricepsOverHeadWightData] =
    useState<any>([0]);

  const addSet = (currentExercise: string) => {
    setModalVisible(true);
    setCurrentExercise(currentExercise);
  };

  const clearExerciseData = () => {
    setExerciseData({
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
  };

  const checkInternetConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        setCheckConnection(true);
      } else if (state.isConnected == false) {
        setCheckConnection(false);
      }
    });
  };

  const handleKgInput = (text: string, currentSet: number) => {
    const updatedData = [...exerciseData.data]; // Erzeugt eine Kopie des bestehenden Arrays
    updatedData[currentSet].kg = text;
    setExerciseData({
      ...exerciseData,
      data: updatedData,
    });
  };

  const handleWdhInput = (text: string, currentSet: number) => {
    const updatedData = [...exerciseData.data]; // Erzeugt eine Kopie des bestehenden Arrays
    updatedData[currentSet].wdh = text;
    setExerciseData({
      ...exerciseData,
      data: updatedData,
    });
  };

  const toggleExercise = (exercise: keyof ExerciseState) => {
    getDataForChart(exercise);
    if (currentActive === exercise) {
      setExercises(initialState);
      setCurrentActive("Platzhalter");
    } else {
      setExercises(initialState); // Setze alle auf false
      setExercises((prevExercises) => ({
        ...prevExercises,
        [exercise]: true,
      }));
      setCurrentActive(exercise);
    }
  };

  useEffect(() => {
    const userID = firebaseMain.auth().currentUser?.uid;
    //getDataForChart("benchPressActive");
    checkInternetConnection();
  }, []);

  const navigateToPushInput = () => {
    navigation.navigate("PushInput");
  };

  const getDataKg: any[][] = [];
  const getDataWdh: any[][] = [];
  const getexercise: any[] = [];
  let date: any = 0;

  const getExerciseNameForDatabase = (exerciseActiveName: string): string => {
    switch (exerciseActiveName) {
      case "benchPressActive":
        return "Bankdrücken";
      case "chestActive":
        return "Brustpresse";
      case "inclineBarbellActive":
        return "Schrägbankdrücken Langhantel";
      case "inclineDumbbellActive":
        return "Schrägbankdrücken Kurzhantel";
      case "flysObenActive":
        return "Flys von oben";
      case "flysUntenActive":
        return "Flys von unten";
      case "dipsActive":
        return "Dips";
      case "militaryPressActive":
        return "Military Press";
      case "shoulderPressActive":
        return "Schulterpresse";
      case "sideRaiseActive":
        return "Seitheben";
      case "tricepsPushActive":
        return "Trizeps strecken";
      case "katanaExtensionsActive":
        return "katanaExtensions";
      case "TricepsOverHeadActive":
        return "Trizeps über Kopf";
    }
    return "";
  };

  const getDataForChart = async (currentExercise: string) => {
    const querySnapshot = await firebasePush
      .firestore()
      .collection(username)
      .doc(getExerciseNameForDatabase(currentExercise))
      .collection(getExerciseNameForDatabase(currentExercise))
      .orderBy("timestampField", "asc")
      .get();
    const tempDoc = querySnapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });

    for (let i = 0; i < tempDoc.length; i++) {
      getDataKg[i] = [];
      getDataWdh[i] = [];
      getexercise[i] = [];
    }

    for (let x = 0; x < Number(JSON.stringify(tempDoc.length)); x++) {
      for (let y = 0; y < Number(JSON.stringify(tempDoc[x].data.length)); y++) {
        getDataKg[x][y] = tempDoc[x].data[y].kg;
        getDataWdh[x][y] = tempDoc[x].data[y].wdh;
        date = tempDoc[x].time;
      }
    }
    checkDataForChart(getDataKg, getDataWdh, currentExercise);
  };

  const checkDataForChart = (
    dataKg: any[][],
    dataWdh: any[][],
    currentExercise: any
  ) => {
    const finalData: any = [];
    const dataForChart: any = [];
    let counter = 0;

    //Replace Komma mit Punkt
    for (let fullDays = 0; fullDays < dataKg.length; fullDays++) {
      for (let sets = 0; sets < dataKg[fullDays].length; sets++) {
        dataKg[fullDays][sets] = dataKg[fullDays][sets].replace(
          /(\d+),(\d+)/g,
          "$1.$2"
        );
      }
    }

    for (let days = 0; days < dataKg.length; days++) {
      for (let i = 0; i < dataKg[days].length; i++) {
        if (!finalData[days] && dataWdh[days][i] >= 8) {
          finalData[days] = dataKg[days][i];
        }
        if (dataWdh[days][i] >= 8 && finalData[days] < dataKg[days][i]) {
          finalData[days] = dataKg[days][i];
        }
      }
      dataForChart[counter] = finalData[days];
      counter++;
    }
    if (dataForChart.length === 0) {
      console.log("Keine Daten gefunden");
      checkForSingleChartData(testData, currentExercise);
    } else {
      console.log("Daten gefunden");
      checkForSingleChartData(dataForChart, currentExercise);
    }
  };

  const writeDataInChart = (array: any, currentExercise: string) => {
    switch (currentExercise) {
      case "benchPressActive":
        setBenchPressWightData(array);
        break;
      case "chestActive":
        setChestPressWightData(array);
        break;
      case "inclineBarbellActive":
        setInclineBarbellWightData(array);
        break;
      case "inclineDumbbellActive":
        console.log(array);
        setInclineDumbbellWightData(array);
        break;
      case "flysObenActive":
        setFlysObenWightData(array);
        break;
      case "flysUntenActive":
        setFlysUntenWightData(array);
        break;
      case "dipsActive":
        setDipsWightData(array);
        break;
      case "militaryPressActive":
        setMilitaryPressWightData(array);
        break;
      case "shoulderPressActive":
        setShoulderPressWightData(array);
        break;
      case "sideRaiseActive":
        console.log(array);
        setSideRaiseWightData(array);
        break;
      case "tricepsPushActive":
        setTricepsPushWightData(array);
        break;
      case "katanaExtensionsActive":
        setKatanaExtensionsWightData(array);
        break;
      case "TricepsOverHeadActive":
        setTricepsOverHeadWightData(array);
        break;
    }
  };

  const checkForSingleChartData = (array: any, currentExercise: string) => {
    if (array.length <= 1) {
      writeDataInChart(testData, currentExercise);
    } else {
      writeDataInChart(array, currentExercise);
    }
  };

  const testData = [0];

  const safePopUpMenu = async (currentExercise: string) => {
    if (checkConnection) {
      try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const date = `${currentDay}:${currentMonth}:${currentYear}`;

        const data = {
          exercise: currentExercise,
          time: date,
          data: [
            { kg: exerciseData.data[0].kg, wdh: exerciseData.data[0].wdh },
            { kg: exerciseData.data[1].kg, wdh: exerciseData.data[1].wdh },
            { kg: exerciseData.data[2].kg, wdh: exerciseData.data[2].wdh },
            { kg: exerciseData.data[3].kg, wdh: exerciseData.data[3].wdh },
          ],
          timestampField: firebase.firestore.FieldValue.serverTimestamp(),
        };

        const trainWeightSaver = new TrainWeightSaver(
          data,
          todoRefForUser,
          currentExercise
        );
        await trainWeightSaver.saveDataToFirebase();

        setModalVisible(false);
        ToastMessage("Erfolgreich gespeichert");
        clearExerciseData();
      } catch (e) {
        console.log(e);
        ToastMessage("Fehler beim speichern");
        setModalVisible(false);
      }
    } else {
      ToastMessage("Keine Internetverbindung");
      setModalVisible(false);
    }
  };

  const closePopUpMenu = () => {
    setModalVisible(false);
  };

  const testFunction = () => {
    let trainWeightSaver = new TrainWeightSaver(
      exerciseData,
      todoRefForUser,
      currentExercise
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.BackGroundCanvas}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Push</Text>
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Bankdrücken"}
            imageSource={BenchpressImage}
            onPress={(parameter) => toggleExercise("benchPressActive")}
          />
        </View>
        {exercises.benchPressActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={benchPressWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Bankdrücken")} />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Brustpresse"}
            imageSource={ChestPress}
            onPress={(parameter) => toggleExercise("chestActive")}
          />
        </View>
        {exercises.chestActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={chestPressWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Brustpresse")} />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Schrägbankdrücken Langhantel"}
            imageSource={ChestPressSide}
            onPress={(parameter) => toggleExercise("inclineBarbellActive")}
          />
        </View>
        {exercises.inclineBarbellActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={inclineBarbellWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Schrägbankdrücken Langhantel")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Schrägbankdrücken Kurzhantel"}
            imageSource={Inclinebenchpress}
            onPress={(parameter) => toggleExercise("inclineDumbbellActive")}
          />
        </View>
        {exercises.inclineDumbbellActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={inclineDumbbellWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Schrägbankdrücken Kurzhantel")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Flys von Oben"}
            imageSource={FlysOben}
            onPress={(parameter) => toggleExercise("flysObenActive")}
          />
        </View>
        {exercises.flysObenActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={flysObenWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Flys von Oben")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Flys von Unten"}
            imageSource={FlysUnten}
            onPress={(parameter) => toggleExercise("flysUntenActive")}
          />
        </View>
        {exercises.flysUntenActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={flysUntenWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Flys von Unten")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Dips"}
            imageSource={Dips}
            onPress={(parameter) => toggleExercise("dipsActive")}
          />
        </View>
        {exercises.dipsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={dipsWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Dips")} />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Militarypress"}
            imageSource={MilitaryPress}
            onPress={(parameter) => toggleExercise("militaryPressActive")}
          />
        </View>
        {exercises.militaryPressActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={militaryPressWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Military Press")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Schulterpresse"}
            imageSource={ShoulderPress}
            onPress={(parameter) => toggleExercise("shoulderPressActive")}
          />
        </View>
        {exercises.shoulderPressActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={shoulderPressWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Schulterdrücken")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Seitheben"}
            imageSource={Seitheben}
            onPress={(parameter) => toggleExercise("sideRaiseActive")}
          />
        </View>
        {exercises.sideRaiseActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={sideRaiseWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Seitheben")} />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Trizeps strecken"}
            imageSource={TricepsDrücken}
            onPress={(parameter) => toggleExercise("tricepsPushActive")}
          />
        </View>
        {exercises.tricepsPushActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={tricepsPushWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Trizepsdrücken")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Katana extensions"}
            imageSource={TricepsOverHead}
            onPress={(parameter) => toggleExercise("katanaExtensionsActive")}
          />
        </View>
        {exercises.katanaExtensionsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={katanaExtensionsWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("KatanaExtensions")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View
          style={[styles.Cards, { height: height * 0.12, marginBottom: 30 }]}
        >
          <ChooseExerciseCards
            title={"Trizeps über kopf"}
            imageSource={TricepsOverHead}
            onPress={() => toggleExercise("TricepsOverHeadActive")}
          />
        </View>
        {exercises.TricepsOverHeadActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={tricepsOverHeadWeightData} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("TricepsOverHead")}
              />
              <CustomButton
                title={"Bearbeiten"}
                onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View>
            <View style={[styles.poUpContainer, { height: height * 0.1 }]}>
              <Pressable onPress={() => Keyboard.dismiss()}>
                <View style={styles.poUptitleContainer}>
                  <Text
                    style={[styles.modalText, { fontSize: fontScale * 45 }]}
                  >
                    {currentExercise}
                  </Text>
                </View>
              </Pressable>
              <View
                style={[
                  styles.popUpInputContainer,
                  { marginTop: height * 0.04, marginBottom: height * 0.04 },
                ]}
              >
                <View style={styles.centerPopupTextInput}>
                  <View style={[styles.addSetInformationsContainer]}>
                    <View
                      style={[
                        styles.showSetNumberTextContainer,
                        {
                          width: width * 0.07,
                          marginRight: width * 0.1,
                          marginLeft: width * 0.15,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.showSetNumberText,
                          {
                            fontSize: fontScale * 30,
                            // marginBottom: height * 0.005
                          },
                        ]}
                      >
                        1
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TextInput
                        style={[styles.input, { width: width * 0.22 }]}
                        placeholder={"Kg"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleKgInput(text, 0)}
                        value={exerciseData.data[0].kg}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          { width: width * 0.22, marginLeft: width * 0.1 },
                        ]}
                        placeholder={"Wdh"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleWdhInput(text, 0)}
                        value={exerciseData.data[0].wdh}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.addSetInformationsContainer,
                      { marginTop: height * 0.02 },
                    ]}
                  >
                    <View
                      style={[
                        styles.showSetNumberTextContainer,
                        {
                          width: width * 0.07,
                          marginRight: width * 0.1,
                          marginLeft: width * 0.15,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.showSetNumberText,
                          {
                            fontSize: fontScale * 30,
                            // marginBottom: height * 0.005
                          },
                        ]}
                      >
                        2
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TextInput
                        style={[styles.input, { width: width * 0.22 }]}
                        placeholder={"Kg"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleKgInput(text, 1)}
                        value={exerciseData.data[1].kg}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          { width: width * 0.22, marginLeft: width * 0.1 },
                        ]}
                        placeholder={"Wdh"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleWdhInput(text, 1)}
                        value={exerciseData.data[1].wdh}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.addSetInformationsContainer,
                      { marginTop: height * 0.02 },
                    ]}
                  >
                    <View
                      style={[
                        styles.showSetNumberTextContainer,
                        {
                          width: width * 0.07,
                          marginRight: width * 0.1,
                          marginLeft: width * 0.15,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.showSetNumberText,
                          {
                            fontSize: fontScale * 30,
                            // marginBottom: height * 0.005
                          },
                        ]}
                      >
                        3
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TextInput
                        style={[styles.input, { width: width * 0.22 }]}
                        placeholder={"Kg"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleKgInput(text, 2)}
                        value={exerciseData.data[2].kg}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          { width: width * 0.22, marginLeft: width * 0.1 },
                        ]}
                        placeholder={"Wdh"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleWdhInput(text, 2)}
                        value={exerciseData.data[2].wdh}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.addSetInformationsContainer,
                      { marginTop: height * 0.02, marginBottom: height * 0.03 },
                    ]}
                  >
                    <View
                      style={[
                        styles.showSetNumberTextContainer,
                        {
                          width: width * 0.07,
                          marginRight: width * 0.1,
                          marginLeft: width * 0.15,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.showSetNumberText,
                          {
                            fontSize: fontScale * 30,
                            // marginBottom: height * 0.005
                          },
                        ]}
                      >
                        4
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TextInput
                        style={[styles.input, { width: width * 0.22 }]}
                        placeholder={"Kg"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleKgInput(text, 3)}
                        value={exerciseData.data[3].kg}
                      />
                      <TextInput
                        style={[
                          styles.input,
                          { width: width * 0.22, marginLeft: width * 0.1 },
                        ]}
                        placeholder={"Wdh"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => handleWdhInput(text, 3)}
                        value={exerciseData.data[3].wdh}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  {
                    height: height * 0.05,
                    width: width * 0.8,
                    marginTop: height * 0.14,
                  },
                ]}
              >
                <CustomButton
                  title={"Speichern"}
                  onPress={() => safePopUpMenu(currentExercise)}
                />
                <CustomButton title={"Abbrechen"} onPress={closePopUpMenu} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Push;

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
  title: {
    color: "white",
    fontSize: moderateScale(25),
  },
  titleContainer: {
    flex: 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  Cards: {
    flex: 1,
    marginTop: 20,
  },
  lineChart: {
    marginTop: 20,
  },
  addButton: {},
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
    // borderWidth:12,
    borderColor: "green",
    backgroundColor: "white",
    color: "black",
  },
  addSetInformationsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Hinzugefügt, um den Inhalt horizontal zu zentrieren
    width: "100%",
  },
  popUpInputContainer: {},
  poUptitleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  poUpContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  setVorlage: {
    color: "white",
  },
  showSetNumberText: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  showSetNumberTextContainer: {
    borderRadius: 20,
    // flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  centerPopupTextInput: {
    alignItems: "center",
    width: "125%",
  },
});
