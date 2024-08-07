import React, { useCallback } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useFetch from "@/hooks/useFetch";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

type BlogItemProps = {
  blog_date: string;
  blog_desc: string;
  blog_id: number;
  blog_img: string;
  blog_name: string;
  href?: string;
};

export const BlogItem = ({
  blog_date,
  blog_desc,
  blog_id,
  blog_img,
  blog_name,
  href = undefined,
}: BlogItemProps) => {
  const router = useRouter();

  const handlePress = useCallback(() => {
    if (href) {
      router.push(href);
    }
  }, [router, href]);

  return (
    <TouchableOpacity
      className="p-4 mb-4 border border-gray-400 rounded-lg"
      onPress={handlePress}
    >
      <Image
        source={{ uri: blog_img }}
        style={{ width: "100%", height: 200 }}
        resizeMode="cover"
      />
      <ThemedText type="title" className="text-2xl mb-2 mt-1" numberOfLines={1}>
        {blog_name}
      </ThemedText>
      <ThemedText className="text-lg" numberOfLines={4}>
        {blog_desc}
      </ThemedText>
      <ThemedText className="text-sm text-gray-500 mt-2">
        {blog_date} Tarihinde Yayınlandı
      </ThemedText>
    </TouchableOpacity>
  );
};

async function getBlogs() {
  const blogsUrl = `https://aigency.dev/api/v1/blog-list/?access_token=${
    process.env.EXPO_PUBLIC_ACCESS_TOKEN as string
  }`;

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

const BlogsScreen = () => {
  const {
    isLoading,
    error,
    data = [],
  } = useFetch({
    callApiFunc: getBlogs,
    callOnMount: true,
  });

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (error) {
    return <ThemedText>Error: {error}</ThemedText>;
  }

  return (
    <ThemedView className="flex-1 px-4">
      <ThemedText type="title" className="mt-2 mb-4 text-3xl">
        Son Yazılarımzı
      </ThemedText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.blog_id}
        renderItem={({ item }) => (
          <BlogItem {...item} href={`/blog/${item.blog_id}`} />
        )}
      />
    </ThemedView>
  );
};

export default BlogsScreen;
