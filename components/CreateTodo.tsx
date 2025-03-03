import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, TouchableOpacity, Modal, Animated, Pressable } from "react-native";
import CustomText from "./CustomText";

interface CreateTodoProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (title: string, description: string, time: string) => void;
}

const CreateTodo: React.FC<CreateTodoProps> = ({ visible, onClose, onAdd }) => {
    const [showModal, setShowModal] = useState(visible);
    const translateY = useRef(new Animated.Value(300)).current;

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

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");

    const handleAddTodo = () => {
        if (title.trim().length > 0 && time.trim().length > 0) {
            onAdd(title, description, time);
            setTitle("");
            setDescription("");
            setTime("");
            onClose();
        }
    };

    return (
        <Modal visible={showModal} transparent animationType="fade">
            <Pressable className="flex-1 justify-end bg-[rgba(0,0,0,0.3)]" onPress={onClose}>
                <Animated.View style={{ transform: [{ translateY }] }} className="bg-white p-6 rounded-t-2xl shadow-md">
                    <CustomText variant="bold" className="text-xl mb-4">Add New Task</CustomText>
                    <TextInput
                        className="text-lg p-2 mb-2 border-b border-gray-300"
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        numberOfLines={3}
                        className="text-lg p-2 mb-2 border-b border-gray-300 h-24"
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        className="text-lg p-2 mb-2 border-b border-gray-300"
                        placeholder="Time (e.g. 9:00 AM)"
                        value={time}
                        onChangeText={setTime}
                    />
                    <TouchableOpacity
                        className="bg-blue-500 p-3 rounded-xl mt-2 items-center"
                        onPress={handleAddTodo}
                    >
                        <CustomText variant="bold" className="text-white text-lg">Add Task</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity className="mt-4 items-center" onPress={onClose}>
                        <CustomText variant="semiBold" className="text-gray-500">Cancel</CustomText>
                    </TouchableOpacity>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export default CreateTodo;
