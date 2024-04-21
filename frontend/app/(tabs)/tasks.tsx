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
import * as API from "@/api/api";
import { retrieveData } from "@/api/storage";


const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const update = () => {
    retrieveData('authToken')
      .then(token => API.tasks.fetch(token))
      .then(data => setTasks(data.tasks));
  };

  useEffect(update, [])

  const toggleAddingTask = () => {
    setIsAddingTask(!isAddingTask);
  };

  const handleSubmitAddingTask = async () => {
    const token = await retrieveData('authToken');
    await API.tasks.create(token, newTaskName);
    update();
    setIsAddingTask(false);
    setNewTaskName("");
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
          return <TaskItem data={task} update={update} key={idx} />;
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
