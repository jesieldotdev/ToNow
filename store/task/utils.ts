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
      a.time.date.month.day - 1, 
      a.time.date.day.day,
      parseInt(a.time.hour.split(":")[0]), 
      parseInt(a.time.hour.split(":")[1]) 
    );

    const dateB = new Date(
      b.time.date.year,
      b.time.date.month.day - 1,
      b.time.date.day.day,
      parseInt(b.time.hour.split(":")[0]),
      parseInt(b.time.hour.split(":")[1])
    );

    return dateA.getTime() - dateB.getTime(); 
  });
};

export const sortTasksByNearestTime = (tasks: TaskItem[]): TaskItem[] => {
  return [...tasks]
    .map((task) => {
      const taskDate = new Date(
        task.time.date.year,
        task.time.date.month.day - 1, 
        task.time.date.day.day,
        parseInt(task.time.hour.split(":")[0]), 
        parseInt(task.time.hour.split(":")[1]) 
      );

      return {
        ...task,
        timestamp: taskDate.getTime(), 
      };
    })
    .sort((a, b) => {
      const now = Date.now();
      const diffA = Math.abs(a.timestamp - now); 
      const diffB = Math.abs(b.timestamp - now);

      return diffA - diffB; 
    });
};


