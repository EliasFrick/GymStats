import React from "react";
import {View, Text, StyleSheet, useWindowDimensions} from "react-native";

export default function TitleScreen() {
    const {height, width, scale, fontScale} = useWindowDimensions();

    return(
        <View style={styles.container}>
            <Text style={[styles.titleText, {fontSize: fontScale * 70, marginTop: height * 0.1}]}> Fitness App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b3340',
        padding: 20,
        alignItems: 'center', // horizontal zentrieren
        // justifyContent: 'center', // vertikal zentrieren
    },
    titleText:{
        color: 'white'
    }
})
