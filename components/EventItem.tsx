import React from "react";
import { Image, View } from "react-native";
import CustomText from "./CustomText";

interface EventProps {
    time: Time;
    title: string;
    description?: string;
    isHighlighted?: boolean;
    participants?: string[];
}

const EventItem: React.FC<EventProps> = ({ time, title, description, isHighlighted, participants }) => {
    // Se description não existir ou for vazia, usa o título como descrição
    const displayedDescription = description && description.trim().length > 0 ? description : title;

    return (
        <View className="mb-6 flex-row items-center relative">
            {/* Indicador de Evento */}
            <View className={`border-2 ${isHighlighted ? "border-blue-500 bg-white w-8 h-8 -left-[25px]" : "border-blue-500 bg-white w-5 h-5 -left-[20px]"} rounded-full absolute top-0 flex items-center justify-center`}>
                {isHighlighted && <View className={`w-2 h-2 bg-blue-500 rounded-full ${isHighlighted ? 'w-5 h-5':''}`} />}
            </View>

            {/* Container Principal */}
            <View className={`ml-6 flex-1 p-5 rounded-xl drop-shadow-lg ${isHighlighted ? "bg-blue-500" : "bg-gray-100"}`}>
                <View className="flex flex-row justify-between">
                    {description ? <CustomText variant="bold" className={`text-xl ${isHighlighted ? "text-white" : "text-black"}`}>{title}</CustomText> : null}
                    <CustomText variant="semiBold" className={`text-sm mb-1 ${isHighlighted ? 'text-white' : 'text-gray-400'}`}>{time.hour}</CustomText>
                </View>

                <CustomText variant="regular" className={`text-base mt-1 ${isHighlighted ? "text-white" : "text-gray-600"}`}>
                    {displayedDescription}
                </CustomText>

                {/* Lista de Participantes */}
                {participants?.length ? (
                    <View className="flex flex-row gap-1 mt-2">
                        {participants.map((item, index) => (
                            <View key={index} className="p-0.5 bg-white rounded-full">
                                <Image
                                    source={{ uri: item }}
                                    className="w-8 h-8 rounded-full"
                                    resizeMode="cover"
                                />
                            </View>
                        ))}
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default EventItem;
