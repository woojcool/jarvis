import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  useTheme,
  Button,
  IconButton,
} from "react-native-paper";
import HabitItem from "@/components/HabitItem";
import * as API from "@/api/api";
import { retrieveData } from "@/api/storage";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [isAddingHabit, setIsAddingHabit] = useState(false);

  const update = () => {
    retrieveData('authToken')
      .then(token => API.habits.fetch(token))
      .then(data => setHabits(data.habits))
  }

  useEffect(update, [])

  const toggleAddingHabit = () => {
    setIsAddingHabit(!isAddingHabit);
  };

  const handleSubmitAddingHabit = async () => {
    const token = await retrieveData('authToken');
    await API.habits.create(token, newHabitName, [false, false, false, false, false, false, false]);
    update();
    setIsAddingHabit(false);
    setNewHabitName("");
  };

  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.pageContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.contentContainer}>
        {habits.map((habit, idx) => {
          return <HabitItem data={habit} update={update} key={idx} />
        })}
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
