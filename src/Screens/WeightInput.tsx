import React, {useEffect, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import {firebaseMain} from "../Database/firebaseConfig";
import {moderateScale} from 'react-native-size-matters';
import NetInfo from '@react-native-community/netinfo';
import ToggleSwitch from "../CustomComponents/ToggleSwitch";
import {useMyContext} from "../Provider/ToggleChartProvider"
import ToastMessage from "../Functions/ToastMessage";
import firebase from "firebase/compat/app";

// const {height, width, scale, fontScale} = useWindowDimensions();

export default function WeightInput() {
    // const {diet, bulk, setDiet, setBulk, average, setAverage} = useMyContext();
    const todoRefForDiet = firebaseMain.firestore().collection('diet');
    const todoRefForBulk = firebaseMain.firestore().collection('Aufbau');
    const todoRefForAverage = firebaseMain.firestore().collection('bodyWeight');
    const todoRefForTest = firebaseMain.firestore().collection('testData');
    const [addWeight, setAddWeight] = useState(0);
    const [decimalValue, setDecimalValue] = useState<string>(''); // Hier wird der eingegebene Wert gespeichert
    const [finalDecimalValue, setFinalDecimalValue] = useState<string>(''); // Hier wird der eingegebene Wert gespeichert
    const [checkConnection, setCheckConnection] = useState(false);
    const [selected, setSelected] = React.useState("");
    const [dotForWeight, setDotForWeight] = useState(true);
    const [test, setTest] = useState<boolean>(false)
    const [currentTimeStamp, setCurrentTimeStamp] = useState<any>()
    const {toggleDiet, toggleBulk, setToggleDiet, setToggleBulk, toggleAverage, setToggleAverage} = useMyContext();
    const {height, width, scale, fontScale} = useWindowDimensions();

    const updateDecimalValue = (newValue: string) => {
        const replacedValue = newValue.replace(/,/g, '.');
        setDecimalValue(replacedValue);
        setFinalDecimalValue(replacedValue)
    };

    const checkInternetConnection = () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
                setCheckConnection(true);
            } else if (state.isConnected == false) {
                setCheckConnection(false);
            }
        });
    };

    useEffect(() => {
        const userID = firebaseMain.auth().currentUser?.uid;

        checkInternetConnection();
        if (selected === "Aufbau") {
            setToggleBulk(true)
            setToggleDiet(false)
            setToggleAverage(false)
            setTest(false)
        } else if (selected === "Diät") {
            setToggleDiet(true)
            setToggleBulk(false)
            setToggleAverage(false)
            setTest(false)
        } else if (selected === "Average") {
            setToggleAverage(true)
            setToggleDiet(false)
            setToggleBulk(false)
            setTest(false)
        } else if (selected === "Test") {
            setTest(true)
            setToggleAverage(false)
            setToggleDiet(false)
            setToggleBulk(false)
        }
    }, [selected])

    const activateTestMode = () => {
        setToggleBulk(false)
        setToggleDiet(false)
        setToggleAverage(false)
        setTest(true)
    }

    const addField = () => {
        updateDecimalValue(decimalValue)
        console.log(finalDecimalValue)
        if (checkConnection) {
            if (finalDecimalValue) {
                // const timestamp = firebase.firestore.FieldValue.serverTimestamp();

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1;
                const currentDay = currentDate.getDate();

                const date = `${currentDay}:${currentMonth}:${currentYear}`;

                const data = {
                    time: date,
                    data: finalDecimalValue,
                    timestampField: firebase.firestore.FieldValue.serverTimestamp(),
                };
                // activateTestMode()
                if (toggleBulk) {
                    setCurrentTimeStamp(data.timestampField)
                    todoRefForBulk
                        .add(data)
                        .then(() => {
                            setAddWeight(0);
                            Keyboard.dismiss();
                        });
                    todoRefForAverage
                        .add(data)
                        .then(() => {
                            setAddWeight(0);
                            Keyboard.dismiss();
                        });
                    checkTimeStampField()
                } else if (toggleDiet) {

                    setCurrentTimeStamp(data.timestampField)
                    todoRefForDiet
                        .add(data)
                        .then(() => {
                            setAddWeight(0);
                            Keyboard.dismiss();
                        });

                    todoRefForAverage
                        .add(data)
                        .then(() => {
                            setAddWeight(0);
                            Keyboard.dismiss();
                        });
                    checkTimeStampField()
                } else if (toggleAverage) {

                    setCurrentTimeStamp(data.timestampField)
                    todoRefForAverage
                        .add(data)
                        .then(() => {
                            setAddWeight(0);
                            Keyboard.dismiss();
                        });
                    checkTimeStampField()
                } else if (test) {
                    setCurrentTimeStamp(data.timestampField)
                    todoRefForTest
                        .add(data)
                        .then(() => {
                            setAddWeight(0);
                            Keyboard.dismiss();
                        });
                    checkTestTimeStampField()
                }

                setDotForWeight(true)
                setDecimalValue('')
            }
        } else if (!checkConnection) {
            setDecimalValue("")
            ToastMessage('Keine Internetverbindung später nochmal versuchen')
            setDotForWeight(true)
        }
    };

    const fetchData: any = []
    const testCheck: any = []
    const checkTimeStampField = async () => {
        const assistance = firebaseMain.firestore().collection("bodyWeight");
        const querySnapshot = await assistance.orderBy('timestampField', 'asc').get();
        const tempDoc = querySnapshot.docs.map((doc: any) => {
            return {id: doc.id, ...doc.data()};
        });

        for (let i = 0; i < tempDoc.length; i++) {
            fetchData[i] = tempDoc[i].data;
        }
        if (fetchData) {
            if (fetchData[fetchData.length - 1] === finalDecimalValue) {
                ToastMessage('Erfolgreich gespeichert')
            } else {
                ToastMessage('Fehler beim speichern')
            }
        } else {
            console.log("data nicht vorhanden");
        }

        return tempDoc;
    }


    const checkTestTimeStampField = async () => {
        const assistance = firebaseMain.firestore().collection("testData");
        const querySnapshot = await assistance.orderBy('timestampField', 'asc').get();
        const tempDoc = querySnapshot.docs.map((doc: any) => {
            return {id: doc.id, ...doc.data()};
        });

        for (let i = 0; i < tempDoc.length; i++) {
            testCheck[i] = tempDoc[i].data;
        }
        if (testCheck) {
            if (testCheck[testCheck.length - 1] === finalDecimalValue) {
                ToastMessage('Erfolgreich gespeichert')
            } else {
                ToastMessage('Fehler beim speichern')
            }
        } else {
        }

        return tempDoc;
    }

    const testInput = () => {
        console.log("Test")
    }


    return (
        <KeyboardAvoidingView
            // @ts-ignore
            behavior={"behaviour"}
            style={styles.container}
        >

        {/*<View style={[styles.container]}>*/}
            <View style={styles.EingabeContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode={"tail"}>Heutiges Gewicht
                        eintragen</Text>
                </View>
                <View style={[styles.inputContainer]}>
                    <TextInput
                        style={[styles.input, {width: width * 0.25, height: height * 0.04}]}
                        placeholder={'Gewicht'}
                        onChangeText={(text) => (setDecimalValue(text))}
                        value={decimalValue}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.toggleSwitch}>
                    <ToggleSwitch/>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={addField}>
                        <Text style={styles.buttonText}>Hinzufügen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        {/*</View>*/}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    ScrollContainer: {
        backgroundColor: '#2b3340',
        padding: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#2b3340',
        // alignItems: 'center',
        padding: 20,
        // height: '200%'
    },
    EingabeContainer: {
        flex: 1,
        backgroundColor: '#2d3b55',
        padding: 20,
        borderRadius: 40
    },
    inputContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    title: {
        flex: 1,
        fontSize: moderateScale(30),
        color: 'white'
    },
    titleContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "10%",
    },
    buttonContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '10%',
    },
    button: {
        backgroundColor: '#e93359',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    buttonText: {
        color: 'white',
        fontSize: moderateScale(25),
    },
    input: {
        textAlign: 'center',
        borderWidth: 1,
        backgroundColor: '#2d3b55',
        color: 'white'
    },
    toggleSwitch: {
        marginTop: '10%'
    }
});
