import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, useTheme, Surface, IconButton } from "react-native-paper";
import React, { useState } from "react";
import * as API from "@/api/api";
import { retrieveData } from "@/api/storage";

const HabitItem = ({ data, update }) => {
  const [completed, setCompleted] = useState(data.completed);

  const handleDeleteHabit = async () => {
    const token = await retrieveData('authToken');
    await API.habits.delete(token, data.habitID);
    update();
  };

  const SmallBtn = ({ idx, letter, on }) => {
    const [enabled, setEnabled] = useState(on);

    const handleEnableDay = async () => {
      const copy = [...completed];
      copy[idx] = !(completed[idx]);
      const token = await retrieveData('authToken');
      API.habits.update(token, data.habitID, data.name, data.scheduled, copy);
      setCompleted(copy);
      setEnabled(!enabled);
    };

    return (
      <TouchableOpacity onPress={handleEnableDay}>
        <Text
          style={{
            margin: 4,
            padding: 4,
            color: enabled ? "lightgreen" : "gray", //theme.colors.onBackground,
          }}
        >
          {letter}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.left}>
        <Text style={{ marginLeft: 5 }}>{data.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <SmallBtn key={0} idx={0} on={completed[0]} letter="SU" />
          <SmallBtn key={1} idx={1} on={completed[1]} letter="M" />
          <SmallBtn key={2} idx={2} on={completed[2]} letter="TU" />
          <SmallBtn key={3} idx={3} on={completed[3]} letter="W" />
          <SmallBtn key={4} idx={4} on={completed[4]} letter="TH" />
          <SmallBtn key={5} idx={5} on={completed[5]} letter="F" />
          <SmallBtn key={6} idx={6} on={completed[6]} letter="SA" />
        </View>
      </View>
      <View style={styles.right}>
        <IconButton icon="delete" onPress={handleDeleteHabit} />
      </View>
    </Surface>
  );
};

export default HabitItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
    marginVertical: 8,
  },

  left: {
    flex: 5,
    flexDirection: "column",
  },

  right: {
    flex: 1,
  },
});
