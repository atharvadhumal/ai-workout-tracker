import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View>
        <Text>Index</Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/create",
              params: { name: "atharva" },
            })
          }
        >
          <Text>Go to Create</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Index;
