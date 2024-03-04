import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View,} from "react-native";
import MyLineChart from "../Components/LineChart";
import {firebaseMain} from "../Database/firebaseConfig";
import {moderateScale} from "react-native-size-matters";
import ToggleSwitch from "../CustomComponents/ToggleSwitch";
import {useMyContext} from "../Provider/ToggleChartProvider";
import {useMyLoginContext} from "../Provider/LoginProvider";
import {StackNavigationProp} from "@react-navigation/stack";
import {TBodyweightAnalysePage} from "../Types/StackScreens";
import Ionicons from "@expo/vector-icons/Ionicons";

type ChooseBlogScreen = StackNavigationProp<
    TBodyweightAnalysePage,
    "BodyweightAnalyseKey"
>;

type Props = {
    navigation: ChooseBlogScreen;
};

const BodyweightAnalyse: React.FC<Props> = ({navigation}) => {
    const {
        username,
    } = useMyLoginContext();
    const [bodyWeightData, setBodyWeightData] = useState<any>([1]);
    const [bulkWeightData, setBulkWeightData] = useState<any>([1]);
    const [dietWeightData, setDietWeightData] = useState<any>([1]);
    const [selected, setSelected] = React.useState("");
    const [chartMarginTop, setChartMarginTop] = React.useState(0);
    const [lineChartHeight, setLineChartHeight] = React.useState(80);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State für den Dropdown-Status
    const {height, width, scale, fontScale} = useWindowDimensions();
    const {
        toggleDiet,
        toggleBulk,
        setToggleDiet,
        setToggleBulk,
        toggleAverage,
        setToggleAverage,
    } = useMyContext();

    const fetchBulk: any = [];
    const fetchDiet: any = [];
    const fetchAverage: any = [];


    const getFirestoreData = async () => {
        await Promise.all([fetchDietData(), fetchBulkData(), fetchAverageData()]);
    };

    const fetchDietData = async () => {
        const assistance = firebaseMain.firestore().collection("diet");
        const querySnapshot = await assistance
            .orderBy("timestampField", "asc")
            .get();
        const tempDoc = querySnapshot.docs.map((doc: any) => {
            return {id: doc.id, ...doc.data()};
        });

        for (let i = 0; i < tempDoc.length; i++) {
            fetchDiet[i] = tempDoc[i].data;
        }
        if (fetchDiet) {
            setDietWeightData(fetchDiet);
        } else {
            console.log("data nicht vorhanden");
        }

        return tempDoc;
    };

    const fetchBulkData = async () => {
        const assistance = firebaseMain.firestore().collection("Aufbau");
        const querySnapshot = await assistance
            .orderBy("timestampField", "asc")
            .get();
        const tempDoc = querySnapshot.docs.map((doc: any) => {
            return {id: doc.id, ...doc.data()};
        });

        for (let i = 0; i < tempDoc.length; i++) {
            fetchBulk[i] = tempDoc[i].data;
        }
        if (fetchBulk) {
            setBulkWeightData(fetchBulk);

        } else {
            console.log("data nicht vorhanden");
        }
        return tempDoc;
    };

    const fetchAverageData = async () => {
        const assistance = firebaseMain.firestore().collection("bodyWeight");
        const querySnapshot = await assistance
            .orderBy("timestampField", "asc")
            .get();
        const tempDoc = querySnapshot.docs.map((doc: any) => {
            return {id: doc.id, ...doc.data()};
        });

        for (let i = 0; i < tempDoc.length; i++) {
            fetchAverage[i] = tempDoc[i].data;
        }
        if (fetchAverage) {
            setBodyWeightData(fetchAverage);
        } else {
            console.log("data nicht vorhanden");
        }

        return tempDoc;
    };

    useEffect(() => {
        const userID = firebaseMain.auth().currentUser?.uid;

        getFirestoreData();
        if (selected === "Aufbau") {
            setToggleBulk(true);
            setToggleDiet(false);
            setToggleAverage(false);
            setSelected("Aufbau");
        } else if (selected === "Diät") {
            setToggleDiet(true);
            setToggleBulk(false);
            setToggleAverage(false);
            setSelected("Diät");
        } else if (selected === "Alles") {
            setToggleAverage(true);
            setToggleDiet(false);
            setToggleBulk(false);
            setSelected("Alles");
        }
    }, [toggleBulk, toggleDiet, toggleAverage, selected]);

    const navigateToSettingsPage = () => {
        navigation.navigate("SettingPageKey");
    };


    return (
        <View style={styles.container}>
            <ScrollView style={styles.BackGroundCanvas}>
                <View style={styles.topBar}>
                    <Pressable onPress={navigateToSettingsPage}>
                        <Ionicons
                            style={{marginRight: width * 0.03}}
                            name={"settings"}
                            size={40}
                        />
                    </Pressable>
                </View>
                <View style={styles.lineChartContainer}>
                    {toggleAverage && (
                        <View style={[styles.chartContainer]}>
                            <Text style={styles.currentWeightText}>
                                {username} Aktuelles Gewicht:{" "}
                                {bodyWeightData[bodyWeightData.length - 1]}
                            </Text>
                            <View style={[{marginTop: lineChartHeight}]}>
                                <MyLineChart input={bodyWeightData}/>

                            </View>
                        </View>
                    )}
                    {toggleBulk && (
                        <View style={[styles.chartContainer]}>
                            <Text style={styles.currentWeightText}>
                                {username} Aktuelles Gewicht: {bodyWeightData[bodyWeightData.length - 1]}
                            </Text>
                            <View style={[{marginTop: lineChartHeight}]}>
                                <MyLineChart input={bulkWeightData}/>
                            </View>
                        </View>
                    )}
                    {toggleDiet && (
                        <View style={[styles.chartContainer]}>
                            <Text style={styles.currentWeightText}>
                                {username} Aktuelles Gewicht: {bodyWeightData[bodyWeightData.length - 1]}
                            </Text>
                            <View style={[styles.lineChart, {marginTop: lineChartHeight}]}>
                                <MyLineChart input={dietWeightData}/>
                            </View>
                        </View>
                    )}
                    <ToggleSwitch/>
                </View>
            </ScrollView>
        </View>
    );
};

export default BodyweightAnalyse;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b3340",
        padding: 20,
    },
    titleContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: moderateScale(30),
    },
    chartContainer: {
        flex: 1,
        alignItems: "center",
        right: "2.5%",
    },
    lineChartContainer: {
        flex: 1,
        backgroundColor: "#2d3b55",
        padding: 20,
        borderRadius: 40,
    },
    currentWeightText: {
        fontSize: moderateScale(25),
        color: "white",
    },
    lineChart: {},
    topBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 15
    },
    BackGroundCanvas: {
        flex: 1,
        backgroundColor: "#2d3b55",
        padding: 20,
        borderRadius: 40,
    },
});
