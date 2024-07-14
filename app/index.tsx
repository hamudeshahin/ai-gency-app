import { Image, StyleSheet, Platform, Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useFetch from "@/hooks/useFetch";
import Alert from "@/components/Alert";

async function fetchHomeData() {
  const url = `https://aigency.dev/api/v1/ai-team-list/?access_token=${
    process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
  }`;
  console.log("url");
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "default",
  });
  const data = await response.json();
  return data;
}

export default function HomeScreen() {
  //   const { isLoading, error, data } = useFetch({
  //     callApiFunc: fetchHomeData,
  //     callOnMount: true,
  //   });

  //   if (isLoading) {
  //     return <ThemedText>Loading...</ThemedText>;
  //   }

  //   if (error) {
  //     return <Alert title="Error" message={error} type="error" />;
  //   }

  return (
    <ThemedView>
      <ThemedText>Home Page</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
