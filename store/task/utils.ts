export const getDefaultTaskItem = (): TaskItem => {
  const now = new Date();

  return {
    title: '',
    description: '',
    time: {
      hour: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: {
        day: { label: now.toLocaleDateString('en-US', { weekday: 'short' }), value: now.getDate() },
        month: {
          label: now.toLocaleDateString('en-US', { month: 'short' }),
          value: now.getMonth() + 1
        },
        year: now.getFullYear(),
        dayWeek: {
          value: now.getDay(),
          label: now.toLocaleDateString('en-US', { weekday: 'short' })
        }
      }
    }
  };
};

export const sortTasks = (tasks: TaskItem[]): TaskItem[] => {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(
      a.time.date.year,
      a.time.date.month.value - 1,
      a.time.date.day.value,
      parseInt(a.time.hour.split(':')[0]),
      parseInt(a.time.hour.split(':')[1])
    );

    const dateB = new Date(
      b.time.date.year,
      b.time.date.month.value - 1,
      b.time.date.day.value,
      parseInt(b.time.hour.split(':')[0]),
      parseInt(b.time.hour.split(':')[1])
    );

    return dateA.getTime() - dateB.getTime();
  });
};

export const sortTasksByNearestTime = (tasks: TaskItem[]): TaskItem[] => {
  return [...tasks]
    .map((task) => {
      const taskDate = new Date(
        task.time.date.year,
        task.time.date.month.value - 1,
        task.time.date.day.value,
        parseInt(task.time.hour.split(':')[0]),
        parseInt(task.time.hour.split(':')[1])
      );

      return {
        ...task,
        timestamp: taskDate.getTime()
      };
    })
    .sort((a, b) => {
      const now = Date.now();
      const diffA = Math.abs(a.timestamp - now);
      const diffB = Math.abs(b.timestamp - now);

      return diffA - diffB;
    });
};

export const defaultTaskExamples = () => {
  return [
    {
      time: {
        hour: '07:00',
        date: {
          day: { label: 'mon', value: 4 },
          month: { label: 'mar', value: 3 },
          year: 2024,
          dayWeek: { value: 1, label: 'mon' }
        }
      },
      title: 'Wakeup',
      description: 'Early wakeup from bed and fresh',
      color: { primary: '#FF5722', secondary: '#FF8A65' }
    },
    {
      time: {
        hour: '08:00',
        date: {
          day: { label: 'mon', value: 4 },
          month: { label: 'mar', value: 3 },
          year: 2024,
          dayWeek: { value: 1, label: 'mon' }
        }
      },
      title: 'Morning Exercise',
      description: '4 types of exercise',
      color: { primary: '#FF5722', secondary: '#FF8A65' }
    },
    {
      time: {
        hour: '09:00',
        date: {
          day: { label: 'mon', value: 4 },
          month: { label: 'mar', value: 3 },
          year: 2024,
          dayWeek: { value: 1, label: 'mon' }
        }
      },
      title: 'Meeting',
      description: 'Zoom call, Discuss team task for the day',
      participants: [
        'https://lifehacker.com/imagery/articles/01HF2GKNRQZ4MN1YA639Q53NQV/hero-image.fill.size_1200x675.png',
        'https://img.freepik.com/psd-gratuitas/renderizacao-3d-do-personagem-avatar_23-2150611765.jpg'
      ],
      color: { primary: '#FF5722', secondary: '#FF8A65' }
    },
    {
      time: {
        hour: '10:00',
        date: {
          day: { label: 'mon', value: 4 },
          month: { label: 'mar', value: 3 },
          year: 2024,
          dayWeek: { value: 1, label: 'mon' }
        }
      },
      title: 'Breakfast',
      description: 'Morning breakfast with bread, banana, egg bowl and tea.',
      color: { primary: '#FF5722', secondary: '#FF8A65' }
    }
  ];
};
