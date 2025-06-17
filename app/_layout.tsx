import { Slot } from 'expo-router';
import '../global.css';
import i18n from 'locales/i18n';
import { I18nextProvider } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Store from 'store';
import TabBar from 'components/Tabbar';
import { Container } from 'components/Container';

export default function Layout() {
  return (
    <Store>
      <SafeAreaProvider >
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right','bottom']}  >
          <I18nextProvider i18n={i18n}>
            <PaperProvider>
              <Container className='flex-1'>
                <Slot />
              </Container>
              <TabBar />
            </PaperProvider>
          </I18nextProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </Store>
  );
}
