import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { authClient } from "@/libs/auth-client";

const Index = () => {
  const router = useRouter();
  const signOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      Alert.alert("Could not signout", error.message);
    }
  };
  return (
    <SafeAreaView>
      <View className="flex-grow items-center justify-center">
        <Text>Index</Text>
        <Pressable onPress={signOut}>
          <Text>Signout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Index;
