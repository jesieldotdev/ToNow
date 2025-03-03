import { StatusBar } from "expo-status-bar";
import "./global.css";
import Schedule from "components/ScreenContent";
import TabBar from "./components/Tabbar";
import { View } from "react-native";
import { useState } from "react";
import CreateTodo from "components/CreateTodo";
import Store from "./store";
import useStore from "hooks/useStore";
import { sortTasks } from "store/task/utils";

export default function App() {
  return (
    <Store>
      <AppContent />
    </Store>
  );
}

function AppContent() {
  const [, actions, select] = useStore();
  const {
    task: {
      addTaskItem
    }
  } = actions
  const tasks = select("task.items");



  const [isVisible, setIsVisible] = useState(false);

  const handleAddTodo = (task: TaskItem) => {
    console.log("Nova tarefa:", task);
    addTaskItem(task)
  };

  function handleAdd() {
    setIsVisible((prev) => !prev);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <Schedule tasks={sortTasks(tasks)} />
      <TabBar handleAdd={handleAdd} />
      <StatusBar style="light" />
      <CreateTodo
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        handleAdd={handleAddTodo}
      />
    </View>
  );
}
