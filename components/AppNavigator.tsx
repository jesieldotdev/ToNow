import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import TabBar from 'components/Tabbar';
import useStore from 'hooks/useStore';
import React from 'react';
import LoginScreen from 'screens/Login';
import ProfileScreen from 'screens/Profile';
import RegisterScreen from 'screens/Register';
import Schedule from 'screens/Schedule';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [, actions, select] = useStore();
  const theme = select('setting.theme');

  const {
    setting: { getBgHexa },
  } = actions;

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: getBgHexa(),
    },
  };
  return (
    <NavigationContainer theme={theme === 'dark' ? MyDarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={{ headerShown: false, animation: 'shift' }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name='Home' component={Schedule} />
        <Tab.Screen name='Perfil' component={ProfileScreen} />
        <Tab.Screen name='Login' component={LoginScreen} />
        <Tab.Screen name='Register' component={RegisterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
