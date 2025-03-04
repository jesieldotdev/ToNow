import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import CustomText from "../../components/CustomText";
import EventItem from "../../components/EventItem";
import { Container } from "../../components/Container";
import { DayOfWeek } from "../../components/DayOfWeek";
import useStore from "hooks/useStore";
import CreateEvent from "components/CreateTodo";
import { sortTasks, sortTasksByNearestTime } from "store/task/utils";
import { scheduleTaskNotification } from "components/Notifications";

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

    const tasks = sortTasks(select("task.items"))
    const theme = select("setting.theme");

    console.log(tasks)

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
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label, index) => {
            const adjustedDate = new Date(currentYear, currentMonth, currentDayOfMonth);
            adjustedDate.setDate(today.getDate() - currentDayOfWeek + index);
            return { value: index, label, dayNumber: adjustedDate.getDate() };
        });
    };

    const days = generateDays();
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const filteredTasks = tasks.filter(event => event.time.date.day.value === selectedDay);

    function isHighlighted(task: TaskItem) {
        return parseInt(task.time.hour.split(":")[0]) === currentHour;
    }

    return (
        <Container theme={theme}>
            {/* Data Atual */}
            <CustomText variant="medium" className={`text-lg ${theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"}`}>
                {today.toLocaleDateString("en-US", { month: "long" })} {today.getDate()}, {today.getFullYear()}
            </CustomText>
            <CustomText variant="extraBold" className={`text-4xl mb-4 mt-2 ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
                Today
            </CustomText>

            {/* Dias da Semana */}
            <DayOfWeek selectedDay={selectedDay} setSelectedDay={setSelectedDay} days={days} />

            {/* Linha de Tempo */}
            <ScrollView className="relative pl-8 ">
                <View className={`absolute top-0 left-[-12px] bottom-32 w-[2px] ${theme === "dark" ? "bg-primary" : "bg-primary"}`} />
                
                {/* Lista de Eventos */}
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
                    <CustomText variant="medium" className={`text-center mt-4 ${theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"}`}>
                        No events for this day.
                    </CustomText>
                )}

                <View className="h-24"/>
            </ScrollView>

            {/* Botão de Criar Evento */}
            <CreateEvent />
        </Container>
    );
};

export default Schedule;
