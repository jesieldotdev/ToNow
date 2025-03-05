import { useTheme } from 'hooks/themeProvider';
import useStore from 'hooks/useStore';
import React from 'react';
import { View } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { background } = useTheme();
  console.log(background);

  return <View className={`flex-1 px-6 pt-12 ${background}`}>{children}</View>;
};
