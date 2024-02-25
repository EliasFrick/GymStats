import React, { createContext, ReactNode, useContext, useState } from 'react';

// Definition der Kontext-Props
interface MyContextProps {
    diet: boolean;
    bulk: boolean;
    average: boolean;
    setDiet: (value: boolean) => void;
    setBulk: (value: boolean) => void;
    setAverage: (value: boolean) => void;
}

// Erstellung des Kontexts
const DietProvider = createContext<MyContextProps | undefined>(undefined);

// Provider-Komponente
export const MyDietProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [diet, setDiet] = useState<boolean>(false);
    const [bulk, setBulk] = useState<boolean>(false);
    const [average, setAverage] = useState<boolean>(false);

    const contextValue: MyContextProps = {
        diet,
        bulk,
        average,
        setDiet,
        setBulk,
        setAverage
    };

    return <DietProvider.Provider value={contextValue}>{children}</DietProvider.Provider>;
};

// Hook für die Verwendung des Kontexts
export const useMyContext = () => {
    const context = useContext(DietProvider);
    if (!context) {
        throw new Error('useMyContext muss innerhalb von MyProvider verwendet werden');
    }
    return context;
};
