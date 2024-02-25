import React from "react";
import {StyleSheet, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {ChooseAnalyseDay} from "../../Types/StackScreens";
import CustomButton from "../../CustomComponents/ChooseTrainDay";

type ChooseBlogScreen = StackNavigationProp<ChooseAnalyseDay, 'ChooseAnalyseDay'>;

type Props = {
    navigation: ChooseBlogScreen;
};


const ChooseDay: React.FC<Props> = ({navigation}) => {

    const navigateToPushAnalyse = () => {
        navigation.navigate('PushAnalyse');
    };

    const navigateToPullAnalyse = () => {
        navigation.navigate('PullAnalyse');
    };

    const navigateToLegAnalyse = () => {
        navigation.navigate('LegAnalyse');
    };


    return (
        <View style={styles.container}>
            <View style={styles.BackGroundCanvas}>
                <View style={styles.buttonContainer}>
                    <CustomButton color={"grey"} title={"Push Analyse"}
                                  onPress={navigateToPushAnalyse}/>
                    <CustomButton color={"grey"} title={"Pull Analyse"}
                                  onPress={navigateToPullAnalyse}/>
                    <CustomButton color={"grey"} title={"Leg Analyse"}
                                  onPress={navigateToLegAnalyse}/>
                </View>
            </View>
        </View>
    )
}

export default ChooseDay

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
    buttonContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '25%',
    },
    buttonText: {
        // color: 'white',
        // fontSize: moderateScale(25),
    },
})
