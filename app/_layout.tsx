import { Slot, Stack } from 'expo-router';
import '../global.css';
import i18n from 'locales/i18n';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Store from 'store';
import TabBar from 'components/Tabbar';
import Schedule from './schedule';

export default function Layout() {
  return (
    <Store>
      <SafeAreaView style={{ flex: 1 }}>
        <I18nextProvider i18n={i18n}>
          <PaperProvider>
              <Slot/>
            <TabBar />
          </PaperProvider>
        </I18nextProvider>
      </SafeAreaView>
    </Store>
  );
}
