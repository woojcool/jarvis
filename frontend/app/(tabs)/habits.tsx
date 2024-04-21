import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  useTheme,
  Button,
  IconButton,
} from "react-native-paper";
import HabitItem from "@/components/HabitItem";

export default function Habits() {
  const theme = useTheme();
  const [habits, setHabits] = useState([]);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const toggleAddingHabit = () => {
    setIsAddingHabit(!isAddingHabit);
  };

  const handleSubmitAddingHabit = () => {
    alert("Submit Adding Habit");
    setIsAddingHabit(false);
  };

  return (
    <View
      style={{
        ...styles.pageContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.contentContainer}>
        <HabitItem name="Habit" />
        <HabitItem name="Habit 2" />
        <HabitItem name="Habit 3" />
        {isAddingHabit && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{ marginVertical: 8, flex: 1 }}
              value={newHabitName}
              onChangeText={setNewHabitName}
              label="Enter Habit Name"
            />

            <IconButton icon="plus" onPress={handleSubmitAddingHabit} />
          </View>
        )}
        <Button mode="outlined" onPress={toggleAddingHabit}>
          {isAddingHabit ? "Cancel" : "Add Habit"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  contentContainer: {
    width: 350,
  },
});
