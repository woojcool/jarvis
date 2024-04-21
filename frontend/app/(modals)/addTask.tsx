import { StyleSheet, View } from "react-native";
import { Text, Surface, useTheme, TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const addTask = () => {
  const theme = useTheme();
  const [taskName, setTaskName] = useState("");

  const handleSubmit = () => {
    alert("Submitted Task");
  };

  return (
    <View
      style={{
        ...styles.pageContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <Surface style={styles.innerContainer}>
        <TextInput
          style={{ ...styles.verticalMargin }}
          value={taskName}
          onChangeText={setTaskName}
          label="Task Name"
          dense
        />

        <Button
          style={{ ...styles.verticalMargin }}
          mode="contained"
          onPress={handleSubmit}
        >
          Submit
        </Button>
       
      </Surface>
    </View>
  );
};

export default addTask;

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  innerContainer: {
    padding: 10,
    width: 350,
  },

  verticalMargin: {
    marginVertical: 8,
  },
});
