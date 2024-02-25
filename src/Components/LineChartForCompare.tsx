import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as Date from "../Json/Date.json";

interface DiagrammProps {
    inputUser1: number[];
    colorUser1?: (opacity: number) => string
    inputUser2: number[];
    colorUser2?: (opacity: number) => string
    inputUser3: number[];
    colorUser3?: (opacity: number) => string
}

const MyLineChart = (props: DiagrammProps) => {

    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height)
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width)
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const chartContainerRef = useRef<View>(null);
    const [showUser2, setShowUser2] = useState(true)
    const [showUser3, setShowUser3] = useState(true)

    const handlePointClick = (pointData: { value: number }) => {
        setSelectedPoint(pointData.value);
    };

    const handleContainerPress = (event: { nativeEvent: { locationX: number, locationY: number } }) => {
        const { locationX, locationY } = event.nativeEvent;
        if (chartContainerRef.current) {
            chartContainerRef.current.measure((x, y, width, height, pageX, pageY) => {
                if (
                    locationX < pageX ||
                    locationX > pageX + width ||
                    locationY < pageY ||
                    locationY > pageY + height
                ) {
                    setSelectedPoint(null);
                }
            });
        }
    };

    const testData :number[] = [80, 90, 100, 70, 80]

    const checkForOtherInputs = () => {
        if (props.inputUser2[0] == props.inputUser1[0] && props.inputUser2[1] == props.inputUser1[1]) {
            setShowUser2(false)
            props.inputUser2 = props.inputUser1
        }
        if (props.inputUser3[0] == props.inputUser1[0] && props.inputUser3[1] == props.inputUser1[1]) {
            setShowUser3(false)
            props.inputUser3 = props.inputUser1
        }
    }

    useLayoutEffect(() => {
        checkForOtherInputs()
    }, []);

    return (
        <>
            <LineChart
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: props.inputUser1,
                            strokeWidth: 2,
                            color: props.colorUser1,
                            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        },
                        {
                            data: props.inputUser2,
                            strokeWidth: showUser2 ? 2 : 0, // Setze strokeWidth auf 0, wenn showUser2 false ist
                            color: props.colorUser2,
                            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        },
                        {
                            data: props.inputUser3,
                            strokeWidth: showUser3 ? 2 : 0, // Setze strokeWidth auf 0, wenn showUser2 false ist
                            color: props.colorUser3,
                            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        },
                    ],
                }}
                width={screenWidth - screenWidth * 0.14}
                height={screenHeight - screenHeight * 0.6}
                chartConfig={{
                    backgroundColor: "#2d3b55",
                    backgroundGradientFrom: "#2d3b55",
                    // backgroundGradientFrom: "white",
                    backgroundGradientTo: "#2d3b55",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `#939fb9`,
                    style: {
                        // borderRadius: 16,
                    },
                }}
                style={{
                    // marginVertical: 8,
                    // borderRadius: 16,
                }}
                onDataPointClick={handlePointClick} // Hier fügen Sie den Event-Handler hinzu
            />
            {selectedPoint !== null && (
                <View style={styles.tooltipContainer}>
                    <Text style={styles.tooltipText}>
                        Selected Value: {selectedPoint}
                    </Text>
                </View>
            )}
        </>
    );
};

export default MyLineChart;

const styles = StyleSheet.create({
    tooltipContainer: {
        position: "absolute",
        backgroundColor: '#2d3b55',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        top: 50,
        left: 10,
    },
    tooltipText: {
        color: "white",
    },
});
