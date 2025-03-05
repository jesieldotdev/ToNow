import { AntDesign } from '@expo/vector-icons';
import CustomText from 'components/CustomText';
import useStore from 'hooks/useStore';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { getTailwindClass } from 'store/setting/utils';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [, actions, select] = useStore();
  const {
    setting: { setSetting },
  } = actions;
  const theme = select('setting.theme'); // Obtém o tema do Redux
  const accent = select('setting.accentColor');

  useEffect(() => {
    setSetting('showTabBar', false);
  }, []);

  function handleLogin() {
    navigation.navigate('Login');
  }

  return (
    <View className={`flex-1 px-6 pt-16 ${theme === 'dark' ? 'bg-bgDark' : 'bg-bgLight'}`}>
      {/* Cabeçalho */}
      <CustomText
        variant='bold'
        className={`mb-6 text-2xl ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
      >
        Criar Conta
      </CustomText>

      {/* Input Nome */}
      <View
        className={`mb-4 flex-row items-center rounded-lg p-4 py-2 shadow-sm ${theme === 'dark' ? 'border-gray-600 bg-cardDark' : 'border-gray-300 bg-cardLight'} `}
      >
        <AntDesign name='user' size={20} color={theme === 'dark' ? '#E5E7EB' : '#6B7280'} />
        <TextInput
          className={`ml-3 flex-1 text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          placeholder='Nome Completo'
          placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Input E-mail */}
      <View
        className={`mb-4 flex-row items-center rounded-lg p-4 py-2 shadow-sm ${theme === 'dark' ? 'border-gray-600 bg-cardDark' : 'border-gray-300 bg-cardLight'} `}
      >
        <AntDesign name='mail' size={20} color={theme === 'dark' ? '#E5E7EB' : '#6B7280'} />
        <TextInput
          className={`ml-3 flex-1 text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          placeholder='E-mail'
          placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Input Senha */}
      <View
        className={`mb-6 flex-row items-center rounded-lg p-4 py-2 shadow-sm ${theme === 'dark' ? 'border-gray-600 bg-cardDark' : 'border-gray-300 bg-cardLight'} `}
      >
        <AntDesign name='lock' size={20} color={theme === 'dark' ? '#E5E7EB' : '#6B7280'} />
        <TextInput
          className={`ml-3 flex-1 text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          placeholder='Senha'
          placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Botão de Registro */}
      <TouchableOpacity
        className={`${getTailwindClass(accent, 'bg')} items-center rounded-lg p-4 shadow-md active:opacity-80 `}
        onPress={() => handleLogin()}
      >
        <CustomText variant='bold' className='text-lg text-white'>
          Criar Conta
        </CustomText>
      </TouchableOpacity>

      {/* Já tem uma conta? */}
      <TouchableOpacity className='mt-6 flex-row justify-center'>
        <CustomText
          variant='regular'
          className={`${theme === 'dark' ? 'text-textSecondaryDark' : 'text-textSecondaryLight'}`}
        >
          Já tem uma conta?{' '}
        </CustomText>
        <CustomText
          variant='medium'
          className={`${getTailwindClass(accent, 'text')}`}
          onPress={() => navigation.navigate('Login')}
        >
          Entrar
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
