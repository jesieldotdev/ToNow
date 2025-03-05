import './global.css';
import TabNavigator from 'components/AppNavigator';
import { Container } from 'components/Container';
import * as NavigationBar from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import useStore from 'hooks/useStore';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { cancelNotification, registerForPushNotificationsAsync } from 'store/setting/utils';

import Store from './store';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const notificationSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const notificationId = response.notification.request.identifier;
        cancelNotification(notificationId);
      }
    );

    return () => {
      notificationSubscription.remove();
    };
  }, []);

  return (
    <Store>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </Store>
  );
}

function AppContent() {
  const [, , select] = useStore();
  const theme = select('setting.theme');

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
