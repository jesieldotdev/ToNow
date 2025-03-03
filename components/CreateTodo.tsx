import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, TouchableOpacity, Modal, Animated, Pressable, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomText from "./CustomText";
import { AntDesign } from "@expo/vector-icons";

interface CreateEventProps {
    handleAdd: (task: TaskItem )=>void
    visible: boolean;
    onClose: () => void;
}


  
  interface Time {
    hour: string; // "09:00"
    date: DateInfo;
  }


const colors = [
    { primary: "#FF5722", secondary: "#FF8A65" },
    { primary: "#FF9800", secondary: "#FFB74D" },
    { primary: "#FFC107", secondary: "#FFD54F" },
    { primary: "#4CAF50", secondary: "#81C784" },
    { primary: "#00BCD4", secondary: "#4DD0E1" },
    { primary: "#673AB7", secondary: "#9575CD" }
];

const CreateEvent: React.FC<CreateEventProps> = ({ visible, onClose, handleAdd }) => {
    const [showModal, setShowModal] = useState(visible);
    const translateY = useRef(new Animated.Value(300)).current;

    const [title, setTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState(colors[3]); 
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: 500,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowModal(false));
        }
    }, [visible]);

    const handleAddEvent = () => {
        if (title.trim().length > 0) {
            const selectedDate = date;
    
            const dateInfo: DateInfo = {
                day: {
                    label: selectedDate.toLocaleDateString('en-US', { weekday: 'short' }), // "Sun", "Mon", etc.
                    day: selectedDate.getDate(),
                },
                month: {
                    label: selectedDate.toLocaleDateString('en-US', { month: 'short' }), // "Jan", "Feb", etc.
                    day: selectedDate.getMonth() + 1, // JavaScript armazena meses começando do índice 0
                },
                year: selectedDate.getFullYear(),
                dayWeek: {
                    value: selectedDate.getDay(), // 0 (Domingo) - 6 (Sábado)
                    label: selectedDate.toLocaleDateString('en-US', { weekday: 'short' }), // "Sun", "Mon", etc.
                }
            };
    
            const formattedTime: Time = {
                hour: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // "09:00"
                date: dateInfo
            };
    
            handleAdd({
                title,
                description: '',
                time: formattedTime,
                participants: [],
                color: selectedColor
            });
    
            setTitle("");
            setDate(new Date());
            setStartTime(new Date());
            setEndTime(new Date());
            onClose();
        }
    };
    
    

    return (
        <Modal visible={showModal} transparent animationType="fade">
              <Pressable className="flex-1 justify-end bg-[rgba(0,0,0,0.4)]" onPress={onClose}>
                <Animated.View style={{ transform: [{ translateY }] }} className="bg-white p-6 rounded-t-2xl shadow-lg">
                    <CustomText variant="bold" className="text-xl mb-4 text-center">📝 Add New Task</CustomText>

                    {/* Campo de Título */}
                    <View className="mb-4">
                        <TextInput
                            className="text-lg p-3 border border-gray-300 rounded-lg bg-gray-100"
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Seletor de Cor */}
                    <CustomText variant="semiBold" className="text-gray-700 mb-2">Color</CustomText>
                    <View className="flex flex-row gap-3 mb-4">
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                onPress={() => setSelectedColor(color)}
                                style={{
                                    backgroundColor: color.primary,
                                    borderWidth: selectedColor.primary === color.primary ? 3 : 0,
                                    borderColor: color.secondary,
                                }}
                            >
                                {selectedColor.primary === color.primary && (
                                    <View className="w-3 h-3 rounded-full" style={{ backgroundColor: color.secondary }} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Seletor de Data */}
                    <CustomText variant="semiBold" className="text-gray-700 mb-2">Date</CustomText>
                    <TouchableOpacity
                        className="p-3 border border-gray-300 rounded-lg bg-gray-100 mb-3"
                        onPress={() => setShowDatePicker(true)}
                    >
                        <CustomText variant="regular" className="text-gray-700">{date.toDateString()}</CustomText>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(_, selected) => {
                                setShowDatePicker(false);
                                if (selected) setDate(selected);
                            }}
                        />
                    )}

                    {/* Seletor de Horário */}
                    <View className="flex flex-row justify-between mt-4">
                        {/* Horário de Início */}
                        <View className="flex-1 mr-2">
                            <CustomText variant="semiBold" className="text-gray-700 mb-2">Start Time</CustomText>
                            <TouchableOpacity
                                className="p-3 border border-gray-300 rounded-lg bg-gray-100"
                                onPress={() => setShowStartTimePicker(true)}
                            >
                                <CustomText variant="regular" className="text-gray-700">{startTime.toLocaleTimeString()}</CustomText>
                            </TouchableOpacity>
                            {showStartTimePicker && (
                                <DateTimePicker
                                    value={startTime}
                                    mode="time"
                                    display="default"
                                    onChange={(_, selected) => {
                                        setShowStartTimePicker(false);
                                        if (selected) setStartTime(selected);
                                    }}
                                />
                            )}
                        </View>

                        {/* Horário de Fim */}
                        {/* <View className="flex-1 ml-2">
                            <CustomText variant="semiBold" className="text-gray-700 mb-2">End Time</CustomText>
                            <TouchableOpacity
                                className="p-3 border border-gray-300 rounded-lg bg-gray-100"
                                onPress={() => setShowEndTimePicker(true)}
                            >
                                <CustomText variant="regular" className="text-gray-700">{endTime.toLocaleTimeString()}</CustomText>
                            </TouchableOpacity>
                            {showEndTimePicker && (
                                <DateTimePicker
                                    value={endTime}
                                    mode="time"
                                    display="default"
                                    onChange={(_, selected) => {
                                        setShowEndTimePicker(false);
                                        if (selected) setEndTime(selected);
                                    }}
                                />
                            )}
                        </View> */}
                    </View>

                    {/* Botões */}
                    <TouchableOpacity
                        className={`p-4 rounded-lg items-center shadow-md active:opacity-80 mt-4`}
                        onPress={handleAddEvent}
                        style={{ backgroundColor: selectedColor.primary }}

                    >
                        <CustomText variant="bold" className="text-white text-lg"><AntDesign name="plus" size={28} color="white" /> Add Task</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4 items-center" onPress={onClose}>
                        <CustomText variant="semiBold" className="text-gray-500"> Cancel</CustomText>
                    </TouchableOpacity>

                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default CreateEvent;
