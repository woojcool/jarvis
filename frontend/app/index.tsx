import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import React from "react";

const index = () => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
