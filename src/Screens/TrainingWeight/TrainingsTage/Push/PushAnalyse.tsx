import React from "react";
import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {moderateScale} from "react-native-size-matters";
import ChooseExerciseCards from "../../../../CustomComponents/ChooseExerciseCard";
import BenchpressImage from "../../../../assets/Bankdrücken.png"
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
import {StackNavigationProp} from "@react-navigation/stack";
import {navigateToPushAnalyseScreen} from "../../../../Types/StackScreens";

type ChooseBlogScreen = StackNavigationProp<
    navigateToPushAnalyseScreen,
    "PushAnalyse"
>;

type Props = {
    navigation: ChooseBlogScreen;
};

const PushAnalyse: React.FC<Props> = ({ navigation }) => {
    const {height, width, scale, fontScale} = useWindowDimensions();

    const navigateToPushAnalyse = (exerciseName: string) => {
        const param: any = {
            exerciseName: exerciseName,
        };

        navigation.navigate("ShowPushAnalyse", param);
    };


    return (
        <View style={styles.container}>
            <ScrollView style={styles.BackGroundCanvas}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Push</Text>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Bankdrücken"} imageSource={BenchpressImage}
                                         onPress={() => navigateToPushAnalyse("Bankdrücken")}
                    />
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Brustpresse"} imageSource={ChestPress}
                                         onPress={() => navigateToPushAnalyse("Brustpresse")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Schrägbankdrücken Langhantel"} imageSource={ChestPressSide}
                                         onPress={() => navigateToPushAnalyse("Schrägbankdrücken Langhantel")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Schrägbankdrücken Kurzhantel"} imageSource={Inclinebenchpress}
                                         onPress={() => navigateToPushAnalyse("Schrägbankdrücken Kurzhantel")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Flys von Oben"} imageSource={FlysOben}
                                         onPress={() => navigateToPushAnalyse("Flys von Oben")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Flys von Unten"} imageSource={FlysUnten}
                                         onPress={() => navigateToPushAnalyse("Flys von Unten")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Dips"} imageSource={Dips}
                                         onPress={() => navigateToPushAnalyse("Dips")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Militarypress"} imageSource={MilitaryPress}
                                         onPress={() => navigateToPushAnalyse("Militarypress")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Schulterpresse"} imageSource={ShoulderPress}
                                         onPress={() => navigateToPushAnalyse("Schulterpresse")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Seitheben"} imageSource={Seitheben}
                                         onPress={() => navigateToPushAnalyse("Seitheben")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Trizeps strecken"} imageSource={TricepsDrücken}
                                         onPress={() => navigateToPushAnalyse("Trizeps strecken")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12}]}>
                    <ChooseExerciseCards title={"Katana extensions"} imageSource={TricepsOverHead}
                                         onPress={() => navigateToPushAnalyse("Katana extensions")}/>
                </View>
                <View style={[styles.Cards, {height: height * 0.12, marginBottom: 30}]}>
                    <ChooseExerciseCards title={"Trizeps über kopf"} imageSource={TricepsOverHead}
                                         onPress={() => navigateToPushAnalyse("Trizeps über kopf")}/>
                </View>
            </ScrollView>
        </View>
    )
}

export default PushAnalyse

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
