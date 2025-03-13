import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Link, usePathname, useRouter } from 'expo-router'; // Importe o Link do expo-router
import useStore from 'hooks/useStore';
import { User, Clock9Icon, Plus } from 'lucide-react-native';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { getHexaColorTailwind } from 'store/setting/utils';


interface TabBarProps extends BottomTabBarProps { }

const TabBar = () => {
  const state = 0
  const [, actions, select] = useStore();
  const pathname = usePathname()

  const isScheduleActive = pathname === '/schedule' || pathname === '/';
  const isProfileActive = pathname === '/profile';

  const {
    task: { setTask }
  } = actions;

  const theme = select('setting.theme');
  const accentColor = select('setting.accentColor');
  const isOpen = select('task.taskModalTable');
  const showTab = select('setting.showTabBar');

  function handleAdd() {
    setTask('taskModalTable', !isOpen);
  }

  if (!showTab) return null;

  return (
    <View
      className={`absolute bottom-0 left-0 right-0 flex-row items-center justify-around p-4 ${theme === 'dark' ? 'bg-bgDark' : 'bg-bgLight'} rounded-t-2xl shadow-md`}
    >
      {/* Botão Home com Link para navegação */}
      <Link href='/schedule' asChild>
        <TouchableOpacity className='p-4 px-6'>
          <FontAwesome
            name='clock-o'
            size={24}
            style={{
              color:
                isScheduleActive
                  ? getHexaColorTailwind(accentColor)
                  : theme === 'dark'
                    ? '#4b5563'
                    : '#6B7280'
            }}
          />
        </TouchableOpacity>
      </Link>

      {/* Botão de Adicionar */}
      <TouchableOpacity
        onPress={handleAdd}
        className={`h-16 w-16 bg-${accentColor} flex items-center justify-center rounded-2xl shadow-lg`}
      >
        <AntDesign name='plus' size={28} color='white' />
      </TouchableOpacity>

      {/* Botão Perfil com Link (caso você queira descomentar) */}
      <Link href='/profile' asChild>
        <TouchableOpacity className='p-4 px-6'>
          <FontAwesome
            name='user'
            size={24}
            style={{
              color:
                isProfileActive
                  ? getHexaColorTailwind(accentColor)
                  : theme === 'dark'
                    ? '#4b5563'
                    : '#6B7280'
            }}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TabBar;
