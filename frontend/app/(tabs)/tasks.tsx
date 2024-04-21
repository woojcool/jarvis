import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  useTheme,
  TextInput,
  IconButton,
} from "react-native-paper";
import TaskItem from "@/components/TaskItem";
import { router } from "expo-router";

const fillerTasks = [
  {
    name: "Task X",
  },
  {
    name: "Task Y",
  },
  {
    name: "Task Z",
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(fillerTasks);
  const [newTaskName, setNewTaskName] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const toggleAddingTask = () => {
    setIsAddingTask(!isAddingTask);
  };

  const handleSubmitAddingTask = () => {
    alert(newTaskName);
  };

  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.pageContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.innerContainer}>
        {tasks.map((task, idx) => {
          return <TaskItem name={task.name} key={idx} />;
        })}
        {isAddingTask && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{ marginVertical: 8, flex: 1 }}
              value={newTaskName}
              onChangeText={setNewTaskName}
              label="Enter Task Name"
            />

            <IconButton icon="plus" onPress={handleSubmitAddingTask} />
          </View>
        )}
        <Button mode="outlined" onPress={toggleAddingTask}>
          {isAddingTask ? "Cancel" : "Add Task"}
        </Button>
      </View>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  innerContainer: {
    width: 350,
  },
});
