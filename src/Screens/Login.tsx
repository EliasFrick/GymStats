import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useMyLoginContext } from "../Provider/LoginProvider";
import CustomButton from "../CustomComponents/ChooseTrainDay";
import React, { useEffect, useState } from "react";
import { moderateScale } from "react-native-size-matters";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginPage } from "../Types/StackScreens";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authMain, firebaseMain } from "../Database/firebaseConfig";
import { firebaseUser } from "../Database/firebaseConfig-User";

type SignIn = StackNavigationProp<LoginPage, "LoginPage">;

type Props = {
  navigation: SignIn;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const {
    loggedIn,
    email,
    age,
    username,
    setLoggedIn,
    setAge,
    setUsername,
    setEmail,
  } = useMyLoginContext();
  const { height, width, scale, fontScale } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [user, setUser] = useState<any | null>(null);

  const tryLogin = async () => {
    setPassword("Test7193!");
    setLoginEmail("Test@Test.de");
    try {
      await signInWithEmailAndPassword(authMain, loginEmail, password);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("RegisterPage");
  };

  return (
    <KeyboardAvoidingView
      // @ts-ignore
      behavior={"behaviour"}
      style={styles.container}
    >
      <View style={styles.BackGroundCanvas}>
        <View
          style={[styles.contentContainer, { marginBottom: height * 0.001 }]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode={"tail"}>
              Login
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.usernameInput,
                {
                  height: height * 0.04,
                  width: width * 0.7,
                  marginTop: height * 0.08,
                  color: "white",
                },
              ]}
              // value={"elias.frick.04@gmail.com"}
              onChangeText={(text) => setLoginEmail(text)}
              placeholder="Email"
              placeholderTextColor={"white"}
              textContentType={"emailAddress"}
            ></TextInput>
            <TextInput
              style={[
                styles.passwordInput,
                {
                  height: height * 0.04,
                  width: width * 0.7,
                  color: "white",
                },
              ]}
              // value={"Elias7193!"}
              secureTextEntry={showPassword}
              onChangeText={(text) => setPassword(text)}
              placeholder="Passwort"
              placeholderTextColor={"white"}
              textContentType={"password"}
            >
              {/*<Icon name={'eye'} size={22}/>*/}
            </TextInput>
          </View>
          <View
            style={[
              styles.buttonContainer,
              { height: height * 0.1, width: width * 0.7 },
            ]}
          >
            <CustomButton title={"Login"} onPress={tryLogin} />
            <CustomButton title={"Registrieren"} onPress={navigateToRegister} />
          </View>
          {/*<View style={styles.appleLoginContainer}>*/}
          {/*  <Auth />*/}
          {/*</View>*/}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  title: {
    flex: 1,
    fontSize: moderateScale(30),
    color: "white",
  },
  titleContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  usernameInput: {
    borderWidth: 1.2,
  },
  passwordInput: {
    borderWidth: 1.2,
    marginTop: "10%",
  },
  inputContainer: {
    // marginTop: '20%'
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appleLoginContainer: {},
});
