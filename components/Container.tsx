import { useTheme } from 'hooks/themeProvider';
import useStore from 'hooks/useStore';
import React from 'react';
import { View } from 'react-native';

export const Container = ({ children, className='' }: { children: React.ReactNode, className: string }) => {
  const { background } = useTheme();
  console.log(background);

  return <View className={` ${background} ${className}`}>{children}</View>;
};
