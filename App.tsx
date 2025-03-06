import './global.css';
import TabNavigator from 'components/AppNavigator';
import { Container } from 'components/Container';
import * as NavigationBar from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import useStore from 'hooks/useStore';
import i18n from 'locales/i18n';
import { useEffect, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { cancelNotification, registerForPushNotificationsAsync } from 'store/setting/utils';

import Store from './store';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      try {
        await registerForPushNotificationsAsync();

        const notificationSubscription = Notifications.addNotificationResponseReceivedListener(
          (response) => {
            try {
              const notificationId = response.notification.request.identifier;
              cancelNotification(notificationId);
            } catch (e) {
              console.warn('Erro ao cancelar notificação:', e);
            }
          }
        );

        return () => notificationSubscription.remove();
      } catch (e) {
        console.warn('Erro ao registrar notificações:', e);
      }
    }

    setupNotifications();
  }, []);

  return (
    <Store>
      <I18nextProvider i18n={i18n}>
        <PaperProvider>
          <AppContent />
        </PaperProvider>
      </I18nextProvider>
    </Store>
  );
}

function AppContent() {
  const store = useStore();
  const [, , select] = store || [null, null, () => null];

  const theme = select ? select('setting.theme') : 'light'; // Adicione um fallback

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme === 'dark' ? '#282828' : '#ffffff');
    NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  return (
    <Container className='flex-1'>
      <TabNavigator />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} translucent />
    </Container>
  );
}
