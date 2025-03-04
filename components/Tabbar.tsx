import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface TabBarProps extends BottomTabBarProps {}

const TabBar = ({ navigation, state }: TabBarProps) => {
  const [, actions, select] = useStore();
  const {
    task: { setTask },
  } = actions;

  const theme = useSelector((state: RootState) => state.setting.theme); // Obtém o tema do Redux
  const isOpen = select("task.taskModalTable");
  const showTab = select("setting.showTabBar");

  function handleAdd() {
    setTask("taskModalTable", !isOpen);
  }

  if (!showTab) return null;

  return (
    <View
      className={`absolute bottom-0 left-0 right-0 p-4 flex-row justify-around items-center 
        ${theme === "dark" ? "bg-bgDark" : "bg-bgLight"} 
        shadow-md  rounded-t-2xl
      `}
    >
      {/* Botão Home */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome
          name="clock-o"
          size={24}
          style={{ color: state.index === 0 ? "#3B82F6" : theme === "dark" ? "#4b5563" : "#6B7280" }}
        />
      </TouchableOpacity>

      {/* Botão de Adicionar */}
      <TouchableOpacity
        onPress={handleAdd}
        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg"
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Botão Perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <FontAwesome
          name="user"
          size={24}
          style={{ color: state.index === 1 ? "#3B82F6" : theme === "dark" ? "#4b5563" : "#6B7280" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
