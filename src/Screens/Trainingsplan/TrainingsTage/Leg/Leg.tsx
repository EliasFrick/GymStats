import React, {useEffect} from "react";
import {View, Text, useWindowDimensions, ScrollView, StyleSheet} from "react-native";
import ChooseExerciseCards from "../../../../CustomComponents/ChooseExerciseCard";
import {moderateScale} from "react-native-size-matters";
import RomaniadDeadlift from "../../../../assets/RomaniadDeadlift.png"
import Squats from "../../../../assets/Squats.png"
import Hacksquat from "../../../../assets/HackSquat.png"
import Deadlift from "../../../../assets/Deadlift.png"
import Beinbeuger from "../../../../assets/Beinbeuger.png"
import Wadenmaschine from "../../../../assets/Wadenmaschine.png"
import Beinpresse from "../../../../assets/Beinpresse.png"
import Adduktoren from "../../../../assets/Adduktoren.png"
import Bauchmaschine from "../../../../assets/Bauchmaschine.png"
import Beinstrecker from "../../../../assets/Beinstrecker.png"
import {firebaseMain} from "../../../../Database/firebaseConfig";

export default function Leg(){
    const {height, width, scale, fontScale} = useWindowDimensions();

    useEffect(() => {
        const userID = firebaseMain.auth().currentUser?.uid;
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView style={styles.BackGroundCanvas}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Leg</Text>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Squats"} imageSource={Squats}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Hack-Squat"} imageSource={Hacksquat}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Beinbeuger"} imageSource={Beinbeuger}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Romanian Deadlift"} imageSource={RomaniadDeadlift}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Kreuzheben"} imageSource={Deadlift}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Beinpresse"} imageSource={Beinpresse}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Waden"} imageSource={Wadenmaschine}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Adduktoren"} imageSource={Adduktoren}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Beinstrecker"} imageSource={Beinstrecker}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12, marginBottom: 30}]}>
                    <ChooseExerciseCards title={"Bauchmaschine"} imageSource={Bauchmaschine}/>
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
