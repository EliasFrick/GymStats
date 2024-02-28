import { MyDietProvider } from "./src/Provider/DietProvider";
import { ToggleChartProvider } from "./src/Provider/ToggleChartProvider";
import { RootSiblingParent } from "react-native-root-siblings";
import { MyLoginProvider } from "./src/Provider/LoginProvider";
import Main from "./src/Main";

export default function App() {

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
