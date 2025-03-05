import  { useState, useEffect, useRef } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { View, TextInput, TouchableOpacity, Modal, Animated, Pressable, Easing } from "react-native";
import CustomText from "./CustomText";
import { AntDesign } from "@expo/vector-icons";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import DatePickerModal from "./DatePicker";
import CustomTimePicker from "./TimePicker";
import { getTailwindClass } from "store/setting/utils";

const CreateEvent = () => {
    const [, actions, select] = useStore();
    const {
        task: {
            addTaskItem,
            setTask
        }
    } = actions;

    const theme = select('setting.theme');
    const accent = select('setting.accentColor');
    const visible = select("task.taskModalTable");
    const setIsOpen = () => setTask("taskModalTable", !visible);

    const handleAddTodo = (task: TaskItem) => {
        addTaskItem(task);
    };

    const translateY = useRef(new Animated.Value(500)).current;
    const [isVisible, setIsVisible] = useState(visible);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            translateY.setValue(500);
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
                    hour: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    date: {
                        day: { label: date.toLocaleDateString('en-US', { weekday: 'short' }), value: date.getDate() },
                        month: { label: date.toLocaleDateString('en-US', { month: 'short' }), value: date.getMonth() + 1 },
                        year: date.getFullYear(),
                        dayWeek: { value: date.getDay(), label: date.toLocaleDateString('en-US', { weekday: 'short' }) }
                    }
                },
                participants: [],
            });

            setTitle("");
            setDescription("");
            setDate(new Date());
            setTime(new Date());

            Animated.timing(translateY, {
                toValue: 500,
                duration: 250,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => setIsOpen());
        }
    };

    useEffect(() => {
        // ✅ Atualiza a barra de navegação corretamente
        NavigationBar.setBackgroundColorAsync(theme === "dark" ? "#282828" : "#fff");
        NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
    }, [theme]);

    return (
        <Modal transparent visible={isVisible} animationType="fade" statusBarTranslucent>
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

                    {/* 🔥 Campo de Seleção de Data */}
                    <View className="mb-4">
                        <CustomText variant="semiBold" className={`${theme === "dark" ? "text-textPrimaryDark" : "text-gray-700"} mb-2`}>
                            Date
                        </CustomText>
                        <TouchableOpacity className={`p-3 border rounded-lg ${theme === 'dark' ? 'border-textPrimaryDark' : 'border-textSecondaryLight'}`} onPress={() => setShowDatePicker(true)}>
                            <CustomText className={theme === 'dark' ? `text-textPrimaryDark` : 'text-textPrimaryLight'} variant="regular">
                                {date.toDateString()}
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {/* 🔥 Campo de Seleção de Hora */}
                    <View className="mb-4">
                        <CustomText variant="semiBold" className={`${theme === "dark" ? "text-textPrimaryDark" : "text-gray-700"} mb-2`}>
                            Time
                        </CustomText>
                        <TouchableOpacity className={`p-3 border rounded-lg ${theme === 'dark' ? 'border-textPrimaryDark' : 'border-textSecondaryLight'}`} onPress={() => setShowTimePicker(true)}>
                            <CustomText className={theme === 'dark' ? `text-textPrimaryDark` : 'text-textPrimaryLight'} variant="regular">
                                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {/* 🔥 Botão de Adicionar Tarefa */}
                    <TouchableOpacity
                        className={`p-4 rounded-lg items-center shadow-md active:opacity-80 mt-4 ${getTailwindClass(accent, 'bg')}`}
                        onPress={handleAddEvent}
                    >
                        <CustomText variant="bold" className="text-white text-lg">
                            <AntDesign name="plus" size={28} color="white" /> Add Task
                        </CustomText>
                    </TouchableOpacity>

                    {/* 🔥 Componentes de Modais Separados */}
                    <DatePickerModal visible={showDatePicker} onClose={() => setShowDatePicker(false)} selectedDate={date} onDateSelect={setDate} theme={theme} />
                    {showTimePicker && (
                        <CustomTimePicker
                            visible={showTimePicker}
                            onClose={() => setShowTimePicker(false)}
                            selectedTime={time}
                            onTimeSelect={setTime}
                        />
                    )}
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default CreateEvent;
