import React, { useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useMyContext } from "../Provider/ToggleChartProvider";
import { moderateScale } from "react-native-size-matters";

export const screenWidth = Dimensions.get("window").width;
let componentWidth = screenWidth;
let buttonWidth = screenWidth;

interface TransportMethodProps {}

const ToggleSwitch: React.FC<TransportMethodProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentActive, setCurrentActive] = useState<string>("Alles");
  const [buttonWidth, setButtonWidth] = useState<number>(10);
  const [alles, setAlles] = useState<boolean>();
  const [aufbau, setAufbau] = useState<boolean>();
  const [diet, setDiet] = useState<boolean>();
  const {
    toggleDiet,
    toggleBulk,
    setToggleDiet,
    setToggleBulk,
    toggleAverage,
    setToggleAverage,
  } = useMyContext();

  const updateIndex = (active: string) => {
    if (active === "Alles") {
      slideLeft();
      setCurrentActive("Alles");
      setAlles(true);
      setAufbau(false);
      setDiet(false);
    } else if (active === "Aufbau") {
      slideMiddle();
      setCurrentActive("Aufbau");
      setAlles(false);
      setAufbau(true);
      setDiet(false);
    } else if (active === "Diät") {
      slideRight();
      setCurrentActive("Diät");
      setAlles(false);
      setAufbau(false);
      setDiet(true);
    }

    switch (active) {
      case "Alles":
        setToggleAverage(true);
        setToggleBulk(false);
        setToggleDiet(false);
        break;
      case "Aufbau":
        setToggleAverage(false);
        setToggleBulk(true);
        setToggleDiet(false);
        break;
      case "Diät":
        setToggleAverage(false);
        setToggleBulk(false);
        setToggleDiet(true);
        break;
    }
  };

  const handleViewRef = useRef<Animatable.View>(null);

  const slideMiddle = () => {
    if (currentActive === "Alles" && buttonWidth) {
      handleViewRef.current?.animate({
        0: {
          translateX: 0,
        },
        1: {
          translateX: buttonWidth,
        },
      });
    } else if (currentActive === "Diät" && buttonWidth) {
      handleViewRef.current?.animate({
        0: {
          translateX: buttonWidth * 2,
        },
        1: {
          translateX: buttonWidth,
        },
      });
    }
  };

  const slideRight = () => {
    if (currentActive === "Alles" && buttonWidth) {
      handleViewRef.current?.animate({
        0: {
          translateX: 0,
        },
        1: {
          translateX: buttonWidth * 2,
        },
      });
    } else if (currentActive === "Aufbau" && buttonWidth) {
      handleViewRef.current?.animate({
        0: {
          translateX: buttonWidth,
        },
        1: {
          translateX: buttonWidth * 2,
        },
      });
    }
  };

  const slideLeft = () => {
    if (currentActive === "Aufbau" && buttonWidth) {
      handleViewRef.current?.animate({
        0: {
          translateX: buttonWidth,
        },
        1: {
          translateX: 0,
        },
      });
    } else if (currentActive === "Diät" && buttonWidth) {
      handleViewRef.current?.animate({
        0: {
          translateX: buttonWidth * 2,
        },
        1: {
          translateX: 0,
        },
      });
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View
        style={styles.backgroundSwitch}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          // setButtonWidth(width)
        }}
      >
        <Animatable.View
          duration={500}
          style={styles.buttonSwitch}
          ref={handleViewRef}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setButtonWidth(width);
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={() => updateIndex("Alles")}>
            <Text style={[styles.textOption]}>Alles</Text>
          </Pressable>
          <Pressable onPress={() => updateIndex("Aufbau")}>
            <Text style={[styles.textOption]}>Aufbau</Text>
          </Pressable>
          <Pressable onPress={() => updateIndex("Diät")}>
            <Text style={[styles.textOption]}>Diät</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundSwitch: {
    backgroundColor: "#2d3b55",
    height: 50,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#505c76",
    justifyContent: "center",
    width: "100%",
  },
  textOption: {
    width: "100%",
    textAlign: "center",
    color: "white",
    paddingHorizontal: "12%",
  },
  buttonSwitch: {
    position: "absolute",
    backgroundColor: "#e93359",
    height: "100%",
    width: "33.3%",
    borderRadius: 100,
  },
});

export default ToggleSwitch;
