import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import CustomText from "components/CustomText";
import { AntDesign } from "@expo/vector-icons";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import { RootState } from "store";

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [, actions, select] = useStore();
    const { setting: { setSetting } } = actions;
    const theme = useSelector((state: RootState) => state.setting.theme); // Obtém o tema do Redux

    useEffect(() => {
        setSetting("showTabBar", false);
    }, []);

    function handleLogin() {
        navigation.navigate("Login");
    }

    return (
        <View className={`flex-1 px-6 pt-16 ${theme === "dark" ? "bg-bgDark" : "bg-bgLight"}`}>
            {/* Cabeçalho */}
            <CustomText variant="bold" className={`text-2xl mb-6 ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
                Criar Conta
            </CustomText>

            {/* Input Nome */}
            <View className={`p-4 py-2 rounded-lg flex-row items-center mb-4 shadow-sm 
                ${theme === "dark" ? "bg-cardDark border-gray-600" : "bg-cardLight border-gray-300"}
            `}>
                <AntDesign name="user" size={20} color={theme === "dark" ? "#E5E7EB" : "#6B7280"} />
                <TextInput
                    className={`ml-3 flex-1 text-lg ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}
                    placeholder="Nome Completo"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Input E-mail */}
            <View className={`p-4 py-2 rounded-lg flex-row items-center mb-4 shadow-sm 
                ${theme === "dark" ? "bg-cardDark border-gray-600" : "bg-cardLight border-gray-300"}
            `}>
                <AntDesign name="mail" size={20} color={theme === "dark" ? "#E5E7EB" : "#6B7280"} />
                <TextInput
                    className={`ml-3 flex-1 text-lg ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}
                    placeholder="E-mail"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Input Senha */}
            <View className={`p-4 py-2 rounded-lg flex-row items-center mb-6 shadow-sm 
                ${theme === "dark" ? "bg-cardDark border-gray-600" : "bg-cardLight border-gray-300"}
            `}>
                <AntDesign name="lock" size={20} color={theme === "dark" ? "#E5E7EB" : "#6B7280"} />
                <TextInput
                    className={`ml-3 flex-1 text-lg ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}
                    placeholder="Senha"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Botão de Registro */}
            <TouchableOpacity
                className="bg-primary p-4 rounded-lg items-center shadow-md active:opacity-80"
                onPress={() => handleLogin()}
            >
                <CustomText variant="bold" className="text-white text-lg">
                    Criar Conta
                </CustomText>
            </TouchableOpacity>

            {/* Já tem uma conta? */}
            <TouchableOpacity className="mt-6 flex-row justify-center">
                <CustomText variant="regular" className={`${theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"}`}>
                    Já tem uma conta?{" "}
                </CustomText>
                <CustomText
                    variant="medium"
                    className="text-primary"
                    onPress={() => navigation.navigate("Login")}
                >
                    Entrar
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
