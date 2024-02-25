import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from "react-native-size-matters";

interface CustomCardProps {
    imageSource: string;
    title: string;
    onPress?: (param?: any) => void;
}

const ChooseExerciseCards: React.FC<CustomCardProps> = ({imageSource, title, onPress}) => {
    // @ts-ignore
    return (
        <Pressable onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    {/*// @ts-ignore */}
                    <Image source={imageSource} style={styles.cardImage} resizeMode={"contain"}/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#2d3b55',
        flexDirection: 'row',
        height: "100%",
        borderWidth: 2,
        alignItems: 'center',

    },
    cardImage: {
        // flex: 1,
        width: '120%',
        height: '100%',
        // justifyContent: 'flex-start'
        alignItems: 'flex-start', // Hier wurde 'center' zu 'flex-start' geändert

    },
    cardTitle: {
        fontSize: moderateScale(20),
        padding: 10,
        textAlign: 'center',
        color: 'white'
    },
    imageContainer: {
        flex: 1
    },
    titleContainer: {
        flex: 2
    }
});

export default ChooseExerciseCards
