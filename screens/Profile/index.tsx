import React from "react";
import { View, Image, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomText from "components/CustomText";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import { RootState } from "store";

const ProfileScreen = () => {
  const [, actions, select] = useStore();
  const { setting: { setSetting } } = actions;

  const theme = useSelector((state: RootState) => state.setting.theme); // Obtém o tema do Redux
  const navigation = useNavigation(); // Hook para navegação

  function handleLogout() {
    console.log("Usuário deslogado");

    // Redefine a navegação para que o usuário vá para a tela de login e não possa voltar
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <View className={`flex-1 px-6 pt-12 ${theme === "dark" ? "bg-bgDark" : "bg-bgLight"}`}>
      {/* Cabeçalho */}
      <CustomText variant="bold" className={`text-2xl mb-6 ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
        Perfil
      </CustomText>

      {/* Foto de Perfil */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }} // Imagem temporária
          className="w-24 h-24 rounded-full border-4 border-primary"
        />
        <CustomText variant="bold" className={`text-xl mt-3 ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
          Nome do Usuário
        </CustomText>
        <CustomText variant="regular" className={`text-sm mt-1 ${theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"}`}>
          email@exemplo.com
        </CustomText>
      </View>

      {/* Cartões de Configuração */}
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

        <View className="flex-row items-center justify-between p-4">
          <CustomText variant="medium" className={`text-lg ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
            Modo Escuro
          </CustomText>
          <Switch
            value={theme === "dark"}
            onValueChange={() => setSetting('theme' , theme === "dark" ? "light" : "dark")} // Alterna o tema
          />
        </View>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-red-500 p-4 rounded-xl mt-10 shadow-lg active:opacity-80"
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
