import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, useTheme, Surface, IconButton } from "react-native-paper";
import React, { useState } from "react";

const HabitItem = ({ name }) => {
  const theme = useTheme();

  const SmallBtn = ({ letter }) => {
    const [enabled, setEnabled] = useState();

    const handleEnableDay = () => {
        // API call to ensure
      setEnabled(!enabled);
    
    };

    return (
      <TouchableOpacity onPress={handleEnableDay}>
        <Text
          style={{
            margin: 4,
            padding: 4,
            color: enabled ? "yellow" : theme.colors.onBackground,
          }}
        >
          {letter}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleDeleteHabit = () => {
    alert("Deleting");
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.left}>
        <Text style={{ marginLeft: 5 }}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <SmallBtn letter="SU" />
          <SmallBtn letter="M" />
          <SmallBtn letter="TU" />
          <SmallBtn letter="W" />
          <SmallBtn letter="TH" />
          <SmallBtn letter="F" />
          <SmallBtn letter="SA" />
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
