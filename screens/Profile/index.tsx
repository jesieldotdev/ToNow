import { useState } from "react";
import { View, Image, TouchableOpacity, Switch, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomText from "components/CustomText";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "store";
import * as Updates from "expo-updates";
import { accentColors } from "store/setting/utils";

const ProfileScreen = () => {
  const [, actions, select] = useStore();
  const { setting: { setSetting, toggleTheme } } = actions;

  const theme = useSelector((state: RootState) => state.setting.theme);
  const accentColor = useSelector((state: RootState) => state.setting.accentColor);
  const navigation = useNavigation();

  function handleLogout() {
    console.log("Usuário deslogado");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  function handleClearData() {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja apagar todos os dados? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            console.log("Apagando dados persistidos");
            await persistStore(store).purge();
            Alert.alert("Sucesso", "Os dados foram apagados. O app será reiniciado.");
            setTimeout(() => {
              Updates.reloadAsync();
            }, 1000);
          },
        },
      ]
    );
  }

  return (
    <View className={`flex-1 px-6 pt-12 ${theme === "dark" ? "bg-bgDark" : "bg-bgLight"}`}>
      <CustomText variant="bold" className={`text-2xl mb-6 ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
        Perfil
      </CustomText>

      <View className="items-center mb-6">
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          className="w-24 h-24 rounded-full border-4 border-primary"
        />
        <CustomText variant="bold" className={`text-xl mt-3 ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
          Nome do Usuário
        </CustomText>
        <CustomText variant="regular" className={`text-sm mt-1 ${theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"}`}>
          email@exemplo.com
        </CustomText>
      </View>

      <View className={`rounded-xl p-3 shadow-md ${theme === "dark" ? "bg-cardDark border-gray-700" : "bg-cardLight border-gray-200"}`}>
        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          <CustomText variant="medium" className={`text-lg ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
            Alterar Senha
          </CustomText>
          <AntDesign name="right" size={18} color={theme === "dark" ? "#E5E7EB" : "gray"} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          <CustomText variant="medium" className={`text-lg ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
            Notificações
          </CustomText>
          <AntDesign name="right" size={18} color={theme === "dark" ? "#E5E7EB" : "gray"} />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          <CustomText variant="medium" className={`text-lg ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
            Modo Escuro
          </CustomText>
          <Switch
            value={theme === "dark"}
            onValueChange={() => toggleTheme()}
          />
        </View>

        {/* Seleção de Cor Primária - Três opções horizontais */}
        <View className="p-4">
          <CustomText variant="medium" className={`text-lg mb-2 ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
            Cor Principal
          </CustomText>
          <View className="flex-row justify-between w-32">
            {accentColors.map(color => (
              <TouchableOpacity
                key={color}
                onPress={() => setSetting("accentColor", color)}
                className={`w-10 h-10 rounded-full bg-${color} ${accentColor === color ? "border-4 border-primary" : "border border-gray-400"}`}
                // style={{ backgroundColor: color }}
              />
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="flex-row items-center justify-center bg-yellow-500 p-4 rounded-xl mt-6 shadow-lg active:opacity-80"
        onPress={handleClearData}
      >
        <Feather name="trash-2" size={20} color="white" />
        <CustomText variant="bold" className="text-white text-lg ml-2">
          Apagar Dados
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center justify-center border border-cardSecondaryLight p-4 rounded-xl mt-6 shadow-lg active:opacity-80"
        onPress={handleLogout}
      >
        <Feather name="log-out" size={20} color="white" />
        <CustomText variant="bold" className="text-white text-lg ml-2">
          Sair
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
