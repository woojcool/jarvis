import { StyleSheet, View } from "react-native";
import { check } from "@/api/api";
import React, { useState, useEffect } from "react";
import { Surface, Text, useTheme, Button } from "react-native-paper";

export default function Overview() {
  const theme = useTheme();

  useEffect(() => {
    //
  });

  const handleCheckConnection = async () => {
    const response = await check();
    alert(JSON.stringify(response));
  };
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      {/* <Surface style={{ padding: 10 }}> */}
        <View>
          <Text variant="displayMedium">Welcome to Jarvis.</Text>
        </View>
        <View>
          <Text variant="titleMedium">Choose a tab below to get started.</Text>
        </View>
      {/* </Surface> */}
      {/* <Button onPress={handleCheckConnection}>Check Connection</Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
