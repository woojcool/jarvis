import { StyleSheet, View } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";

const Tasks = () => {
  const theme = useTheme();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text>todo</Text>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
