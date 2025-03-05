
import { useTheme } from "hooks/themeProvider";
import { View } from "react-native";

export const Container = ({ children }: {children: React.ReactNode }) => {
  const {background} = useTheme()
  return (
    <View className={`flex-1 px-6 pt-12 ${background}`}>
      {children}
    </View>
  );
};
