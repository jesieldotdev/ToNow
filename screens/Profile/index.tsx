import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomText from 'components/CustomText';
import * as Updates from 'expo-updates';
import { useTheme } from 'hooks/themeProvider';
import useStore from 'hooks/useStore';
import { LogOut } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from 'store';
import { accentColors, getHexaColorTailwind, getTailwindClass } from 'store/setting/utils';

const ProfileScreen = () => {
  const [, actions, select] = useStore();
  const {
    setting: { setSetting, toggleTheme, changeLanguage },
  } = actions;
  const { background, textPrimary } = useTheme();

  const theme = useSelector((state: RootState) => state.setting.theme);
  const accentColor = select('setting.accentColor');
  const navigation = useNavigation();

  const { t } = useTranslation();
  const language = select('setting.language');

  function handleLogout() {
    console.log('Usuário deslogado');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  function handleClearData() {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja apagar todos os dados? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            console.log('Apagando dados persistidos');
            await persistStore(store).purge();
            Alert.alert('Sucesso', 'Os dados foram apagados. O app será reiniciado.');
            setTimeout(() => {
              Updates.reloadAsync();
            }, 1000);
          },
        },
      ]
    );
  }

console.log(t('language'))

  return (
    <View className={`flex-1 px-6 pt-12 ${theme === 'dark' ? 'bg-bgDark' : 'bg-bgLight'}`}>
      <CustomText
        variant='bold'
        className={`mb-6 text-2xl ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
      >
        Perfil
      </CustomText>

      <View className='mb-6 items-center'>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          className={`h-24 w-24 rounded-full border-4 ${getTailwindClass(accentColor, 'border')}`}
        />
        <CustomText
          variant='bold'
          className={`mt-3 text-xl ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
        >
          Nome do Usuário
        </CustomText>
        <CustomText
          variant='regular'
          className={`mt-1 text-sm ${theme === 'dark' ? 'text-textSecondaryDark' : 'text-textSecondaryLight'}`}
        >
          email@exemplo.com
        </CustomText>
      </View>

      <View
        className={`rounded-xl p-3 shadow-md ${theme === 'dark' ? 'border-gray-700 bg-cardDark' : 'border-gray-200 bg-cardLight'}`}
      >
        <TouchableOpacity className='flex-row items-center justify-between border-b border-gray-300 p-4 dark:border-gray-700'>
          <CustomText
            variant='medium'
            className={`text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          >
            Alterar Senha
          </CustomText>
          <AntDesign name='right' size={18} color={theme === 'dark' ? '#E5E7EB' : 'gray'} />
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center justify-between border-b border-gray-300 p-4 dark:border-gray-700'>
          <CustomText
            variant='medium'
            className={`text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          >
            Notificações
          </CustomText>
          <AntDesign name='right' size={18} color={theme === 'dark' ? '#E5E7EB' : 'gray'} />
        </TouchableOpacity>

        <View className='flex-row items-center justify-between border-b border-gray-300 p-4 dark:border-gray-700'>
          <CustomText
            variant='medium'
            className={`text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          >
            Modo Escuro
          </CustomText>
          <Switch
            thumbColor={getHexaColorTailwind(accentColor)}
            value={theme === 'dark'}
            onValueChange={() => toggleTheme()}
          />
        </View>

        {/* Seção de Configuração de Idioma */}
        <TouchableOpacity
          className='flex-row items-center justify-between border-b border-gray-300 p-4 dark:border-gray-700'
          onPress={() => changeLanguage(language === 'en' ? 'pt' : 'en')}
        >
          <CustomText
            variant='medium'
            className={`text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          >
            {t('language')}
          </CustomText>
          <View className='flex-row items-center'>
            <CustomText
              variant='medium'
              className={`text-lg mr-2 ${theme === 'dark' ? 'text-textSecondaryDark' : 'text-textSecondaryLight'}`}
            >
              {language === 'en' ? 'English' : 'Português'}
            </CustomText>
            <AntDesign name='right' size={18} color={theme === 'dark' ? '#E5E7EB' : 'gray'} />
          </View>
        </TouchableOpacity>

        {/* Seleção de Cor Primária */}
        <View className='p-4'>
          <CustomText
            variant='medium'
            className={`mb-2 text-lg ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
          >
            Cor Principal
          </CustomText>
          <View className='w-32 flex-row justify-between'>
            {accentColors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSetting('accentColor', color)}
                className={`h-10 w-10 rounded-full ${getTailwindClass(color, 'bg')} ${accentColor === color ? `border-2 border-white` : ''}`}
              />
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        className={`mt-6 flex-row items-center justify-center rounded-xl p-4 shadow-lg active:opacity-80 ${getTailwindClass(accentColor, 'bg')}`}
        onPress={handleClearData}
      >
        <Feather name='trash-2' size={20} color='white' />
        <CustomText variant='bold' className='ml-2 text-lg text-white'>
          Apagar Dados
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        className={`mt-6 flex-row items-center justify-center rounded-xl border p-4 shadow-lg active:opacity-80 ${background} ${textPrimary}`}
        onPress={handleLogout}
      >
        <LogOut color={getHexaColorTailwind(accentColor)} />
        <CustomText variant='bold' className={`${textPrimary} ml-2 text-lg`}>
          Sair
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
