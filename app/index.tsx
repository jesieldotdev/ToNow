import { Container } from 'components/Container';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import useStore from 'hooks/useStore';
import i18n from 'locales/i18n';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView, LogBox } from 'react-native';
import { PaperProvider } from 'react-native-paper';


import Store from 'store';

import Schedule from './schedule';

import TabBar from 'components/Tabbar';
import { Slot } from 'expo-router';

// export default function Index() {
//   return (
//     <Store>
//       <SafeAreaView style={{ flex: 1 }}>
//         <I18nextProvider i18n={i18n}>
//           <PaperProvider>
//             <Home />
//           </PaperProvider>
//         </I18nextProvider>
//       </SafeAreaView>
//     </Store>
//   );
// }

 export default function Home() {
  const store = useStore();
  const [, , select] = store || [null, null, () => null];

  const theme = select ? select('setting.theme') : 'dark'; 

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme === 'dark' ? '#282828' : '#fff');
    NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);
  return (
    <Container className="flex-1">
      {/* Usando o Slot para renderizar a tela dinamicamente */}
      <Schedule/>
      {/* <TabBar  /> */}
      {/* <Slot /> */}
   
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} translucent />
    </Container>
  );
}
