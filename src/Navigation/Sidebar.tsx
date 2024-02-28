import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, useWindowDimensions } from "react-native";
import WeightInput from "../Screens/WeightInput";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChooseAnalyseDayScreen, {
  TBodyweightAnalysePage,
  ChooseTrainingsDay,
} from "./ChooseStackScreen";
import { authMain, firebaseMain } from "../Database/firebaseConfig";

const Tab = createBottomTabNavigator();

const Sidebar: React.FC = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const userID = firebaseMain.auth().currentUser?.uid;

    if (userID === "dpMSmD80mkZuTH97vDSY42JmIVg2" || userID === 'eNP7b4ymLOUvVMx0hSrGp62mQ242') {
      setAdmin(true);
    }
  }, []);

  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          headerShadowVisible: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;
            if (route.name === "Trainingstag-auswählen") {
              size = focused ? 35 : 25;
              return <Ionicons name={"barbell"} size={size} color={color} />;
            } else if (route.name === "TrainingsAnalyse") {
              size = focused ? 35 : 25;
              return <Ionicons name={"trophy"} size={size} color={color} />;
            } else if (route.name === "Körpergewichteingabe") {
              size = focused ? 35 : 25;
              return <Ionicons name={"archive"} size={size} color={color} />;
            } else if (route.name === "BodyweightAnalyse") {
              size = focused ? 35 : 25;
              return <Ionicons name={"analytics"} size={size} color={color} />;
            }
          },
          tabBarInactiveBackgroundColor: "#2b3340",
          tabBarActiveBackgroundColor: "#2b3340",
          tabBarActiveTintColor: "red",
          headerTintColor: "white",
          tabBarLabel: "",
          tabBarLabelStyle: {
            color: "green",
          },
          headerStyle: {
            backgroundColor: "#2b3340",
          },
          tabBarStyle: {
            backgroundColor: "#2b3340",
          },
        })}
      >
        <Tab.Screen
          name="Trainingstag-auswählen"
          component={ChooseTrainingsDay}
        />
        <Tab.Screen
          name="TrainingsAnalyse"
          component={ChooseAnalyseDayScreen}
        />
        {admin && (
          <Tab.Screen name="Körpergewichteingabe" component={WeightInput} />
        )}
        {admin && (
          <Tab.Screen
            name="BodyweightAnalyse"
            component={TBodyweightAnalysePage}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Sidebar;
