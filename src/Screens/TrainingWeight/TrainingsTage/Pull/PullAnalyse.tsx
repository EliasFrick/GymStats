import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import ChooseExerciseCards from "../../../../CustomComponents/ChooseExerciseCard";
import { moderateScale } from "react-native-size-matters";

import PullDown from "../../../../assets/PullDown.png";
import PullUps from "../../../../assets/PullUps.png";
import TBarRow from "../../../../assets/TBar-Row.png";
import Deadlift from "../../../../assets/Deadlift.png";
import EngesRudern from "../../../../assets/EngesRudern.png";
import LanghantelRudern from "../../../../assets/LanghantelRudern.png";
import HighRow from "../../../../assets/HighRow.png";
import FaePulls from "../../../../assets/FacePulls.png";
import ReverFlys from "../../../../assets/CableFlyReverse.png";
import Überzüge from "../../../../assets/Überzüge.png";
import SZCurls from "../../../../assets/SZCurls.png";
import HammerCurls from "../../../../assets/HammerCurls.png";
import UnterarmCurlsInnen from "../../../../assets/UnterarmCurlsInnen.png";
import UnterarmCurlsAußen from "../../../../assets/UnterarmCurlsAußen.png";
import PreacherCurls from "../../../../assets/PreacherCurls.png";
import FaceawayCurls from "../../../../assets/FaceAwayCurls.png";
import SpiderCurls from "../../../../assets/SpiderCurls.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { navigateToPullAnalyseScreen } from "../../../../Types/StackScreens";

type ChooseBlogScreen = StackNavigationProp<
    navigateToPullAnalyseScreen,
  "PullAnalyse"
>;

type Props = {
  navigation: ChooseBlogScreen;
};

const PullAnalyse: React.FC<Props> = ({ navigation }) => {
  const { height, width, scale, fontScale } = useWindowDimensions();

  const navigateToPullAnalyse = (exerciseName: string) => {
    const param: any = {
      exerciseName: exerciseName,
    };

    navigation.navigate("ShowPullAnalyse", param);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.BackGroundCanvas}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pull</Text>
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Latzug"}
            imageSource={PullDown}
            onPress={() => navigateToPullAnalyse("Latzug")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Klimmzug"}
            imageSource={PullUps}
            onPress={() => navigateToPullAnalyse("Klimmzug")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"TBar-Row"}
            imageSource={TBarRow}
            onPress={() => navigateToPullAnalyse("TBar-Row")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Enges Rudern"}
            imageSource={EngesRudern}
            onPress={() => navigateToPullAnalyse("Enges Rudern")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Langhantel Rudern"}
            imageSource={LanghantelRudern}
            onPress={() => navigateToPullAnalyse("Langhantel Rudern")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Kreuzheben"}
            imageSource={Deadlift}
            onPress={() => navigateToPullAnalyse("Kreuzheben")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"High Rows"}
            imageSource={HighRow}
            onPress={() => navigateToPullAnalyse("High Rows")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Face pulls"}
            imageSource={FaePulls}
            onPress={() => navigateToPullAnalyse("Face pulls")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Reverse Flys"}
            imageSource={ReverFlys}
            onPress={() => navigateToPullAnalyse("Reverse Flys")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Überzüge"}
            imageSource={Überzüge}
            onPress={() => navigateToPullAnalyse("Überzüge")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"SZ Curls"}
            imageSource={SZCurls}
            onPress={() => navigateToPullAnalyse("SZ Curls")}
          />
        </View>
        <View
          style={[styles.Cards, { height: height * 0.12, marginBottom: 30 }]}
        >
          <ChooseExerciseCards
            title={"Preacher Curls"}
            imageSource={PreacherCurls}
            onPress={() => navigateToPullAnalyse("Preacher Curls")}
          />
        </View>
        <View
          style={[styles.Cards, { height: height * 0.12, marginBottom: 30 }]}
        >
          <ChooseExerciseCards
            title={"Face away Curls"}
            imageSource={FaceawayCurls}
            onPress={() => navigateToPullAnalyse("Face away Curls")}
          />
        </View>
        <View
          style={[styles.Cards, { height: height * 0.12, marginBottom: 30 }]}
        >
          <ChooseExerciseCards
            title={"Spider Curls"}
            imageSource={SpiderCurls}
            onPress={() => navigateToPullAnalyse("Spider Curls")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Hammer Curls"}
            imageSource={HammerCurls}
            onPress={() => navigateToPullAnalyse("Hammer Curls")}
          />
        </View>
        <View style={[styles.Cards, { height: height * 0.12 }]}>
          <ChooseExerciseCards
            title={"Unterarm Curls Innen"}
            imageSource={UnterarmCurlsInnen}
            onPress={() => navigateToPullAnalyse("Unterarm Curls Innen")}
          />
        </View>
        <View
          style={[styles.Cards, { height: height * 0.12, marginBottom: 30 }]}
        >
          <ChooseExerciseCards
            title={"Unterarm Curls Außen"}
            imageSource={UnterarmCurlsAußen}
            onPress={() => navigateToPullAnalyse("Unterarm Curls Außen")}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default PullAnalyse;

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
  title: {
    color: "white",
    fontSize: moderateScale(25),
  },
  titleContainer: {
    flex: 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  Cards: {
    flex: 1,
    marginTop: 20,
    // backgroundColor: 'green',
    // height: '200%'
  },
});
