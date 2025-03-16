import { AntDesign } from '@expo/vector-icons';
// import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Importe a biblioteca GoogleSignin
import CustomText from 'components/CustomText';
import { useRouter } from 'expo-router';
import useStore from 'hooks/useStore';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getTailwindClass } from 'store/setting/utils';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const [, actions, select] = useStore();
  const {
    setting: { setSetting }
  } = actions;
  const theme = select('setting.theme'); // Obtém o tema do Redux
  const accent = select('setting.accentColor'); // Obtém o tema do Redux

  // useEffect(() => {
  //   setSetting('showTabBar', false);
  // }, []);

  // Função para lidar com o login
  function handleLogin() {
    setSetting('showTabBar', true);
    router.push('/');
  }

  // Função para fazer login com o Google
  const handleGoogleSignIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices(); // Verifica se o dispositivo tem os serviços do Google Play
    //   const userInfo = await GoogleSignin.signIn(); // Realiza o login
    //   console.log(userInfo); // Aqui você pode usar as informações do usuário, como userInfo.idToken
    //   setSetting('showTabBar', true); // Exemplo de uso do estado de configuração
    //   router.push('/'); // Navega para a próxima tela
    // } catch (error) {
    //   console.log(error); // Em caso de erro, você pode tratá-lo
    // }
  };

  return (
    <View className={`flex-1 px-6 pt-20 ${theme === 'dark' ? 'bg-bgDark' : 'bg-bgLight'}`}>
      {/* Cabeçalho */}
      <CustomText
        variant='bold'
        className={`mb-6 text-2xl ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
      >
        Entrar
      </CustomText>

      {/* Input E-mail */}
      <View
        className={`mb-4 flex-row items-center rounded-lg p-4 py-2 shadow-sm ${theme === 'dark' ? 'border-gray-600 bg-cardDark' : 'border-gray-300 bg-cardLight'} `}
      >
        <AntDesign name='mail' size={20} color={theme === 'dark' ? '#E5E7EB' : '#6B7280'} />
        <TextInput
          className={`ml-3 flex-1 text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          placeholder='Digite seu e-mail'
          placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Input Senha */}
      <View
        className={`mb-2 flex-row items-center rounded-lg p-4 py-2 shadow-sm ${theme === 'dark' ? 'border-gray-600 bg-cardDark' : 'border-gray-300 bg-cardLight'} `}
      >
        <AntDesign name='lock' size={20} color={theme === 'dark' ? '#E5E7EB' : '#6B7280'} />
        <TextInput
          className={`ml-3 flex-1 text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          placeholder='Digite sua senha'
          placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Esqueceu a senha */}
      <TouchableOpacity className='mb-6'>
        <CustomText variant='medium' className={`text-right ${getTailwindClass(accent, 'text')}`}>
          Esqueceu a senha?
        </CustomText>
      </TouchableOpacity>

      {/* Botão de Login */}
      <TouchableOpacity
        className={`items-center rounded-lg p-4 shadow-md active:opacity-80 ${getTailwindClass(accent, 'bg')}`}
        onPress={() => handleLogin()}
      >
        <CustomText variant='bold' className='text-lg text-white'>
          Entrar
        </CustomText>
      </TouchableOpacity>

      {/* Botão de Login com Google */}
      <TouchableOpacity
        className='mt-4 items-center rounded-lg bg-blue-500 p-4 shadow-md active:opacity-80'
        onPress={handleGoogleSignIn} // Chama a função de login do Google
      >
        <CustomText variant='bold' className='text-lg text-white'>
          Entrar com Google
        </CustomText>
      </TouchableOpacity>

      {/* Criar conta */}
      <TouchableOpacity className='mt-6 flex-row justify-center'>
        <CustomText
          variant='regular'
          className={`${theme === 'dark' ? 'text-textSecondaryDark' : 'text-textSecondaryLight'}`}
        >
          Ainda não tem conta?{' '}
        </CustomText>
        <CustomText
          variant='medium'
          className={getTailwindClass(accent, 'text')}
          onPress={() => navigation.navigate('Register')}
        >
          Criar conta
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
