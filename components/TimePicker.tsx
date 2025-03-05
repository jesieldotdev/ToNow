import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TimePickerModal } from "react-native-paper-dates";

interface TimePickerProps {
  visible: boolean;
  onClose: () => void;
  selectedTime: Date;
  onTimeSelect: (time: Date) => void;
}

const CustomTimePicker: React.FC<TimePickerProps> = ({ visible, onClose, selectedTime, onTimeSelect }) => {
  const [open, setOpen] = useState(visible);
  const [hour, setHour] = useState(selectedTime.getHours());
  const [minute, setMinute] = useState(selectedTime.getMinutes());

  const handleDismiss = () => {
    setOpen(false);
    onClose();
  };

  const handleConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    const newTime = new Date();
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    setHour(hours);
    setMinute(minutes);
    onTimeSelect(newTime);
    setOpen(false);
    onClose();
  };

  return (
    <View style={styles.container}>
      <TimePickerModal
        visible={open}
        use24HourClock
        onDismiss={handleDismiss}
        onConfirm={handleConfirm}
        hours={hour}
        minutes={minute}
        label="Selecione o horário ds"
        animationType="fade"
        clockIcon="clock-outline"
        confirmLabel="OK"
        cancelLabel="Cancelar"
        // 🔥 FORÇANDO ESTILOS NO MODAL
        contentStyle={styles.modalContent} 
        theme={{
          colors: {
            primary: "#FF5722", // Cor do botão de confirmação
            accent: "#FF9800", // Cor do botão de cancelar
            background: "#263238", // Cor do fundo geral
            text: "#FFFFFF", // Cor do texto do modal
            backdrop: "rgba(0, 0, 0, 0.7)", // Cor do fundo escuro atrás do modal
            onSurface: "#FFFFFF", // Cor do texto principal
            surface: "#37474F", // Cor do modal em si
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#37474F", // 🔥 Define a cor de fundo do modal
    borderRadius: 10,
    padding: 10,
  },
});

export default CustomTimePicker;
