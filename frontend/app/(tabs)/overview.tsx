import { StyleSheet, View } from "react-native";
import { check } from "@/api/api";
import React, { useState, useEffect } from "react";
import { Surface, Text, useTheme, Button } from "react-native-paper";

export default function Overview() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const headers = new Headers({
    "X-Api-Key": "hJTSbmg1d0whlfiownqwfg==3QrHhnn1IVvCWgx8",
  });

  useEffect(() => {
    const getQuote = () => {
      return fetch("https://api.api-ninjas.com/v1/quotes?category=inspirational", {headers})
        .then((value) =>{
          return value.json();
        });
    }
    getQuote()
      .then((result) => {
        setQuote(result[0]);
      })
      .catch((error) =>{
        setError(error.mesage);
      });
    //
  }, []);

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
          {error ? (
            <Text variant="titleMedium">Error loading quote: {error}</Text>
          ) : quote ? (
            <Text variant="titleMedium"><i>"{quote["quote"]}"</i> - {quote["author"]}</Text>
          ) : (
            <Text variant="titleMedium">Quote Loading...</Text>
          )}
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
