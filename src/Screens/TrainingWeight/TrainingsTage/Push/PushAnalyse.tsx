import React from "react";
import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {moderateScale} from "react-native-size-matters";
import ChooseExerciseCards from "../../../../CustomComponents/ChooseExerciseCard";
import BenchpressImage from "../../../../assets/Bankdrücken.png"
import CableTowerImage from "../../../../assets/Kabelturm.png"
import ChestPress from "../../../../assets/Brustpresse.png"
import ChestPressSide from "../../../../assets/SchraegbankLanghantel.png"
import Dips from "../../../../assets/Dips.png"
import MilitaryPress from "../../../../assets/MilitaryPress.png"
import ShoulderPress from "../../../../assets/ShoulderPressKurzhantel.png"
import Seitheben from "../../../../assets/Seitheben.png"
import Inclinebenchpress from "../../../../assets/SchraegbankdrückenKurzhantel.png"
import FlysOben from "../../../../assets/FlysVonOben.png"
import FlysUnten from "../../../../assets/FlysUnten.png"
import TricepsDrücken from "../../../../assets/TricpesDrücken.png"
import TricepsOverHead from "../../../../assets/TricepsOverHead.png"


export default function PushAnalyse() {
    const {height, width, scale, fontScale} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <ScrollView style={styles.BackGroundCanvas}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Push</Text>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Bankdrücken"} imageSource={BenchpressImage}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Brustpresse"} imageSource={ChestPress}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Schrägbankdrücken Langhantel"} imageSource={ChestPressSide}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Schrägbankdrücken Kurzhantel"} imageSource={Inclinebenchpress}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Flys von Oben"} imageSource={FlysOben}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Flys von Unten"} imageSource={FlysUnten}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Dips"} imageSource={Dips}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Militarypress"} imageSource={MilitaryPress}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Schulterpresse"} imageSource={ShoulderPress}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Seitheben"} imageSource={Seitheben}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Trizeps strecken"} imageSource={TricepsDrücken}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Katana extensions"} imageSource={TricepsOverHead}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12, marginBottom: 30}]}>
                    <ChooseExerciseCards title={"Trizeps über kopf"} imageSource={TricepsOverHead}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2b3340'
    },
    BackGroundCanvas: {
        flex: 1,
        backgroundColor: '#2d3b55',
        padding: 20,
        borderRadius: 40
    },
    title: {
        color: 'white',
        fontSize: moderateScale(25),

    },
    titleContainer: {
        flex: 0.07,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Cards: {
        flex: 1,
        marginTop: 20,
        // backgroundColor: 'green',
        // height: '200%'
    }
})
