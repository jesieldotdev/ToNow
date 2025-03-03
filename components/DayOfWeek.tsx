import { View, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

interface Day {
    value: number;  
    label: string;  
    dayNumber: number; // Agora garantimos que ele representa corretamente o número do dia do mês
}

interface DayOfWeekProps {
    days: Day[];
    selectedDay: number;
    setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}

export const DayOfWeek = ({ days, selectedDay, setSelectedDay }: DayOfWeekProps) => {
    return (
        <View className="flex-row justify-between items-center mb-4 pb-2">
            {days.map((day) => (
                <TouchableOpacity 
                    key={day.value} 
                    onPress={() => setSelectedDay(day.dayNumber)} // Corrigido para usar o número do dia real
                    accessibilityLabel={`Select ${day.label}`}
                >
                    <View className="items-center">
                        {/* Nome do dia */}
                        <CustomText
                            variant={selectedDay === day.dayNumber ? "bold" : "medium"} // Comparação corrigida
                            className={`text-lg ${selectedDay === day.dayNumber ? "text-blue-500" : "text-gray-500"}`}
                        >
                            {day.label}
                        </CustomText>

                        {/* Número do dia */}
                        <CustomText
                            variant={selectedDay === day.dayNumber ? "bold" : "medium"} // Comparação corrigida
                            className={`text-lg ${selectedDay === day.dayNumber ? "text-blue-500" : "text-gray-500"}`}
                        >
                            {day.dayNumber}
                        </CustomText>

                        {/* Indicador do dia selecionado */}
                        {selectedDay === day.dayNumber && <View className="w-1 h-1 bg-blue-500 rounded-full mt-1" />}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};
