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
import ChooseExerciseCards from "../../../../CustomComponents/ChooseExerciseCard";
import { moderateScale } from "react-native-size-matters";
import { firebaseMain } from "../../../../Database/firebaseConfig";
import firebase from "firebase/compat";
import { TrainWeightSaver } from "../../../../Class/SaveTrainData";
import ToastMessage from "../../../../Functions/ToastMessage";
import { firebasePull } from "../../../../Database/firebaseConfig-Pull";
import { useMyLoginContext } from "../../../../Provider/LoginProvider";
import MyLineChart from "../../../../Components/LineChartTraining";
import CustomButton from "../../../../CustomComponents/ChooseTrainDay";
import { ExercisePullState } from "../../../../Types/Interface";
import { initialPullExercisesState } from "../../../../Types/States";
import { firebasePush } from "../../../../Database/firebaseConfig-Push";
import PullDown from "../../../../assets/PullDown.png";
import PullUps from "../../../../assets/PullUps.png";
import TBarRow from "../../../../assets/TBar-Row.png";
import Deadlift from "../../../../assets/Deadlift.png";
import EngesRudern from "../../../../assets/EngesRudern.png";
import LanghantelRudern from "../../../../assets/LanghantelRudern.png";
import HighRow from "../../../../assets/HighRow.png";
import FaePulls from "../../../../assets/FacePulls.png";
import ReverFlys from "../../../../assets/CableFlyReverse.png";
import Überzüge from "../../../../assets/Überzüge.png";
import SZCurls from "../../../../assets/SZCurls.png";
import HammerCurls from "../../../../assets/HammerCurls.png";
import UnterarmCurlsInnen from "../../../../assets/UnterarmCurlsInnen.png";
import UnterarmCurlsAußen from "../../../../assets/UnterarmCurlsAußen.png";
import PreacherCurls from "../../../../assets/PreacherCurls.png";
import FaceawayCurls from "../../../../assets/FaceAwayCurls.png";
import SpiderCurls from "../../../../assets/SpiderCurls.png";
import NetInfo from "@react-native-community/netinfo";

export default function Pull() {
  const { height, width, scale, fontScale } = useWindowDimensions();
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
  const todoRefForUser = firebasePull.firestore().collection(username);
  const [isModalVisible, setModalVisible] = useState(false);
  const [exercises, setExercises] = useState<ExercisePullState>(
    initialPullExercisesState
  );
  const [currentExercise, setCurrentExercise] = useState("");
  const [currentActive, setCurrentActive] = useState<
    keyof ExercisePullState | undefined
  >();
  const [pullDownWeightData, setPullDownWightData] = useState<any>([0]);
  const [pullUpWeightData, setPullUpWightData] = useState<any>([0]);
  const [tBar, setTBarWightData] = useState<any>([0]);
  const [tightRowingWeightData, setTightRowingWightData] = useState<any>([0]);
  const [barbellRowflysWeightData, setBarbellRowflysWightData] = useState<any>([
    0,
  ]);
  const [deadliftWeightData, setDeadliftWightData] = useState<any>([0]);
  const [highRowData, setHighRowWightData] = useState<any>([0]);
  const [facePullsWeightData, setFacePullsWightData] = useState<any>([0]);
  const [reverseFlys, setReverseFlysWightData] = useState<any>([0]);
  const [pullOverWeightData, setPullOverWightData] = useState<any>([0]);
  const [szCurlsWeightData, setSzCurlsWightData] = useState<any>([0]);
  const [preacherCurlsWeightData, setPreacherCurlsWightData] = useState<any>([
    0,
  ]);
  const [faceAwayCurlsWeightData, setFaceAwayCurlsWightData] = useState<any>([
    0,
  ]);
  const [spiderCurlsWeightData, setSpiderCurlsWightData] = useState<any>([0]);
  const [hammerCurlsWeightData, setHammerCurlsWightData] = useState<any>([0]);
  const [underamCurlsInsideWeightData, setUnderamCurlsInsideWightData] =
    useState<any>([0]);
  const [underamCurlsOutsideWeightData, setUnderamCurlsOutsideWightData] =
    useState<any>([0]);

  useEffect(() => {
    // const userID = firebaseMain.auth().currentUser?.uid;
    checkInternetConnection();
  }, []);

  const checkInternetConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        setCheckConnection(true);
      } else if (state.isConnected == false) {
        setCheckConnection(false);
      }
    });
  };

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

  const toggleExercise = (exercise: keyof ExercisePullState) => {
    getDataForChart(exercise);
    if (currentActive === exercise) {
      setExercises(initialPullExercisesState);
      setCurrentActive("Platzhalter");
    } else {
      setExercises(initialPullExercisesState); // Setze alle auf false
      setExercises((prevExercises) => ({
        ...prevExercises,
        [exercise]: true,
      }));
      setCurrentActive(exercise);
    }
  };

  const getDataKg: any[][] = [];
  const getDataWdh: any[][] = [];
  const getexercise: any[] = [];
  let date: any = 0;

  const getDataForChart = async (currentExercise: string) => {
    console.log(currentExercise);
    const querySnapshot = await firebasePull
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

  const testData = [0];

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
        console.log(dataKg[fullDays][sets]);
        dataKg[fullDays][sets] = dataKg[fullDays][sets].replace(
          /(\d+),(\d+)/g,
          "$1.$2"
        );
        console.log(dataKg[fullDays][sets]);
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
    //array = array.replace(/,/g, ".");

    switch (currentExercise) {
      case "pullDownActive":
        setPullDownWightData(array);
        break;
      case "pullUpActive":
        setPullUpWightData(array);
        break;
      case "tbarActive":
        setTBarWightData(array);
        break;
      case "tightRowingActive":
        setTightRowingWightData(array);
        break;
      case "barbellRowflysObenActive":
        setBarbellRowflysWightData(array);
        break;
      case "DeadliftActive":
        setDeadliftWightData(array);
        break;
      case "highRowActive":
        setHighRowWightData(array);
        break;
      case "facePullsActive":
        setFacePullsWightData(array);
        break;
      case "reverseFlysActive":
        setReverseFlysWightData(array);
        break;
      case "pullOverActive":
        setPullUpWightData(array);
        break;
      case "szCurlsActive":
        setSzCurlsWightData(array);
        break;
      case "preacherCurlsActive":
        setPreacherCurlsWightData(array);
        break;
      case "faceAwayCurlsActive":
        setFaceAwayCurlsWightData(array);
        break;
      case "spiderCurlsActive":
        setSpiderCurlsWightData(array);
        break;
      case "hammerCurlsActive":
        setHammerCurlsWightData(array);
        break;
      case "underamCurlsInsideActive":
        setUnderamCurlsInsideWightData(array);
        break;
      case "underamCurlsOutsideActive":
        setUnderamCurlsOutsideWightData(array);
        break;
    }
  };

  const getExerciseNameForDatabase = (exerciseActiveName: string): string => {
    switch (exerciseActiveName) {
      case "pullDownActive":
        return "Latzug";
      case "pullUpActive":
        return "Klimmzüge";
      case "tbarActive":
        return "TBar-Row";
      case "tightRowingActive":
        return "Enges Rudern";
      case "barbellRowflysObenActive":
        return "Langhantel Rudern";
      case "DeadliftActive":
        return "Kreuzheben";
      case "highRowActive":
        return "High Row";
      case "facePullsActive":
        return "Face Pulls";
      case "reverseFlysActive":
        return "Reverse Flys";
      case "pullOverActive":
        return "Überzüge";
      case "szCurlsActive":
        return "SZ Curls";
      case "preacherCurlsActive":
        return "Preacher Curls";
      case "faceAwayCurlsActive":
        return "Face-Away Curls";
      case "spiderCurlsActive":
        return "Spider Curls";
      case "hammerCurlsActive":
        return "Hammer Curls";
      case "underamCurlsInsideActive":
        return "Unterarm Curls innen";
      case "underamCurlsOutsideActive":
        return "Unterarm Curls außen";
    }
    return "";
  };

  const closePopUpMenu = () => {
    setModalVisible(false);
  };

  const addSet = (currentExercise: string) => {
    setModalVisible(true);
    setCurrentExercise(currentExercise);
  };

  const checkForSingleChartData = (array: any, currentExercise: string) => {
    if (array.length <= 1) {
      writeDataInChart(testData, currentExercise);
    } else {
      writeDataInChart(array, currentExercise);
    }
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.BackGroundCanvas}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Push</Text>
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Latzug"}
            imageSource={PullDown}
            onPress={(parameter) => toggleExercise("pullDownActive")}
          />
        </View>
        {exercises.pullDownActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={pullDownWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Latzug")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Klimmzüge"}
            imageSource={PullUps}
            onPress={(parameter) => toggleExercise("pullUpActive")}
          />
        </View>
        {exercises.pullUpActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={pullUpWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Klimmzüge")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"T-Bar Row"}
            imageSource={TBarRow}
            onPress={(parameter) => toggleExercise("tbarActive")}
          />
        </View>
        {exercises.tbarActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={tBar.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("TBar-Row")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Enges rudern"}
            imageSource={EngesRudern}
            onPress={(parameter) => toggleExercise("tightRowingActive")}
          />
        </View>
        {exercises.tightRowingActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={tightRowingWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Enges Rudern")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Langhantelrudern"}
            imageSource={LanghantelRudern}
            onPress={(parameter) => toggleExercise("barbellRowflysObenActive")}
          />
        </View>
        {exercises.barbellRowflysObenActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={barbellRowflysWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Langhantel Rudern")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Kreuzheben"}
            imageSource={Deadlift}
            onPress={(parameter) => toggleExercise("DeadliftActive")}
          />
        </View>
        {exercises.DeadliftActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={deadliftWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Kreuzheben")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"High Row"}
            imageSource={HighRow}
            onPress={(parameter) => toggleExercise("highRowActive")}
          />
        </View>
        {exercises.highRowActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={highRowData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("High Row")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Facepulls"}
            imageSource={FaePulls}
            onPress={(parameter) => toggleExercise("facePullsActive")}
          />
        </View>
        {exercises.facePullsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={facePullsWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Face Pulls")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Reverse Flys"}
            imageSource={ReverFlys}
            onPress={(parameter) => toggleExercise("reverseFlysActive")}
          />
        </View>
        {exercises.reverseFlysActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={reverseFlys.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Reverse Flys")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Überzüge"}
            imageSource={Überzüge}
            onPress={(parameter) => toggleExercise("pullOverActive")}
          />
        </View>
        {exercises.pullOverActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={pullOverWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("Überzüge")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"SZ-Curls"}
            imageSource={SZCurls}
            onPress={(parameter) => toggleExercise("szCurlsActive")}
          />
        </View>
        {exercises.szCurlsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={szCurlsWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton title={"+"} onPress={() => addSet("SZ Curls")} />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"PreacherCurls"}
            imageSource={PreacherCurls}
            onPress={(parameter) => toggleExercise("preacherCurlsActive")}
          />
        </View>
        {exercises.preacherCurlsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={preacherCurlsWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Preacher Curls")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"FaceawayCurls"}
            imageSource={FaceawayCurls}
            onPress={() => toggleExercise("faceAwayCurlsActive")}
          />
        </View>
        {exercises.faceAwayCurlsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={faceAwayCurlsWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Face-Away Curls")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"SpiderCurls"}
            imageSource={SpiderCurls}
            onPress={(parameter) => toggleExercise("spiderCurlsActive")}
          />
        </View>
        {exercises.spiderCurlsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={spiderCurlsWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Spider Curls")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"HammerCurls"}
            imageSource={HammerCurls}
            onPress={(parameter) => toggleExercise("hammerCurlsActive")}
          />
        </View>
        {exercises.hammerCurlsActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={hammerCurlsWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Hammer Curls")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Unterarmcurls innen"}
            imageSource={UnterarmCurlsInnen}
            onPress={(parameter) => toggleExercise("underamCurlsInsideActive")}
          />
        </View>
        {exercises.underamCurlsInsideActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={underamCurlsInsideWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Unterarm Curls innen")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
              />
            </View>
          </View>
        )}
        <View
          style={[styles.Cards, { height: height * 0.12, marginBottom: 30 }]}
        >
          <ChooseExerciseCards
            title={"Unterarmcurls außen"}
            imageSource={UnterarmCurlsAußen}
            onPress={(parameter) => toggleExercise("underamCurlsOutsideActive")}
          />
        </View>
        {exercises.underamCurlsOutsideActive && (
          <View style={[styles.lineChart, { height: height * 0.35 }]}>
            <MyLineChart input={underamCurlsOutsideWeightData.map(Number)} />
            <View style={[styles.addButton, { height: height * 0.05 }]}>
              <CustomButton
                title={"+"}
                onPress={() => addSet("Unterarm Curls außen")}
              />
              <CustomButton
                title={"Bearbeiten"}
                // onPress={navigateToPushInput}
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
}

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
