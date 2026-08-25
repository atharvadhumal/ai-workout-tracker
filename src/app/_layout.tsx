import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "nativewind";
import { appThemeColors, appThemes } from "@/theme/app-theme";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { authClient } from "@/libs/auth-client";

SplashScreen.preventAutoHideAsync();

const navigationThemes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: appThemeColors.light.background,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: appThemeColors.dark.background,
    },
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [appReady, setAppReady] = useState(false);
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme ?? "light";
  const backgroundColor = appThemeColors[scheme].background;
  const { data: session, isPending } = authClient.useSession();

  const fontReady = loaded || !!error;

  useEffect(() => {
    if (!appReady && fontReady && !isPending) {
      SplashScreen.hideAsync().then(() => setAppReady(true));
    }
  }, [isPending, appReady, fontReady]);

  if (!appReady) return null;

  return (
    <KeyboardProvider>
      <ThemeProvider value={navigationThemes[scheme]}>
        <View
          style={[
            appThemes[scheme],
            {
              backgroundColor,
              flex: 1,
            },
          ]}
        >
          <StatusBar
            key={scheme}
            animated
            style={scheme === "dark" ? "light" : "dark"}
          />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Protected guard={!session}>
              <Stack.Screen name="(public)" />
            </Stack.Protected>
            <Stack.Protected guard={!!session}>
              <Stack.Screen name="(app)" />
            </Stack.Protected>
          </Stack>
        </View>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
