import { StatusBar } from 'expo-status-bar';

import './global.css';
import Schedule from 'components/ScreenContent';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { globalStyles } from "./styles/globalStyles";
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Schedule />
      <StatusBar style="auto" />
    </>
  );
}
