import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import CustomText from "../components/CustomText";
import EventItem from "./EventItem";
import CreateTodo from "./CreateTodo";
import { Container } from "./Container";
// import useStore from "hooks/useStore";

const events = [
  { time: "7:00 AM", title: "Wakeup", description: "Early wakeup from bed and fresh" },
  { time: "8:00 AM", title: "Morning Exercise", description: "4 types of exercise" },
  {
    time: "9:00 AM",
    title: "Meeting",
    description: "Zoom call, Discuss team task for the day",
    participants: ["👨‍💼", "👩‍💼", "👨‍💻", "👩‍💻"]
  },
  { time: "10:00 AM", title: "Breakfast", description: "Morning breakfast with bread, banana, egg bowl and tea." }
];

// const [, actions, select] = useStore()
// const {
//   event: {
//     filterEvents
//   }
// } = actions

// const events = select('event.items')

const Schedule = () => {
 
  return (
    <Container>
      <CustomText variant="regular" className="text-sm text-gray-400">May 5, 2020</CustomText>
      <CustomText variant="bold" className="text-3xl mb-4">Today</CustomText>
      <View className="flex-row justify-between items-center mb-4 border-b border-gray-200 pb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <View key={index} className="items-center">
            <CustomText
              variant="semiBold"
              className={`text-sm ${day === "Sat" ? "text-blue-500" : "text-gray-500"}`}
            >
              {day}
            </CustomText>

            <CustomText
              variant="bold"
              className={`text-lg ${day === "Sat" ? "text-blue-500" : "text-gray-500"}`}
            >
              {index + 4}
            </CustomText>
            {day === "Sat" ? <View className="w-1 h-1 bg-blue-500 rounded-full" /> : null}

          </View>
        ))}
      </View>

      <ScrollView className="relative pl-8">
        <View className="absolute top-0 left-[-12px]  bottom-0 w-[2px] bg-blue-500" />
        {events.map((event, index) => (
          <EventItem
            key={index}
            time={event.time}
            title={event.title}
            description={event.description}
            isHighlighted={event.title === "Morning Exercise"}
          />
        ))}
      </ScrollView>

    </Container>
  );
};

export default Schedule;
