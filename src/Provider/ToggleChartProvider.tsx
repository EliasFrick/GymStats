import React, { createContext, ReactNode, useContext, useState } from 'react';

// Definition der Kontext-Props
interface MyContextProps {
    toggleDiet: boolean;
    toggleBulk: boolean;
    toggleAverage: boolean;
    setToggleDiet: (value: boolean) => void;
    setToggleBulk: (value: boolean) => void;
    setToggleAverage: (value: boolean) => void;
}

// Erstellung des Kontexts
const DietProvider = createContext<MyContextProps | undefined>(undefined);

// Provider-Komponente
export const ToggleChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toggleDiet, setToggleDiet] = useState<boolean>(false);
    const [toggleBulk, setToggleBulk] = useState<boolean>(false);
    const [toggleAverage, setToggleAverage] = useState<boolean>(true);

    const contextValue: MyContextProps = {
        toggleDiet,
        toggleBulk,
        toggleAverage,
        setToggleDiet,
        setToggleBulk,
        setToggleAverage
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
