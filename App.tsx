import {MyDietProvider} from "./src/Provider/DietProvider";
import {ToggleChartProvider} from "./src/Provider/ToggleChartProvider";
import {RootSiblingParent} from "react-native-root-siblings";
import {MyLoginProvider} from "./src/Provider/LoginProvider";
import Main from "./src/Main";
import React from "react";
// import {StatusBar} from "expo-status-bar";
import {View, StatusBar} from 'react-native'

export default function App() {
    return (
        <RootSiblingParent>
            <MyLoginProvider>
                <MyDietProvider>
                    <ToggleChartProvider>
                        <StatusBar barStyle={'light-content'} />
                        <Main/>
                    </ToggleChartProvider>
                </MyDietProvider>
            </MyLoginProvider>
        </RootSiblingParent>
    );
}
