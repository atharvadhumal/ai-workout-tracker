import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const example = () => {
  const { name = "" } = useLocalSearchParams();
  return (
    <SafeAreaView className="p-10 flex-1 items-center justify-center">
      <Text className="font-inter-bold">This is example page {name}</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Go back</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default example;
