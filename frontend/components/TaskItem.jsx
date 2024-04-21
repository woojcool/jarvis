import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Checkbox, Text, Surface, IconButton } from "react-native-paper";
import * as API from "@/api/api";
import { retrieveData } from "@/api/storage";

const TaskItem = ({ data, update }) => {
  if (typeof data.name !== "string") {
    data.name = "NULL_TASK";
  }
  const [isPriority, setIsPriority] = useState(data.priority);
  const [checked, setChecked] = useState(data.completed);
  const handleDeleteTask = async () => {
    const token = await retrieveData('authToken');
    await API.tasks.delete(token, data.taskID);
    update();
  };
  const toggleChecked = async () => {
    const token = await retrieveData('authToken');
    API.tasks.update(token, data.taskID, data.name, isPriority, !checked)
    setChecked(!checked);
  }
  
  const togglePriorityTask = async () => {
    const token = await retrieveData('authToken');
    API.tasks.update(token, data.taskID, data.name, !isPriority, checked)
    setIsPriority(!isPriority);
  };

  return (
    <Surface
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={toggleChecked}
        />
        <Text variant="titleMedium">{data.name}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        {isPriority && (
          <IconButton
            icon="star"
            iconColor="yellow"
            onPress={togglePriorityTask}
          />
        )}
        {!isPriority && <IconButton icon="star" onPress={togglePriorityTask} />}
        <IconButton icon="delete" onPress={handleDeleteTask} />
      </View>
    </Surface>
  );
};

export default TaskItem;
