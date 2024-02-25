import {Dimensions, StyleSheet, Text} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React from "react";
import MyLineChart from "./LineChart";

const MyBezierLineChart = () => {
    return (
        <>
            <Text style={styles.header}>Bezier Line Chart</Text>
            <LineChart
                data={{
                    labels: ['January', 'February', 'March', 'April'],
                    datasets: [
                        {
                            data: [
                                90.0,
                                89.3,
                                88.8,
                                87.1,
                                86.9,
                                85.6,
                                87.0,
                                86,
                                85,
                                84,
                                84,
                                83,
                                82,
                                81,
                                80,
                                79,
                                78,
                                77
                            ],
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 16} // from react-native
                height={220}
                yAxisLabel={'Rs'}
                chartConfig={{
                    backgroundColor: 'black',
                    backgroundGradientFrom: 'black',
                    backgroundGradientTo: 'black',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 255) => `white`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </>
    );
};

export default MyBezierLineChart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: 16,
    },
})
