import { StatusBar } from "expo-status-bar";
import "./global.css";
import Schedule from "screens/Schedule/index";
import TabBar from "./components/Tabbar";
import { View } from "react-native";
import { useEffect, useState } from "react";
import CreateTodo from "components/CreateTodo";
import Store from "./store";
import useStore from "hooks/useStore";
import { sortTasks } from "store/task/utils";
import TabNavigator from "components/AppNavigator";
import * as NavigationBar from "expo-navigation-bar";


export default function App() {
  return (
    <Store>
      <AppContent />
    </Store>
  );
}

function AppContent() {
  useEffect(() => {
    // Define a cor da barra inferior para branco
    NavigationBar.setBackgroundColorAsync("#fff");
    NavigationBar.setButtonStyleAsync("dark"); // Ícones escuros para melhor visibilidade
  }, []);

  return (
    <>
      <TabNavigator />
      <StatusBar style="light" backgroundColor="#fff" translucent={false} />
    </>
  );
}
