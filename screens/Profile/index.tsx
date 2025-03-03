import React, { useState } from "react";
import { View, Image, TouchableOpacity, Switch } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomText from "components/CustomText";

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View className="flex-1 bg-gray-100 px-6 pt-4">
      {/* Cabeçalho */}
      <CustomText variant="bold" className="text-2xl text-gray-900 mb-6">
        Perfil
      </CustomText>

      {/* Foto de Perfil */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: "https://i.pravatar.cc/140" }} // Imagem temporária
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <CustomText variant="bold" className="text-xl mt-3 text-gray-900">
          Nome do Usuário
        </CustomText>
        <CustomText variant="regular" className="text-gray-500 text-sm mt-1">
          email@exemplo.com
        </CustomText>
      </View>

      {/* Cartões de Configuração */}
      <View className="bg-white rounded-xl p-3 shadow-md">
        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <CustomText variant="medium" className="text-lg text-gray-800">
            Alterar Senha
          </CustomText>
          <AntDesign name="right" size={18} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <CustomText variant="medium" className="text-lg text-gray-800">
            Notificações
          </CustomText>
          <AntDesign name="right" size={18} color="gray" />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between p-4">
          <CustomText variant="medium" className="text-lg text-gray-800">
            Modo Escuro
          </CustomText>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-red-500 p-4 rounded-xl mt-10 shadow-lg active:opacity-80"
        onPress={() => console.log("Logout")}
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
