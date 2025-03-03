import React from "react";
import { View, ScrollView } from "react-native";
import CustomText from "../components/CustomText";

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

const Schedule = () => {
  return (
    <View className="p-8 bg-white flex-1 mt-6">
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
        <View className="absolute left-[-12px] top-0 bottom-0 w-[2px] bg-blue-500" />
        {events.map((event, index) => (
          <View key={index} className="mb-6 flex-row items-center relative">
            <View className={`w-6 h-6 border-2 ${event.title === "Meeting" ? "border-blue-500 bg-white" : "border-blue-500 bg-white"} rounded-full absolute -left-6 flex items-center justify-center`}>
              {event.title === "Meeting" && <View className="w-3 h-3 bg-blue-500 rounded-full" />}
            </View>
            <View className={`ml-6 flex-1 p-4 rounded-xl shadow-lg ${event.title === "Meeting" ? "bg-blue-500" : "bg-gray-100"}`}>
              <CustomText variant="semiBold" className="text-xs text-gray-400 mb-1">{event.time}</CustomText>
              <CustomText variant="bold" className={`text-xl ${event.title === "Meeting" ? "text-white" : "text-black"}`}>{event.title}</CustomText>
              <CustomText variant="regular" className={`text-base mt-1 ${event.title === "Meeting" ? "text-white" : "text-gray-600"}`}>{event.description}</CustomText>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Schedule;
