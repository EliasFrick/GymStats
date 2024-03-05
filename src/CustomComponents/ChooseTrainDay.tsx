import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import {moderateScale} from "react-native-size-matters";

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    onPress?: (param?: any) => void;
    color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, color = 'blue', style, ...props }) => {
    const buttonStyle: ViewStyle = {
        backgroundColor: color,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // ...style,
    };

    return (
        <TouchableOpacity style={styles.button} onPress={onPress} {...props}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
    },
    button: {
        backgroundColor: '#e93359',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: '5%'
    },
    buttonText: {
        color: 'white',
        fontSize: moderateScale(25),
    },
});

export default CustomButton;
