import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { stringify } from 'querystring';
import colors from 'tailwindcss/colors';



export const accentColors: AccentColor[] = ['primary', 'secondary', 'third', 'fourth'];

export async function registerForPushNotificationsAsync() {
  try {
    if (!Device.isDevice) {
      alert('As notificações só funcionam em dispositivos físicos.');
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Você precisa permitir notificações para receber alertas de tarefas!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    return token;
  } catch (error) {
    console.error('Erro ao registrar notificações:', error);
  }
}

// ✅ Função para cancelar notificações ao serem clicadas
export async function cancelNotification(notificationId: string) {
  await Notifications.dismissNotificationAsync(notificationId);
  console.log(`🚫 Notificação ${notificationId} cancelada!`);
}

export const getHexaColorTailwind = (accent: AccentColor) => {
  switch (accent) {
    case 'primary':
      return colors.rose[500];
    case 'secondary':
      return colors.blue[500];
    case 'third':
      return colors.orange[500];
    case 'fourth':
      return colors.green[500];
  }
};



export const getTailwindClass = (colorKey: string, type: 'text' | 'bg' | 'border') => {
  const colorMapping: Record<string, string> = {
    primary: 'primary',
    secondary: 'secondary',
    third: 'third',
    fourth: 'fourth',
  };

  return `${type}-${colorMapping[colorKey] || 'primary'}`;
};
