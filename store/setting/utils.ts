import { stringify } from "querystring";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const getDefaultSettingItem = () => {
   {

   }
};

export const accentColors: AccentColor[] = ['primary',"secondary","thirth"]

export const colorMapping = (accent: AccentColor) => {
   return `${accent}-500`
 };
 

 export async function registerForPushNotificationsAsync() {
   try {
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
 
     const token = (await Notifications.getExpoPushTokenAsync()).data;
     console.log("Expo Push Token:", token);
 
     return token;
   } catch (error) {
     console.error("Erro ao registrar notificações:", error);
   }
 }
 
 
 // ✅ Função para cancelar notificações ao serem clicadas
 export async function cancelNotification(notificationId: string) {
   await Notifications.dismissNotificationAsync(notificationId);
   console.log(`🚫 Notificação ${notificationId} cancelada!`);
 }
 
 