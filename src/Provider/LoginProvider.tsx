import React, { createContext, ReactNode, useContext, useState } from 'react';
// @ts-ignore
import {AppleAuthenticationFullName} from "expo-apple-authentication/src/AppleAuthentication.types";

// Definition der Kontext-Props
interface MyContextProps {
    loggedIn: boolean;
    username: string;
    appleUsername: AppleAuthenticationFullName | null | undefined;
    email: string;
    age: number;
    setAppleUsername:  (value: null | AppleAuthenticationFullName) => void,
    setLoggedIn: (value: boolean) => void,
    setUsername: (value: string) => void,
    setEmail: (value: string) => void,
    setAge: (value: number) => void
}

// Erstellung des Kontexts
const LoginProvider = createContext<MyContextProps | undefined>(undefined);

// Provider-Komponente
export const MyLoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [appleUsername, setAppleUsername] = useState<null | AppleAuthenticationFullName>();
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<number>(0);

    const contextValue: MyContextProps = {
        loggedIn,
        username,
        appleUsername,
        email,
        age,
        setLoggedIn,
        setAppleUsername,
        setUsername,
        setEmail,
        setAge
    };

    return <LoginProvider.Provider value={contextValue}>{children}</LoginProvider.Provider>;
};

// Hook für die Verwendung des Kontexts
export const useMyLoginContext = () => {
    const context = useContext(LoginProvider);
    if (!context) {
        throw new Error('useMyContext muss innerhalb von MyProvider verwendet werden');
    }
    return context;
};
