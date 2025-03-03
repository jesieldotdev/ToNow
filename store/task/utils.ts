export const getDefaultTaskItem = (): TaskItem => {
    const now = new Date();

    return {
        title: '',
        description: '',
        time: {
            hour: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: {
                day: { label: now.toLocaleDateString('en-US', { weekday: 'short' }), day: now.getDate() },
                month: { label: now.toLocaleDateString('en-US', { month: 'short' }), day: now.getMonth() + 1 },
                year: now.getFullYear(),
                dayWeek: { value: now.getDay(), label: now.toLocaleDateString('en-US', { weekday: 'short' }) }
            }
        },
    };
};

export const sortTasks = (tasks: TaskItem[]): TaskItem[] => {
    return [...tasks].sort((a, b) => {
      const dateA = new Date(
        a.time.date.year,
        a.time.date.month.day - 1, // Mês começa do 0 no JS
        a.time.date.day.day,
        parseInt(a.time.hour.split(":")[0]), // Hora
        parseInt(a.time.hour.split(":")[1]) // Minuto
      );
  
      const dateB = new Date(
        b.time.date.year,
        b.time.date.month.day - 1,
        b.time.date.day.day,
        parseInt(b.time.hour.split(":")[0]),
        parseInt(b.time.hour.split(":")[1])
      );
  
      return dateA.getTime() - dateB.getTime(); // Ordena de forma ascendente
    });
  };
  
