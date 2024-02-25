import React, {useRef, useState} from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as Date from "../Json/Date.json";

interface DiagrammProps {
    input: number[];
}

const MyLineChart = (props: DiagrammProps) => {

    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height)
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width)
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const chartContainerRef = useRef<View>(null);

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
                    // Der Klick erfolgt außerhalb des Linecharts und des Tooltip-Bereichs
                    setSelectedPoint(null);
                }
            });
        }
    };



    return (
        <>
            <LineChart
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: props.input,
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={screenWidth - screenWidth * 0.14}
                height={screenHeight - screenHeight * 0.8}
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
