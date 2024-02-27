import {Image, StyleSheet, useWindowDimensions, View} from "react-native";

export default function LoadingScreen() {
    const {height, width, scale, fontScale} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/bandage-icon.png')}
                style={[styles.image, {width: width, height: height}]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2d3b55",
    },
    image: {
        resizeMode: 'contain',
    },
});
