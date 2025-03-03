import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import CustomText from "../components/CustomText";
import EventItem from "./EventItem";
import { Container } from "./Container";
import { DayOfWeek } from "./DayOfWeek";

interface ScheduleProps {
  tasks: TaskItem[];
}

interface Day {
  value: number;
  label: string;
  dayNumber: number;
}

const Schedule = ({ tasks }: ScheduleProps) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); 
    const currentDayOfMonth = today.getDate(); 
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear(); 


    const currentHour = today.getHours()

    console.log(currentHour)

    
    const generateDays = (): Day[] => {
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label, index) => {
            const adjustedDate = new Date(currentYear, currentMonth, currentDayOfMonth);
            adjustedDate.setDate(today.getDate() - currentDayOfWeek + index); 
            return { value: index, label, dayNumber: adjustedDate.getDate() };
        });
    };

    const days = generateDays();
    const [selectedDay, setSelectedDay] = useState(today.getDate()); 

    
    const filteredTasks = tasks.filter(event => event.time.date.day.day === selectedDay);

    function isHighlighted(task: TaskItem){
      const eventHour = parseInt(task.time.hour.split(":")[0]) === currentHour
      return eventHour
    }

    return (
        <Container>
            <CustomText variant="medium" className="text-lg text-gray-500 ">
                {today.toLocaleDateString('en-US', { month: 'long' })} {today.getDate()}, {today.getFullYear()}
            </CustomText>
            <CustomText variant="extraBold" className="text-4xl mb-4 mt-2">
                Today
            </CustomText>

            <DayOfWeek selectedDay={selectedDay} setSelectedDay={setSelectedDay} days={days} />

            <ScrollView className="relative pl-8">
                <View className="absolute top-0 left-[-12px] bottom-32 w-[2px] bg-blue-500" />
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
                    <CustomText variant="medium" className="text-center text-gray-500 mt-4">
                        No events for this day.
                    </CustomText>
                )}
            </ScrollView>
        </Container>
    );
};

export default Schedule;
