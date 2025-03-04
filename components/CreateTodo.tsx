import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, TouchableOpacity, Modal, Animated, Pressable, Easing } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomText from "./CustomText";
import { AntDesign } from "@expo/vector-icons";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import { RootState } from "store";

const CreateEvent = () => {
    const [, actions, select] = useStore();
    const {
        task: {
            addTaskItem,
            setTask
        }
    } = actions;

    const theme = useSelector((state: RootState) => state.setting.theme); // Obtém o tema do Redux
    const visible = select("task.taskModalTable");
    const setIsOpen = () => setTask("taskModalTable", !visible);

    const handleAddTodo = (task: TaskItem) => {
        console.log("Nova tarefa:", task);
        addTaskItem(task);
    };

    const translateY = useRef(new Animated.Value(500)).current;
    const [isVisible, setIsVisible] = useState(visible);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
            handleAddTodo({
                title,
                description,
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
            });

            setTitle("");
            setDescription("");
            setDate(new Date());
            setStartTime(new Date());

            Animated.timing(translateY, {
                toValue: 500,
                duration: 250,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => setIsOpen());
        }
    };

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <Pressable className="flex-1 justify-end bg-[rgba(0,0,0,0.4)]" onPress={setIsOpen}>
                <Animated.View
                    style={{ transform: [{ translateY }] }}
                    className={`p-6 rounded-t-2xl shadow-lg 
                        ${theme === "dark" ? "bg-bgDark" : "bg-bgLight"}
                    `}
                >
                    <CustomText variant="bold" className={`text-xl mb-4 text-center ${theme === "dark" ? "text-textPrimaryDark" : "text-textPrimaryLight"}`}>
                        📝 Add New Task
                    </CustomText>

                    <View className="mb-4">
                        <TextInput
                            className={`text-lg p-3 border rounded-lg 
                                ${theme === "dark" ? "border-gray-600 bg-cardDark text-textPrimaryDark" : "border-gray-300 bg-cardLight text-textPrimaryLight"}
                            `}
                            placeholder="Title"
                            placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View className="mb-4">
                        <TextInput
                            className={`text-lg p-3 border rounded-lg 
                                ${theme === "dark" ? "border-gray-600 bg-cardDark text-textPrimaryDark" : "border-gray-300 bg-cardLight text-textPrimaryLight"}
                            `}
                            placeholder="Description"
                            placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View className="flex flex-row gap-4">
                        <View>
                            <CustomText variant="semiBold" className={`${theme === "dark" ? "text-textPrimaryDark" : "text-gray-700"} mb-2`}>
                                Date
                            </CustomText>
                            <TouchableOpacity
                                className={`p-3 border rounded-lg 
                                    ${theme === "dark" ? "border-gray-600 bg-cardDark text-textPrimaryDark" : "border-gray-300 bg-cardLight text-textPrimaryLight"}
                                `}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <CustomText variant="regular">{date.toDateString()}</CustomText>
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

                        <View>
                            <CustomText variant="semiBold" className={`${theme === "dark" ? "text-textPrimaryDark" : "text-gray-700"} mb-2`}>
                                Start Time
                            </CustomText>
                            <TouchableOpacity
                                className={`p-3 border rounded-lg 
                                    ${theme === "dark" ? "border-gray-600 bg-cardDark text-textPrimaryDark" : "border-gray-300 bg-cardLight text-textPrimaryLight"}
                                `}
                                onPress={() => setShowStartTimePicker(true)}
                            >
                                <CustomText variant="regular">{startTime.toLocaleTimeString()}</CustomText>
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
                        className="p-4 rounded-lg items-center shadow-md active:opacity-80 mt-4 bg-primary"
                        onPress={handleAddEvent}
                    >
                        <CustomText variant="bold" className="text-white text-lg">
                            <AntDesign name="plus" size={28} color="white" /> Add Task
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4 items-center" onPress={setIsOpen}>
                        <CustomText variant="semiBold" className={`${theme === "dark" ? "text-textSecondaryDark" : "text-gray-500"}`}>
                            Cancel
                        </CustomText>
                    </TouchableOpacity>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default CreateEvent;
