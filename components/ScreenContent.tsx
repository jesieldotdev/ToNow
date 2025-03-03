import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import CustomText from "../components/CustomText";
import EventItem from "./EventItem";
import CreateTodo from "./CreateTodo";
import { Container } from "./Container";
import { DayOfWeek } from "./DayOfWeek";
// import useStore from "hooks/useStore";

interface ScheduleProps {
  tasks: TaskItem[]
}

// const [, actions, select] = useStore()
// const {
//   event: {
//     filterEvents
//   }
// } = actions

// const events = select('event.items')

const Schedule = ({ tasks }: ScheduleProps) => {

  return (
    <Container>
      <CustomText variant="medium" className="text-lg text-gray-500 ">May 5, 2020</CustomText>
      <CustomText variant="extraBold" className="text-4xl mb-4 mt-2">Today</CustomText>
      
      <DayOfWeek />

      <ScrollView className="relative pl-8" >
        <View className="absolute top-0 left-[-12px]  bottom-32 w-[2px] bg-blue-500" />
        {tasks.map((event, index) => (
          <EventItem
            color={event.color ?? { primary: "#FF5722", secondary: "#FF8A65" }}
            key={index}
            time={event.time}
            title={event.title}
            description={event.description}
            isHighlighted={event.title === "Meeting"}
            participants={event && event.participants && event?.participants}
          />
        ))}

      </ScrollView>

    </Container>
  );
};

export default Schedule;
