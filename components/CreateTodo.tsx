import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, TouchableOpacity, Modal, Animated, Pressable, Easing } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomText from "./CustomText";
import { AntDesign } from "@expo/vector-icons";

interface CreateEventProps {
    handleAdd: (task: TaskItem) => void;
    visible: boolean;
    onClose: () => void;
}

const colors = [
    { primary: "#FF5722", secondary: "#FF8A65" },
    { primary: "#FF9800", secondary: "#FFB74D" },
    { primary: "#FFC107", secondary: "#FFD54F" },
    { primary: "#4CAF50", secondary: "#81C784" },
    { primary: "#00BCD4", secondary: "#4DD0E1" },
    { primary: "#673AB7", secondary: "#9575CD" }
];

const CreateEvent = ({ visible, onClose, handleAdd }: CreateEventProps) => {
    const translateY = useRef(new Animated.Value(500)).current;
    const [isVisible, setIsVisible] = useState(visible);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState(colors[3]);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            translateY.setValue(500); // Garante que sempre começa fora da tela
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: 500,
                duration: 250,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => setIsVisible(false));
        }
    }, [visible]);

    const handleAddEvent = () => {
        if (title.trim().length > 0) {
            handleAdd({
                title,
                description: "",
                time: {
                    hour: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    date: {
                        day: { label: date.toLocaleDateString('en-US', { weekday: 'short' }), day: date.getDate() },
                        month: { label: date.toLocaleDateString('en-US', { month: 'short' }), day: date.getMonth() + 1 },
                        year: date.getFullYear(),
                        dayWeek: { value: date.getDay(), label: date.toLocaleDateString('en-US', { weekday: 'short' }) }
                    }
                },
                participants: [],
                color: selectedColor
            });

            setTitle("");
            setDate(new Date());
            setStartTime(new Date());

            Animated.timing(translateY, {
                toValue: 500,
                duration: 250,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => onClose());
        }
    };

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <Pressable className="flex-1 justify-end bg-[rgba(0,0,0,0.4)]" onPress={onClose}>
                <Animated.View
                    style={{ transform: [{ translateY }] }}
                    className="bg-white p-6 rounded-t-2xl shadow-lg"
                >
                    <CustomText variant="bold" className="text-xl mb-4 text-center">📝 Add New Task</CustomText>

                    <View className="mb-4">
                        <TextInput
                            className="text-lg p-3 border border-gray-300 rounded-lg bg-gray-100"
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View className="mb-4">
                        <TextInput
                            className="text-lg p-3 border border-gray-300 rounded-lg bg-gray-100"
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    {/* <CustomText variant="semiBold" className="text-gray-700 mb-2">Color</CustomText>
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
                    </View> */}
                    <View className="flex flex-row gap-4">

                        <View>
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

                        </View>

                            <View className="">
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
                    </View>
                    <TouchableOpacity
                        className="p-4 rounded-lg items-center shadow-md active:opacity-80 mt-4"
                        onPress={handleAddEvent}
                        style={{ backgroundColor: selectedColor.primary }}
                    >
                        <CustomText variant="bold" className="text-white text-lg">
                            <AntDesign name="plus" size={28} color="white" /> Add Task
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4 items-center" onPress={onClose}>
                        <CustomText variant="semiBold" className="text-gray-500">Cancel</CustomText>
                    </TouchableOpacity>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default CreateEvent;
