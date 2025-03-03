import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomText from "./CustomText";

export const DayOfWeek = () => {
    const [selectedDay, setSelectedDay] = useState<string>("Sat"); 
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <View className="flex-row justify-between items-center mb-4 pb-2">
            {days.map((day, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedDay(day)}>
                    <View className="items-center">
                        <CustomText
                            variant={selectedDay === day ? "bold" : "medium"}
                            className={`text-lg ${selectedDay === day ? "text-blue-500" : "text-gray-500"}`}
                        >
                            {day}
                        </CustomText>

                        <CustomText
                            variant={selectedDay === day ? "bold" : "medium"}
                            className={`text-lg ${selectedDay === day ? "text-blue-500" : "text-gray-500"}`}
                        >
                            {index + 4}
                        </CustomText>

                        {selectedDay === day && <View className="w-1 h-1 bg-blue-500 rounded-full" />}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};
