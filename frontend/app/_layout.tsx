import FontAwesome from "@expo/vector-icons/FontAwesome";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  MD2DarkTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";
import { useColorScheme } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onBackground,
          },
          headerShown: true,
          headerTintColor: theme.colors.onBackground
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/addTask"
          options={{
            presentation: "modal",
            title: "Add Task",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
