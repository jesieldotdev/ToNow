import React from "react";
import { Modal, Pressable, View, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import CustomText from "./CustomText";

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  theme: "dark" | "light";
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ visible, onClose, selectedDate, onDateSelect, theme }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable className="flex-1 justify-center bg-[rgba(0,0,0,0.3)]" onPress={onClose}>
        <View className={`${theme ==='dark'? 'bg-bgDark':'bg-bgLight'} p-5 rounded-lg mx-5`}>
          <Calendar
            onDayPress={(day: { dateString: string | number | Date; }) => {
              onDateSelect(new Date(day.dateString));
              onClose();
            }}
            markedDates={{
              [selectedDate.toISOString().split("T")[0]]: { selected: true, selectedColor: "#FF5722" },
            }}
        
            theme={{
                backgroundColor: theme === "dark" ? "#282828" : "#fff",
                calendarBackground: theme === "dark" ? "#282828" : "#fff",
                textSectionTitleColor: theme === "dark" ? "#9CA3AF" : "#6B7280",
                selectedDayBackgroundColor: "#FF5722",
                selectedDayTextColor: "#fff",
                todayTextColor: "#FF5722",
                dayTextColor: theme === "dark" ? "#fff" : "#000",
                textDisabledColor: "#d9e1e8",
                
                // 🔥 Adicionado para mudar a cor do nome do mês e ano
                monthTextColor: theme === "dark" ? "#ffffff" : "#000000",
              
                // 🔥 Opcional: mudar a cor das setas de navegação
                arrowColor: theme === "dark" ? "#ffffff" : "#000000",
              }}
              
          />
          <TouchableOpacity className="mt-4 p-3 bg-primary rounded-lg items-center" onPress={onClose}>
            <CustomText variant="bold" className="text-white">Fechar</CustomText>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default DatePickerModal;
