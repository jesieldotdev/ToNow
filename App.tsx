import { StatusBar } from "expo-status-bar";
import "./global.css";
import Schedule from "components/ScreenContent";
import TabBar from "./components/Tabbar"; // Importe o TabBar
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { View } from "react-native";

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
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <Schedule />
      <TabBar />
      <StatusBar style="auto" />
    </View>
  );
}
