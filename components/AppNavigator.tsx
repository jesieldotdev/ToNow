import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Schedule from "screens/Schedule";
import TabBar from "components/Tabbar";
import ProfileScreen from "screens/Profile";
import LoginScreen from "screens/Login";
import RegisterScreen from "screens/Register";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} />} // Usa o TabBar customizado
      >
        <Tab.Screen name="Home" component={Schedule} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Register" component={RegisterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
