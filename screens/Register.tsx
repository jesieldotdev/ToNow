import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import CustomText from "components/CustomText";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useStore from "hooks/useStore";

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [, actions, select] = useStore();
    const {
        setting: { setSetting },
    } = actions;

    const showTab = select('setting.showTabBar')

    useEffect(() => {
        setSetting('showTabBar', false)

    }, []);

    function handleLogin() {

        navigation.navigate("Login")
    }

    return (
        <View className="flex-1 bg-gray-100 px-6 pt-16">
            {/* Cabeçalho */}
            <CustomText variant="bold" className="text-2xl text-gray-900 mb-6">
                Criar Conta
            </CustomText>

            {/* Input Nome */}
            <View className="bg-white p-4 py-2 rounded-lg flex-row items-center mb-4 shadow-sm">
                <AntDesign name="user" size={20} color="#6B7280" />
                <TextInput
                    className="ml-3 flex-1 text-gray-900 text-lg"
                    placeholder="Nome Completo"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Input E-mail */}
            <View className="bg-white p-4 py-2 rounded-lg flex-row items-center mb-4 shadow-sm">
                <AntDesign name="mail" size={20} color="#6B7280" />
                <TextInput
                    className="ml-3 flex-1 text-gray-900 text-lg"
                    placeholder="E-mail"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Input Senha */}
            <View className="bg-white p-4 py-2 rounded-lg flex-row items-center mb-6 shadow-sm">
                <AntDesign name="lock" size={20} color="#6B7280" />
                <TextInput
                    className="ml-3 flex-1 text-gray-900 text-lg"
                    placeholder="Senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Botão de Registro */}
            <TouchableOpacity
                className="bg-blue-500 p-4 rounded-lg items-center shadow-md active:opacity-80"
                onPress={() => handleLogin()}
            >
                <CustomText variant="bold" className="text-white text-lg">
                    Criar Conta
                </CustomText>
            </TouchableOpacity>

            {/* Já tem uma conta? */}
            <TouchableOpacity className="mt-6 flex-row justify-center">
                <CustomText variant="regular" className="text-gray-600">
                    Já tem uma conta?{" "}
                </CustomText>
                <CustomText
                    variant="medium"
                    className="text-blue-500"
                    onPress={() => navigation.navigate("Login")}
                >
                    Entrar
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
