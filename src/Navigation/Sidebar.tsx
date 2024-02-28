import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
//Import Screens
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import BodyweightAnalyse from "../Screens/BodyweightAnalyse";
import WeightInput from "../Screens/WeightInput";
// @ts-ignore
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "@expo/vector-icons/Ionicons";

// @ts-ignore
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChooseAnalyseDayScreen, {
  TBodyweightAnalysePage,
  ChooseTrainingsDay,
} from "./ChooseStackScreen";
import { useNavigation } from "@react-navigation/native";
import Settings from "../Screens/Settings/Settings";
import { authMain, firebaseMain } from "../Database/firebaseConfig";
import { useMyLoginContext } from "../Provider/LoginProvider";
import {StackNavigationProp} from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const Sidebar: React.FC = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const userID = firebaseMain.auth().currentUser?.uid;

    if (userID === "dpMSmD80mkZuTH97vDSY42JmIVg2" || userID === 'ihDhSXt6okVneDGdn0fTKM9rWn52') {
      setAdmin(true);
    }
  }, []);

    const handleSignOut = () => {
        authMain.signOut().then(() => {
            // setLoggedIn(false);
        });
    };

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

const styles = StyleSheet.create({
  iconContainer: {
    width: "8%", // anpassen, je nachdem wie breit das Icon sein soll
    alignItems: "flex-start",
  },
  topBackStyle: {
    backgroundColor: "#242527",
  },
});
