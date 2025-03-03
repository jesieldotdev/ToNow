import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabBar = () => {

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
        elevation: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <TouchableOpacity>
        <FontAwesome name="clock-o" size={24} color="#3B82F6" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#3B82F6",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#3B82F6",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
          marginBottom: 20,
        }}
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome name="user" size={24} color="#D1D5DB" />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
