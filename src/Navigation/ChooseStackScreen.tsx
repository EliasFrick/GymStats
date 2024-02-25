import { createStackNavigator } from "@react-navigation/stack";
import PushAnalyse from "../Screens/TrainingWeight/TrainingsTage/Push/PushAnalyse";
import PullAnalyse from "../Screens/TrainingWeight/TrainingsTage/Pull/PullAnalyse";
import LegAnalyse from "../Screens/TrainingWeight/TrainingsTage/Leg/LegAnalyse";
import ChooseAnalyseDay from "../Screens/TrainingWeight/ChooseAnalyseDay";
import Trainingsplan from "../Screens/Trainingsplan/Trainingsplan";
import PushInput from "../Screens/Trainingsplan/TrainingsTage/Push/Input";
import PullInput from "../Screens/Trainingsplan/TrainingsTage/Pull/AlleÜbungen/PullInput";
import LegInput from "../Screens/Trainingsplan/TrainingsTage/Leg/AlleÜbungen/LegInput";
import Push from "../Screens/Trainingsplan/TrainingsTage/Push/Push";
import Pull from "../Screens/Trainingsplan/TrainingsTage/Pull/Pull";
import Leg from "../Screens/Trainingsplan/TrainingsTage/Leg/Leg";
import Register from "../Screens/Register";
import Login from "../Screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "../Screens/Settings/Settings";
import BodyweightAnalyse from "../Screens/BodyweightAnalyse";

const Stack = createStackNavigator();

export default function ChooseAnalyseDayScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseAnalyseDay"
        component={ChooseAnalyseDay}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PushAnalyse"
        component={PushAnalyse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PullAnalyse"
        component={PullAnalyse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LegAnalyse"
        component={LegAnalyse}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function ChooseTrainingsDay() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Trainingsplan"
        component={Trainingsplan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PushTrainingDay"
        component={ChooseInputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PullTrainingDay"
        component={Pull}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LegTrainingDay"
        component={Leg}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function ChooseInputScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PushOverlayDay"
        component={Push}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"PushInput"} component={PushInput} />
      <Stack.Screen name={"PullInput"} component={PullInput} />
      <Stack.Screen name={"LegAna0lyse"} component={LegInput} />
    </Stack.Navigator>
  );
}

export function LoginPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"LoginPage"}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"RegisterPage"}
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function TBodyweightAnalysePage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"BodyweightAnalyseKey"}
        component={BodyweightAnalyse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"SettingPageKey"}
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
