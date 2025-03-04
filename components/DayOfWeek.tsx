import { View, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Day {
    value: number;  
    label: string;  
    dayNumber: number; 
}

interface DayOfWeekProps {
    days: Day[];
    selectedDay: number;
    setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}

export const DayOfWeek = ({ days, selectedDay, setSelectedDay }: DayOfWeekProps) => {
    const theme = useSelector((state: RootState) => state.setting.theme); // Obtém o tema do Redux

    return (
        <View className="flex-row justify-between items-center mb-4 pb-2">
            {days.map((day) => (
                <TouchableOpacity 
                    key={day.value} 
                    onPress={() => setSelectedDay(day.dayNumber)} 
                    accessibilityLabel={`Select ${day.label}`}
                >
                    <View className="items-center">
                        {/* Nome do dia */}
                        <CustomText
                            variant={selectedDay === day.dayNumber ? "bold" : "medium"}
                            className={`text-lg ${selectedDay === day.dayNumber 
                                ? "text-primary" 
                                : theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"
                            }`}
                        >
                            {day.label}
                        </CustomText>

                        {/* Número do dia */}
                        <CustomText
                            variant={selectedDay === day.dayNumber ? "bold" : "medium"}
                            className={`text-lg ${selectedDay === day.dayNumber 
                                ? "text-primary" 
                                : theme === "dark" ? "text-textSecondaryDark" : "text-textSecondaryLight"
                            }`}
                        >
                            {day.dayNumber}
                        </CustomText>

                        {/* Indicador do dia selecionado */}
                        {selectedDay === day.dayNumber && <View className="w-1 h-1 bg-primary rounded-full mt-1" />}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};
