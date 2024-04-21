import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Checkbox, Text, Surface, IconButton } from "react-native-paper";

const TaskItem = ({ name }) => {
  if (typeof name !== "string") {
    name = "NULL_TASK";
  }
  const [isPriority, setIsPriority] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleDeleteTask = () => {
    alert("Deleting");
  };

  const togglePriorityTask = () => {
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
          onPress={() => setChecked(!checked)}
        />
        <Text>{name}</Text>
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

const styles = StyleSheet.create({});
