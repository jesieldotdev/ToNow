import * as Notifications from "expo-notifications";

// 🔥 Defina o tempo de antecedência em minutos (altere conforme desejar)
const notifyBeforeMinutes = 10;

export async function scheduleTaskNotification(task: TaskItem) {
  const taskDate = new Date(
    task.time.date.year,
    task.time.date.month.value - 1, // Mês começa do 0 no JS
    task.time.date.day.value,
    parseInt(task.time.hour.split(":")[0]), // Hora
    parseInt(task.time.hour.split(":")[1]) // Minuto
  );

  const now = new Date();
  const notificationTime = new Date(taskDate.getTime() - notifyBeforeMinutes * 60000);

  // ✅ Só agenda a notificação se a tarefa ainda não passou
  if (notificationTime > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📌 Lembrete de Tarefa!",
        body: `Está quase na hora da sua tarefa: ${task.title}`,
        sound: "default",
      },
      trigger: { date: notificationTime },
    });

    console.log(`Notificação agendada para ${notificationTime}`);
  } else {
    console.log(`⚠️ Tarefa '${task.title}' já passou do horário, não agendando notificação.`);
  }
}
