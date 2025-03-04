import { StatusBar } from "expo-status-bar";
import "./global.css";
import TabNavigator from "components/AppNavigator";
import Store from "./store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import * as NavigationBar from "expo-navigation-bar";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";


// 🔥 Configura como as notificações devem se comportar quando recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ✅ Função para registrar notificações push
async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert("As notificações só funcionam em dispositivos físicos.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Você precisa permitir notificações para receber alertas de tarefas!");
    return;
  }

  // ✅ Obtém o token de notificação (caso precise para notificações push no futuro)
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);

  return token;
}

// ✅ Função para cancelar notificações ao serem clicadas
async function cancelNotification(notificationId: string) {
  await Notifications.dismissNotificationAsync(notificationId);
  console.log(`🚫 Notificação ${notificationId} cancelada!`);
}

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    // ✅ Listener para capturar clique na notificação e cancelar
    const notificationSubscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const notificationId = response.notification.request.identifier;
        cancelNotification(notificationId); // Cancela a notificação quando clicada
      }
    );

    return () => {
      notificationSubscription.remove(); // Remove o listener ao desmontar o app
    };
  }, []);

  return (
    <Store>
      <PaperProvider >
        <AppContent />
      </PaperProvider>
    </Store>
  );
}

function AppContent() {
  const theme = useSelector((state: RootState) => state.setting.theme);

  useEffect(() => {
    // ✅ Atualiza a barra de navegação corretamente
    NavigationBar.setBackgroundColorAsync(theme === "dark" ? "#282828" : "#fff");
    NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <>
      <TabNavigator />
      <StatusBar style={theme === "dark" ? "light" : "dark"} translucent />
    </>
  );
}
