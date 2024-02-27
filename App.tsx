import { MyDietProvider } from "./src/Provider/DietProvider";
import { ToggleChartProvider } from "./src/Provider/ToggleChartProvider";
import { RootSiblingParent } from "react-native-root-siblings";
import { MyLoginProvider } from "./src/Provider/LoginProvider";
import Main from "./src/Main";
import {useEffect} from "react";

export default function App() {

    useEffect(() => {

    }, []);


  return (
    <RootSiblingParent>
      <MyLoginProvider>
        <MyDietProvider>
          <ToggleChartProvider>
            <Main />
          </ToggleChartProvider>
        </MyDietProvider>
      </MyLoginProvider>
    </RootSiblingParent>
  );
}
