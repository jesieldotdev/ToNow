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
