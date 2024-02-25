import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomButton from "../../CustomComponents/ChooseTrainDay";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChooseTrainingsDay } from "../../Types/StackScreens";

type ChooseBlogScreen = StackNavigationProp<
  ChooseTrainingsDay,
  "Trainingsplan"
>;

type Props = {
  navigation: ChooseBlogScreen;
};

const Trainingsplan: React.FC<Props> = ({ navigation }) => {
  const [showLegDay, setShowLegDay] = useState<boolean>(false)

  const navigateToPushDay = () => {
    navigation.navigate("PushTrainingDay");
  };

  const navigateToPullDay = () => {
    navigation.navigate("PullTrainingDay");
  };

  const navigateToLegDay = () => {
    navigation.navigate("LegTrainingDay");
  };

  return (
    <View style={styles.container}>
      <View style={styles.BackGroundCanvas}>
        <View style={styles.buttonContainer}>
          <CustomButton
            color={"grey"}
            title={"Push Training"}
            onPress={navigateToPushDay}
          />
          <CustomButton
            color={"grey"}
            title={"Pull Training"}
            onPress={navigateToPullDay}
          />
          {showLegDay && (
              <CustomButton
            color={"grey"}
            title={"Leg Training"}
            onPress={navigateToLegDay}
          />
              )}
        </View>
        {/*<Auth />*/}
      </View>
    </View>
  );
};

export default Trainingsplan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2b3340",
  },
  BackGroundCanvas: {
    flex: 1,
    backgroundColor: "#2d3b55",
    padding: 20,
    borderRadius: 40,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25%",
  },
});
