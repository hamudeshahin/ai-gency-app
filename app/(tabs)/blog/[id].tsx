import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/hooks/useFetch";
import BackBtn from "@/components/back-btn";

async function fetchBlogDetails(id: number) {
  const blogsUrl = `https://aigency.dev/api/v1/blog-inside/?access_token=${
    process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
  }&blog_id=${id}`;

  const res = await fetch(blogsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "default",
  });

  const data = await res.json();

  return data;
}

export default function BlogDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { data, error, isLoading } = useFetch({
    callApiFunc: fetchBlogDetails,
    params: id,
    callOnMount: true,
  });

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (error) {
    return <ThemedText>Error: {error}</ThemedText>;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={{ uri: data?.blog_img }}
          className="z-10 top-0 left-0 right-0"
          style={styles.headerImage}
        />
      }
    >
      <BackBtn />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" className="text-secondary">
          {data?.blog_name}
        </ThemedText>
      </ThemedView>
      <ThemedText className="text-gray-500 text-xs">
        {data?.blog_date} Tarihinde Yayınlandı
      </ThemedText>
      <ThemedText className="leading-8">{data?.blog_desc}</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
