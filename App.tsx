import { StatusBar } from "expo-status-bar";
// import "nativewind/css";
import "./global.css";
import TabNavigator from "components/AppNavigator";
import Store from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
  return (
    <Store>
      <AppContent />
    </Store>
  );
}

function AppContent() {
  const theme = useSelector((state: RootState) => state.setting.theme); 

  useEffect(() => {
    
    NavigationBar.setBackgroundColorAsync(theme === "dark" ? "#282828" : "#fff");
    NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark"); 
  }, [theme]);

  return (
    <>
      <TabNavigator />
      <StatusBar style={theme === "dark" ? "light" : "dark"} backgroundColor={theme === "dark" ? "#282828" : "#fff"} translucent={false} />
    </>
  );
}
