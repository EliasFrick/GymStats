import {Platform, useWindowDimensions} from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import {useMyLoginContext} from "../Provider/LoginProvider";
// import { supabase } from 'app/utils/supabase'
import ToastMessage from "../Functions/ToastMessage";

export function Auth() {

    const {loggedIn, email, age, username, appleUsername, setAppleUsername, setLoggedIn, setAge, setUsername, setEmail} = useMyLoginContext();
    const {height, width, scale, fontScale} = useWindowDimensions();

    if (Platform.OS === 'ios')
        return (
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: width * 0.80, height: height *  0.064, marginTop: height * 0.1 }}
                onPress={async () => {
                    try {
                        const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                        })
                        console.log(credential)
                        ToastMessage("Erfolgreich angemeldet")
                        // setAppleUsername(credential.fullName?.givenName + credential.fullName?.familyName)
                        setUsername(String(credential.fullName?.givenName + ' ' + credential.fullName?.familyName))
                        setLoggedIn(true)
                    } catch (e) {
                        ToastMessage("Fehler bei der Anmeldung")
                    }
                }}
            />
        )
    return <>{/* Implement Android Auth options. */}</>
}
