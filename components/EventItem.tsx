import React from "react";
import { View } from "react-native";
import CustomText from "./CustomText";

interface EventProps {
    time: string;
    title: string;
    description: string;
    isHighlighted?: boolean;
}

const EventItem: React.FC<EventProps> = ({ time, title, description, isHighlighted }) => {
    return (
        <View className="mb-6 flex-row items-center relative">
            <View className={`w-5 h-5 border-2 ${isHighlighted ? "border-blue-500 bg-white" : "border-blue-500 bg-white"} rounded-full absolute -left-[20px]  top-0 flex items-center justify-center`}>
                {isHighlighted && <View className="w-2 h-2 bg-blue-500 rounded-full" />}
            </View>

            <View className={`ml-6 flex-1 p-5 rounded-xl shadow-lg ${isHighlighted ? "bg-blue-500" : "bg-gray-100"}`}>
                <View className="flex flex-row justify-between">
                    <CustomText variant="bold" className={`text-xl ${isHighlighted ? "text-white" : "text-black"}`}>{title}</CustomText>
                    <CustomText variant="semiBold" className={`text-sm  mb-1 ${isHighlighted ? 'text-white' : 'text-gray-400'}`}>{time}</CustomText>
                </View>
                <CustomText variant="regular" className={`text-base mt-1 ${isHighlighted ? "text-white" : "text-gray-600"}`}>{description}</CustomText>
            </View>
        </View>
    );
};

export default EventItem;