import CreateEvent from 'components/CreateTodo';
import { scheduleTaskNotification } from 'components/Notifications';
import useStore from 'hooks/useStore';
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { getTailwindClass } from 'store/setting/utils';
import { sortTasks, sortTasksByNearestTime } from 'store/task/utils';

import { Container } from '../../components/Container';
import CustomText from '../../components/CustomText';
import { DayOfWeek } from '../../components/DayOfWeek';
import EventItem from '../../components/EventItem';

interface ScheduleProps {
  tasks: TaskItem[];
}

interface Day {
  value: number;
  label: string;
  dayNumber: number;
}

const Schedule = () => {
  const [, actions, select] = useStore();

  const tasks = sortTasks(select('task.items'));
  const theme = select('setting.theme');
  const accent = select('setting.accentColor');

  console.log(tasks);

  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const currentDayOfMonth = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentHour = today.getHours();

  // useEffect(() => {
  //     tasks.forEach(task => {
  //       scheduleTaskNotification(task);
  //     });
  //   }, []);

  const generateDays = (): Day[] => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label, index) => {
      const adjustedDate = new Date(currentYear, currentMonth, currentDayOfMonth);
      adjustedDate.setDate(today.getDate() - currentDayOfWeek + index);
      return { value: index, label, dayNumber: adjustedDate.getDate() };
    });
  };

  const days = generateDays();
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const filteredTasks = tasks.filter((event) => event.time.date.day.value === selectedDay);

  function isHighlighted(task: TaskItem) {
    return parseInt(task.time.hour.split(':')[0]) === currentHour;
  }

  return (
    <Container className='px-6 pt-12'>
      <CustomText
        variant='medium'
        className={`text-lg ${theme === 'dark' ? 'text-textSecondaryDark' : 'text-textSecondaryLight'}`}
      >
        {today.toLocaleDateString('en-US', { month: 'long' })} {today.getDate()},{' '}
        {today.getFullYear()}
      </CustomText>
      <CustomText
        variant='extraBold'
        className={`mb-4 mt-2 text-4xl ${theme === 'dark' ? 'text-textPrimaryDark' : 'text-textPrimaryLight'}`}
      >
        Today
      </CustomText>

      <DayOfWeek selectedDay={selectedDay} setSelectedDay={setSelectedDay} days={days} />

      <ScrollView className='relative pl-8'>
        <View
          className={`absolute bottom-32 left-[-12px] top-0 w-[2px] ${getTailwindClass(accent, 'bg')}`}
        />

        {filteredTasks.length > 0 ? (
          filteredTasks.map((event, index) => (
            <EventItem
              key={index}
              time={event.time}
              title={event.title}
              description={event.description}
              isHighlighted={isHighlighted(event)}
              participants={event?.participants}
            />
          ))
        ) : (
          <CustomText
            variant='medium'
            className={`mt-4 text-center ${theme === 'dark' ? 'text-textSecondaryDark' : 'text-textSecondaryLight'}`}
          >
            No events for this day.
          </CustomText>
        )}

        <View className='h-24' />
      </ScrollView>

      <CreateEvent />
    </Container>
  );
};

export default Schedule;
