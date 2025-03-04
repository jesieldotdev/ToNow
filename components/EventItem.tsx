import React from "react";
import { Image, View } from "react-native";
import CustomText from "./CustomText";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface EventProps {
  time: Time;
  title: string;
  description?: string;
  isHighlighted?: boolean;
  participants?: string[];
}

const EventItem: React.FC<EventProps> = ({ time, title, description, isHighlighted, participants }:EventProps) => {
  const theme = useSelector((state: RootState) => state.setting.theme); // Obtém o tema do Redux

  // Se description não existir ou for vazia, usa o título como descrição
  const displayedDescription = description && description.trim().length > 0 ? description : title;

  return (
    <View className="mb-6 flex-row items-center relative">
      {/* Indicador de Evento */}
      <View
        className={`border-2 
          ${isHighlighted ? "border-primary bg-bgLight w-8 h-8 -left-[25px]" : "border-primary bg-bgLight w-5 h-5 -left-[20px]"}
          rounded-full absolute top-0 flex items-center justify-center
        `}
      >
        {isHighlighted && <View className="w-5 h-5 bg-primary rounded-full" />}
      </View>

      {/* Container Principal */}
      <View
        className={`ml-6 flex-1 p-5 rounded-xl drop-shadow-lg
          ${isHighlighted ? "bg-primary" : theme === "dark" ? "bg-cardDark" : "bg-cardLight"}
        `}
      >
        <View className="flex flex-row justify-between">
          {description ? (
            <CustomText
              variant="bold"
              className={`text-xl ${isHighlighted ? "text-white" : theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}
            >
              {title}
            </CustomText>
          ) : null}
          <CustomText
            variant="semiBold"
            className={`text-sm mb-1 ${isHighlighted ? "text-white" : theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"}`}
          >
            {time.hour}
          </CustomText>
        </View>

        <CustomText
          variant="regular"
          className={`text-base mt-1 ${isHighlighted ? "text-white" : theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"}`}
        >
          {displayedDescription}
        </CustomText>

        {/* Lista de Participantes */}
        {participants?.length ? (
          <View className="flex flex-row gap-1 mt-2">
            {participants.map((item, index) => (
              <View key={index} className="p-0.5 bg-bgLight dark:bg-bgDark rounded-full">
                <Image source={{ uri: item }} className="w-8 h-8 rounded-full" resizeMode="cover" />
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default EventItem;
