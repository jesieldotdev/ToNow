import * as NavigationBar from 'expo-navigation-bar';
import { useTheme } from 'hooks/themeProvider';
import useStore from 'hooks/useStore';
import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export const Container = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { background } = useTheme();
  const store = useStore();
  const [, actions, select] = store || [null, null, () => null];

  const {
    setting: { getBgHexa }
  } = actions;

  const theme = select ? select('setting.theme') : 'dark';

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(getBgHexa());
    NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');

    StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(getBgHexa());
  }, [theme]);

  return (
    <View className={`${background} ${className}`}>

      <StatusBar />
      {children}
    </View>
  );
};
