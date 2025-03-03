import React from "react";
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View className="flex-1 bg-white p-6">
      {/* Foto de Perfil */}
      <View className="items-center mt-6">
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }} // Imagem temporária
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-bold mt-3">Nome do Usuário</Text>
        <Text className="text-gray-500">email@exemplo.com</Text>
      </View>

      {/* Configurações */}
      <View className="mt-8">
        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <Text className="text-lg">Alterar Senha</Text>
          <AntDesign name="right" size={18} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <Text className="text-lg">Notificações</Text>
          <AntDesign name="right" size={18} color="gray" />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <Text className="text-lg">Modo Escuro</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-red-500 p-3 rounded-lg mt-10"
        onPress={() => console.log("Logout")}
      >
        <Feather name="log-out" size={20} color="white" />
        <Text className="text-white text-lg ml-2">Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
