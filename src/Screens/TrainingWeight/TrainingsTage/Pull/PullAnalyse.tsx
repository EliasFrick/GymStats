import React from "react";
import {View, Text, useWindowDimensions, ScrollView, StyleSheet} from "react-native";
import ChooseExerciseCards from "../../../../CustomComponents/ChooseExerciseCard";
import BenchpressImage from "../../../../assets/Bankdrücken.png";
import ChestPress from "../../../../assets/Brustpresse.png";
import ChestPressSide from "../../../../assets/SchraegbankLanghantel.png";
import Inclinebenchpress from "../../../../assets/SchraegbankdrückenKurzhantel.png";
import FlysOben from "../../../../assets/FlysVonOben.png";
import FlysUnten from "../../../../assets/FlysUnten.png";
import Dips from "../../../../assets/Dips.png";
import MilitaryPress from "../../../../assets/MilitaryPress.png";
import ShoulderPress from "../../../../assets/ShoulderPressKurzhantel.png";
import Seitheben from "../../../../assets/Seitheben.png";
import TricepsDrücken from "../../../../assets/TricpesDrücken.png";
import TricepsOverHead from "../../../../assets/TricepsOverHead.png";
import {moderateScale} from "react-native-size-matters";

import PullDown from "../../../../assets/PullDown.png"
import PullUps from "../../../../assets/PullUps.png"
import TBarRow from "../../../../assets/TBar-Row.png"
import Deadlift from "../../../../assets/Deadlift.png"
import EngesRudern from "../../../../assets/EngesRudern.png"
import LanghantelRudern from "../../../../assets/LanghantelRudern.png"
import HighRow from "../../../../assets/HighRow.png"
import FaePulls from "../../../../assets/FacePulls.png"
import ReverFlys from "../../../../assets/CableFlyReverse.png"
import Überzüge from "../../../../assets/Überzüge.png"
import SZCurls from "../../../../assets/SZCurls.png"
import HammerCurls from "../../../../assets/HammerCurls.png"
import UnterarmCurlsInnen from "../../../../assets/UnterarmCurlsInnen.png"
import UnterarmCurlsAußen from "../../../../assets/UnterarmCurlsAußen.png"
import PreacherCurls from "../../../../assets/PreacherCurls.png"
import FaceawayCurls from "../../../../assets/FaceAwayCurls.png"
import SpiderCurls from "../../../../assets/SpiderCurls.png"

export default function PullAnalyse(){
    const {height, width, scale, fontScale} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <ScrollView style={styles.BackGroundCanvas}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Pull</Text>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Latzug"} imageSource={PullDown}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Klimmzug"} imageSource={PullUps}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"TBar"} imageSource={TBarRow}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Enges Rudern"} imageSource={EngesRudern}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Langhantel Rudern"} imageSource={LanghantelRudern}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Kreuzheben"} imageSource={Deadlift}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"High Rows"} imageSource={HighRow}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Face pulls"} imageSource={FaePulls}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Reverse Flys"} imageSource={ReverFlys}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Überzüge"} imageSource={Überzüge}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"SZ Curls"} imageSource={SZCurls}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12, marginBottom: 30}]}>
                    <ChooseExerciseCards title={"Preacher Curls"} imageSource={PreacherCurls}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12, marginBottom: 30}]}>
                    <ChooseExerciseCards title={"Face away Curls"} imageSource={FaceawayCurls}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12, marginBottom: 30}]}>
                    <ChooseExerciseCards title={"Spider Curls"} imageSource={SpiderCurls}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Hammer Curls"} imageSource={HammerCurls}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Unterarm Curls Innen"} imageSource={UnterarmCurlsInnen}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12, marginBottom: 30}]}>
                    <ChooseExerciseCards title={"Unterarm Curls Außen"} imageSource={UnterarmCurlsAußen}/>
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
