import { StyleSheet, View } from "react-native";
import { check } from "@/api/api";
import { Surface, Text, useTheme, Button } from "react-native-paper";

export default function Overview() {
  const theme = useTheme();
  const handleCheckConnection = async () => {
    const response = await check();
    alert(JSON.stringify(response));
  };
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Surface style={{ padding: 10 }}>
        <Text>Day at a glance</Text>
        <Text>Weather</Text>
        <Text>Quote of the Day</Text>
        <Text>Today's Habits</Text>
        <Text>Today's TODO</Text>
      </Surface>
      <Button onPress={handleCheckConnection}>Check Connection</Button>
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
