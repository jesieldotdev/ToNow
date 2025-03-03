import { StatusBar } from "expo-status-bar";
import "./global.css";
import Schedule from "components/ScreenContent";
import TabBar from "./components/Tabbar"; // Importe o TabBar
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { View } from "react-native";
import { useState } from "react";
import CreateTodo from "components/CreateTodo";

export default function App() {
  const [isVisible, setIsVisible] = useState(true);

  const handleAddTodo = (title: string, description: string, time: string) => {
    console.log("Nova tarefa:", { title, description, time });
  };

function handleAdd(){
  setIsVisible(prev => !prev) 
}

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
      <TabBar handleAdd={handleAdd} />
      <StatusBar style="light" />
      <CreateTodo visible={isVisible} onClose={() => setIsVisible(false)} onAdd={handleAddTodo} />

    </View>
  );
}
