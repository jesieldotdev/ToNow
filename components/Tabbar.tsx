import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useStore from "hooks/useStore";

interface TabBarProps extends BottomTabBarProps {}

const TabBar = ({ navigation, state }: TabBarProps) => {
  const [, actions, select] = useStore();
  const {
    task: { setTask },
  } = actions;
  const isOpen = select("task.taskModalTable");
  const showTab = select("setting.showTabBar");

  function handleAdd() {
    setTask("taskModalTable", !isOpen);
  }

  if(!showTab) return

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {/* Botão Home */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome
          name="clock-o"
          size={24}
          color={state.index === 0 ? "#3B82F6" : "#D1D5DB"} // Azul se for ativo, cinza se não for
        />
      </TouchableOpacity>

      {/* Botão de Adicionar */}
      <TouchableOpacity
        onPress={handleAdd}
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#3B82F6",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#3B82F6",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
          marginBottom: 20,
        }}
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Botão Perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <FontAwesome
          name="user"
          size={24}
          color={state.index === 1 ? "#3B82F6" : "#D1D5DB"} // Azul se for ativo, cinza se não for
        />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
