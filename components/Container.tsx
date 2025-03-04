import React from "react";
import { View } from "react-native";

export const Container = ({ theme, children }: { theme: string; children: React.ReactNode }) => {
  return (
    <View className={`flex-1 px-6 pt-12 ${theme === "dark" ? "bg-bgDark" : "bg-bgLight"}`}>
      {children}
    </View>
  );
};
