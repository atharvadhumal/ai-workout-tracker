import { Stack, Tabs } from "expo-router";

export default function Applayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
