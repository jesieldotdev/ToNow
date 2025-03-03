import React from "react";
import { Text, TextProps } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_300Light, Montserrat_200ExtraLight, Montserrat_500Medium,  Montserrat_800ExtraBold, Montserrat_900Black} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
// import clsx from "clsx";

interface CustomTextProps extends TextProps {
  variant?: "extraLight" | "light" |"regular" | "medium" | "semiBold" | "bold" | "extraBold" | "black";
  className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({ variant = "regular", className, style, ...props }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const fontStyles = {
    extraLight: { fontFamily: "Montserrat_200ExtraLight" },
    light: { fontFamily: "Montserrat_300Light" },
    regular: { fontFamily: "Montserrat_400Regular" },
    medium: { fontFamily: "Montserrat_500Medium" },
    semiBold: { fontFamily: "Montserrat_600SemiBold" },
    bold: { fontFamily: "Montserrat_700Bold" },
    extraBold: { fontFamily: "Montserrat_800ExtraBold" },
    black: { fontFamily: "Montserrat_900Black" },
  };

  return <Text style={[fontStyles[variant], style]} className={className} {...props} />;
};

export default CustomText;
