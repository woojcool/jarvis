import { StyleSheet, View, ScrollView } from "react-native";
import { Text, useTheme, Surface, TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import { router } from "expo-router";
import { auth } from "@/api/api";
import { storeData } from "@/api/storage";

const index = () => {
  const theme = useTheme();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPasssword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLoginButton = async () => {
    const response = await auth.login(loginUsername, loginPassword);
    if (response.error) {
      alert(response.error);
      return;
    }

    // ensure token is a string
    const token = response?.token;
    if (token) {
      storeData("authToken", response.token);
      router.replace("/(tabs)/overview");
    } else {
      alert("Token not found")
    }
  };

  const handleRegisterButton = async () => {
    if (registerPassword.localeCompare(confirmPassword) === 0) {
      const response = await auth.register(registerUsername, registerPassword);
      if (response.error) {
        alert(response.error);
        return;
      }
      const token = response?.token;
      if (token) {
        alert("Successful Registration");
        storeData("authToken", token);
        router.replace("/(tabs)/overview");
      } else {
        alert("Token not found");
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 4,
        flex: 1,
        flexGrow: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text variant="displayMedium">Jarvis.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.surfacesContainer}>
        <Surface style={styles.innerSurface}>
          <Text variant="displaySmall">Existing User</Text>

          <TextInput
            style={styles.verticalSpacing}
            label="Username"
            value={loginUsername}
            onChangeText={setLoginUsername}
          />
          <TextInput
            style={styles.verticalSpacing}
            label="Password"
            value={loginPassword}
            secureTextEntry
            onChangeText={setLoginPassword}
          />
          <Button
            onPress={handleLoginButton}
            style={styles.verticalSpacing}
            mode="contained"
          >
            Log in
          </Button>
        </Surface>
        <Surface style={styles.innerSurface}>
          <Text style={styles.verticalSpacing} variant="displaySmall">
            New User
          </Text>
          <TextInput
            style={styles.verticalSpacing}
            value={registerUsername}
            onChangeText={setRegisterUsername}
            label="Username"
          />
          <TextInput
            style={styles.verticalSpacing}
            value={registerPassword}
            onChangeText={setRegisterPasssword}
            label="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.verticalSpacing}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            label="Confirm Password"
            secureTextEntry
          />
          <Button
            onPress={handleRegisterButton}
            style={styles.verticalSpacing}
            mode="contained"
          >
            Register
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  surfacesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
    flex: 1,
    height: "100%",
    flexGrow: 1,
  },

  innerSurface: {
    flexDirection: "column",
    width: "25%",
    minWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 12,
    height: "75%",
    margin: 4,
  },

  verticalSpacing: {
    marginVertical: 8,
  },
});
