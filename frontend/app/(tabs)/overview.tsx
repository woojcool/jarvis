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
        <View>
          <Text>Day at a glance</Text>
        </View>
        <View>
          <Text>Quote of the Day</Text>
        </View>
        <View>
          <Text>Today's Habits</Text>
        </View>
        <View>
          <Text>Priority Todo</Text>
        </View>
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
