import React from "react";
import { Text, TextProps } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
// import clsx from "clsx";

interface CustomTextProps extends TextProps {
  variant?: "regular" | "semiBold" | "bold";
  className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({ variant = "regular", className, style, ...props }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const fontStyles = {
    regular: { fontFamily: "Montserrat_400Regular" },
    semiBold: { fontFamily: "Montserrat_600SemiBold" },
    bold: { fontFamily: "Montserrat_700Bold" },
  };

  return <Text style={[fontStyles[variant], style]} className={className} {...props} />;
};

export default CustomText;
