import React from "react";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {moderateScale} from "react-native-size-matters";
import NetworkLogger from "react-native-network-logger";

export default function LegAnalyse() {
    const {height, width, scale, fontScale} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <NetworkLogger theme={"dark"}/>
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
